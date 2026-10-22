"""Focused UI checks against the local production server (no external submissions)."""
import asyncio
import json
import os
import re
from pathlib import Path
from playwright.async_api import async_playwright

OUT = Path('artifacts/v3/pages')
BASE_URL = os.environ.get('V3_BASE_URL', 'http://localhost:3100').rstrip('/')

def rupees(text):
    return int(re.sub(r'\D', '', text))

async def visit(page, route):
    response = await page.goto(BASE_URL + route, wait_until='domcontentloaded')
    if response is None or response.status != 200:
        raise RuntimeError(f'{route}: expected HTTP 200, got {response.status if response else "no response"}')
    await page.evaluate('document.fonts.ready')
    await page.wait_for_timeout(1100)

async def main():
    OUT.mkdir(parents=True, exist_ok=True)
    result = {}
    async with async_playwright() as p:
        browser = await p.chromium.launch()
        for width, height in [(1440, 900), (390, 844)]:
            context = await browser.new_context(viewport={'width': width, 'height': height})
            await context.add_init_script("localStorage.setItem('psara_cookie_consent', JSON.stringify({essential:true,analytics:false,marketing:false}));")
            page = await context.new_page()
            errors = []
            page.on('pageerror', lambda error: errors.append(str(error)))
            checks = {}
            await visit(page, '/services')
            await page.keyboard.press('Tab')
            checks['skipLinkFirstFocus'] = await page.locator('.v3-skip-link').evaluate('e=>e===document.activeElement')
            await page.keyboard.press('Enter')
            await page.wait_for_timeout(1800)
            checks['skipLinkFocusesContent'] = await page.locator('#page-content').evaluate('e=>e===document.activeElement')
            menu = page.get_by_role('button', name='Open navigation menu')
            await menu.click()
            drawer = page.get_by_role('dialog', name='Site navigation')
            checks['menuOpens'] = await drawer.is_visible()
            await page.keyboard.press('Shift+Tab')
            checks['menuFocusContained'] = await drawer.evaluate('e=>e.contains(document.activeElement)')
            await page.keyboard.press('Escape')
            checks['menuRestoresFocus'] = await menu.evaluate('e=>e===document.activeElement')
            checks['menuUnlocksScroll'] = await page.evaluate("document.body.style.overflow !== 'hidden' && !document.getElementById('main').inert")
            await menu.click()
            await drawer.get_by_role('link', name='States', exact=True).click()
            await page.wait_for_url('**/states')
            await page.wait_for_timeout(1100)
            checks['clientNavigation'] = await page.locator('h1').count() == 1 and await page.locator('.v3-pages').count() == 1
            checks['clientNavigationNoOrphanPins'] = await page.locator('.pin-spacer').count() == 0
            await page.get_by_role('searchbox').fill('Rajasthan')
            checks['stateFilter'] = await page.locator('.v3-directory-link').count() == 1
            await visit(page, '/cities')
            await page.get_by_role('textbox', name='Search cities').fill('Jaipur')
            checks['cityFilter'] = await page.locator('a[href="/city/jaipur"]').count() >= 1
            await visit(page, '/states/rajasthan')
            await page.get_by_role('button', name='Checklist', exact=True).click()
            checks['stateDocumentsTab'] = await page.get_by_role('button', name='Checklist', exact=True).get_attribute('aria-pressed') == 'true'
            await page.get_by_role('button', name='Fee Calculator', exact=True).click()
            checks['stateCalculatorTab'] = await page.get_by_role('button', name='Fee Calculator', exact=True).get_attribute('aria-pressed') == 'true'
            await page.locator('a[href="/states/delhi"]').first.click()
            await page.wait_for_url('**/states/delhi')
            await page.wait_for_timeout(1200)
            await page.locator('h1').scroll_into_view_if_needed()
            await page.wait_for_timeout(500)
            checks['sameTemplateNavigation'] = await page.locator('h1').count() == 1 and 'Delhi' in await page.locator('h1').inner_text()
            checks['sameTemplateHeadingVisible'] = await page.locator('h1').evaluate("""e=>{
              const r=e.getBoundingClientRect();
              return r.height>0&&getComputedStyle(e).visibility!=='hidden'&&Number(getComputedStyle(e).opacity)>.95&&
                [...e.querySelectorAll('div')].every(line=>{const b=line.getBoundingClientRect();return b.top>=r.top-2&&b.bottom<=r.bottom+2&&Number(getComputedStyle(line).opacity)>.95});
            }""")
            checks['sameTemplateNoOrphanPins'] = await page.locator('.pin-spacer').count() == 0
            await visit(page, '/quote')
            total = page.get_by_test_id('quote-grand-total')
            original_total = rupees(await total.inner_text())
            government_fee = page.get_by_test_id('gov-fee-input')
            original_fee = int(await government_fee.input_value())
            await government_fee.fill(str(original_fee + 5000))
            checks['quoteLiveTotal'] = rupees(await total.inner_text()) == original_total + 5000
            await page.get_by_test_id('coverage-select').select_option('single-district')
            checks['quoteManualFeePreserved'] = int(await government_fee.input_value()) == original_fee + 5000
            await page.get_by_test_id('load-defaults').click()
            checks['quoteDefaultsReset'] = int(await government_fee.input_value()) < original_fee
            subtotal = rupees(await total.inner_text())
            await page.get_by_test_id('gst-toggle').check()
            checks['quoteGstTotal'] = rupees(await page.get_by_test_id('quote-total-payable').inner_text()) == round(subtotal * 1.18)
            checks['quoteNoOverflow'] = await page.evaluate('document.documentElement.scrollWidth===innerWidth')
            await visit(page, '/calculator')
            estimate = page.get_by_text('Total Estimated Cost:', exact=True).locator('..').locator('span').last
            original_estimate = rupees(await estimate.inner_text())
            await page.get_by_role('checkbox', name='Include Armed Guard Endorsement Preparation').check()
            checks['calculatorAddon'] = rupees(await estimate.inner_text()) == original_estimate + 15000
            await page.get_by_role('button', name='Single-District Setup').click()
            checks['calculatorCoverage'] = rupees(await estimate.inner_text()) < original_estimate + 15000
            await page.get_by_label('1. Target Operating State / UT').select_option('delhi')
            checks['calculatorState'] = 'Delhi' in await page.get_by_role('heading', level=3).inner_text()
            quote_link = await page.get_by_role('link', name='Get Detailed Quote on WhatsApp').get_attribute('href')
            checks['calculatorWhatsAppQuote'] = bool(quote_link and 'wa.me' in quote_link and 'Delhi' in quote_link)
            checks['calculatorNoOverflow'] = await page.evaluate('document.documentElement.scrollWidth===innerWidth')
            await visit(page, '/blog')
            categories = page.get_by_role('navigation', name='Filter articles by category')
            checks['blogSingleAllFilter'] = await categories.get_by_role('link', name='All', exact=True).count() == 1
            article_count = await page.locator('.v3-page-main a[href^="/blog/"]').count()
            checks['blogGraphicCoversNotCropped'] = await page.locator('.v3-page-main img[src*=".svg"]').evaluate_all("images=>images.length>0&&images.every(e=>getComputedStyle(e).objectFit==='contain')")
            await categories.get_by_role('link', name='PSARA License', exact=True).click()
            await page.wait_for_url(lambda url: 'cat=' in url)
            await page.wait_for_timeout(1100)
            checks['blogCategoryFilter'] = await categories.get_by_role('link', name='PSARA License', exact=True).get_attribute('aria-current') == 'page' and 0 < await page.locator('.v3-page-main a[href^="/blog/"]').count() < article_count
            await visit(page, '/blog?cat=All')
            checks['blogAllAlias'] = await page.locator('.v3-page-main a[href^="/blog/"]').count() == article_count and await categories.get_by_role('link', name='All', exact=True).get_attribute('aria-current') == 'page'
            await visit(page, '/faq')
            first = page.locator('.v3-faq summary').first
            await first.click()
            checks['faqExpands'] = await page.locator('.v3-faq details').first.get_attribute('open') is not None
            await page.screenshot(path=str(OUT/f'{width}-faq-open.png'))
            await visit(page, '/contact')
            form = page.locator('form').first
            await form.locator('button[type=submit]').click()
            await form.locator('[aria-invalid=true]').first.wait_for()
            checks['contactValidation'] = await form.locator('[aria-invalid=true]').count() > 0
            checks['contactErrorsAssociated'] = await form.locator('[aria-invalid=true]').evaluate_all("fields=>fields.every(e=>{const id=e.getAttribute('aria-describedby');return id&&document.getElementById(id)?.textContent.trim()})")
            checks['contactValidationNoOverflow'] = await page.evaluate('document.documentElement.scrollWidth===innerWidth')
            await page.locator('.v3-contact-form').screenshot(path=str(OUT/f'{width}-contact-validation.png'))
            # A local synthetic response exercises dashboard layout without credentials or live leads.
            fixture = {'leads': [{'id': 'ui-fixture', 'name': 'Synthetic QA Agency', 'phone': '+910000000000', 'email': 'qa@example.invalid', 'product': 'Synthetic layout verification', 'sourcePage': '/contact', 'timestamp': '2026-10-22T09:00:00Z'}], 'metrics': [{'id': 'qa-section', 'name': 'Synthetic test section', 'views': 3, 'clicks': 1, 'lastActive': '2026-10-22'}]}
            await page.route('**/api/metrics', lambda route: route.fulfill(json=fixture))
            await visit(page, '/metrics')
            await page.get_by_label('Password', exact=True).fill('synthetic-ui-fixture')
            await page.get_by_role('button', name='Access Dashboard', exact=True).click()
            await page.get_by_role('heading', name='Client Analytics & Lead Intelligence', exact=True, level=1).wait_for()
            checks['metricsFixtureLoads'] = await page.get_by_text('Synthetic QA Agency', exact=True).count() > 0
            await page.locator('.v3-page-main').scroll_into_view_if_needed()
            await page.wait_for_timeout(1100)
            await page.screenshot(path=str(OUT/f'{width}-metrics-fixture.png'))
            checks['metricsNoOverflow'] = await page.evaluate('document.documentElement.scrollWidth===innerWidth')
            await page.get_by_role('button', name='Section Click Heatmap', exact=True).click()
            checks['metricsHeatmap'] = await page.get_by_text('Synthetic test section', exact=True).is_visible()
            await page.get_by_role('button', name='Traffic Overview', exact=True).click()
            checks['metricsTraffic'] = await page.get_by_role('heading', name='Traffic Summary').is_visible()
            await visit(page, '/services/psara-license')
            if width == 1440:
                button = page.locator('.v3-page-hero [data-v3-magnetic]').first
                size = await button.bounding_box()
                await button.hover(position={'x': size['width'] * .7, 'y': size['height'] / 2})
                await page.wait_for_timeout(550)
                checks['magneticDesktop'] = await button.evaluate("e=>getComputedStyle(e).transform !== 'none'")
                await page.mouse.move(0, 0)
                await page.evaluate('window.scrollTo(0,200)')
                await page.wait_for_timeout(600)
                checks['heroParallaxDesktop'] = await page.locator('.v3-hero-media').evaluate("e=>getComputedStyle(e).transform !== 'none'")
            await page.emulate_media(reduced_motion='reduce')
            await page.wait_for_timeout(500)
            checks['liveReducedMotion'] = await page.locator('.v3-hero-media').evaluate("e=>getComputedStyle(e).transform === 'none'") and await page.locator('h1').is_visible()
            checks['reducedMotionNoPins'] = await page.locator('.pin-spacer').count() == 0
            await visit(page, '/about')
            await page.emulate_media(reduced_motion='no-preference')
            await page.wait_for_timeout(1200)
            await page.emulate_media(reduced_motion='reduce')
            await page.wait_for_timeout(500)
            checks['aboutLiveReducedMotion'] = await page.locator('.v3-hero-media').evaluate("e=>getComputedStyle(e).transform === 'none'") and await page.locator('h1').is_visible()
            checks['aboutReducedMotionNoPins'] = await page.locator('.pin-spacer').count() == 0
            checks['noRuntimeErrors'] = not errors
            result[str(width)] = {'checks': checks, 'errors': errors}
            await context.close()
        context = await browser.new_context(java_script_enabled=False, viewport={'width': 390, 'height': 844})
        page = await context.new_page()
        await visit(page, '/services/psara-license')
        result['noJavaScript'] = {'headingVisible': await page.locator('h1').is_visible(), 'contentVisible': await page.get_by_role('heading', name='Service Overview').is_visible(), 'whatsapp': await page.locator('.v3-whatsapp').count() == 1}
        await page.screenshot(path=str(OUT/'390-no-javascript.png'))
        await browser.close()
    (OUT/'interactions.json').write_text(json.dumps(result, indent=2), encoding='utf-8')
    print(json.dumps(result, indent=2))
    failures = [f'{width}: {name}' for width, entry in result.items() if width != 'noJavaScript' for name, passed in entry['checks'].items() if not passed]
    failures.extend(f'noJavaScript: {name}' for name, passed in result['noJavaScript'].items() if not passed)
    if failures:
        raise SystemExit('v3 interaction verification failed:\n' + '\n'.join(failures))

if __name__ == '__main__':
    asyncio.run(main())
