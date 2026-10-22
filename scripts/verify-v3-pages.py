"""Local production UI audit. Requires the host's Python Playwright installation.

Run against `npm run start -- --port 3100`: python scripts/verify-v3-pages.py
Artifacts remain in the existing ignored artifacts/v3 directory.
"""
import asyncio
import json
import os
from pathlib import Path
from playwright.async_api import async_playwright

OUT = Path("artifacts/v3/pages")
BASE_URL = os.environ.get("V3_BASE_URL", "http://localhost:3100").rstrip("/")
ROUTES = ["/services", "/services/psara-license", "/states", "/states/rajasthan", "/cities", "/city/jaipur", "/psara-license", "/about", "/contact", "/quote", "/calculator", "/blog", "/blog/what-is-psara-license-complete-guide", "/industries", "/industries/manufacturing-industrial-plants", "/case-studies", "/case-studies/pan-india-logistics-security-clearance", "/faq", "/certification", "/csr", "/emergency", "/google", "/gallery", "/metrics", "/franchise", "/privacy-policy", "/terms", "/disclaimer", "/security-services", "/security-services/rajasthan", "/security-services/city/jaipur", "/v3-missing-page-check"]
ROUTES += ["/city/thiruvananthapuram", "/states/andaman-and-nicobar", "/services/government-security-contracts"]

AUDIT = r"""() => {
 const visible = e => {const s=getComputedStyle(e),r=e.getBoundingClientRect();return r.width>1&&r.height>1&&s.visibility!=='hidden'&&s.display!=='none'&&Number(s.opacity)>.05&&!e.closest('[inert],[aria-hidden="true"]')};
 const root=document.querySelector('.v3-pages');
 const rect = e => {const r=e.getBoundingClientRect();return {x:r.x,y:r.y+scrollY,w:r.width,h:r.height}};
 // Only pixels that escape an ancestor's real horizontal clip can overflow.
 const escapesViewport = e => {
   const r=e.getBoundingClientRect();let left=r.left,right=r.right;
   for(let parent=e.parentElement;parent&&parent!==document.body&&parent!==document.documentElement;parent=parent.parentElement){
     if(['hidden','clip','auto','scroll'].includes(getComputedStyle(parent).overflowX)){
       const clip=parent.getBoundingClientRect();left=Math.max(left,clip.left);right=Math.min(right,clip.right);
     }
   }
   return right>left&&(left < -2 || right > innerWidth+2);
 };
 const overflow=[...root.querySelectorAll('*')].filter(e=>visible(e)&&!['IMG','SVG','PATH','PICTURE'].includes(e.tagName)).filter(escapesViewport).map(e=>({tag:e.tagName,cls:String(e.className).slice(0,160),text:e.textContent.slice(0,90),rect:rect(e)}));
 const elements=[...root.querySelectorAll('h1,h2,h3,p,summary,label,input,select,textarea,button')].filter(e=>visible(e)&&!e.closest('footer')&&!e.closest('details:not([open]) p'));
 const overlaps=[];
 for(let i=0;i<elements.length;i++) for(let j=i+1;j<elements.length;j++) {
   const a=elements[i],b=elements[j]; if(a.contains(b)||b.contains(a))continue;
   const x=a.getBoundingClientRect(),y=b.getBoundingClientRect();
   const dx=Math.min(x.right,y.right)-Math.max(x.left,y.left),dy=Math.min(x.bottom,y.bottom)-Math.max(x.top,y.top);
   if(dx>5&&dy>5)overlaps.push({a:a.textContent.slice(0,80)||a.tagName,b:b.textContent.slice(0,80)||b.tagName,dx,dy});
 }
 const h=document.querySelector('h1'),hero=document.querySelector('.v3-page-hero'),main=document.querySelector('.v3-page-main');
 return {width:innerWidth,scrollWidth:document.documentElement.scrollWidth,h1:document.querySelectorAll('h1').length,heroHeight:hero.offsetHeight,heroEndsBeforeContent:hero.getBoundingClientRect().bottom<=main.getBoundingClientRect().top+1,heroImageLoaded:[...hero.querySelectorAll('img')].every(e=>e.complete&&e.naturalWidth>0),headingFont:getComputedStyle(h).fontFamily,bodyFont:getComputedStyle(main).fontFamily,overflow,overlaps,whatsapp:!!document.querySelector('a.v3-whatsapp[href*="wa.me"]'),phone:!!document.querySelector('a[href="tel:+919983169555"]'),email:!!document.querySelector('a[href="mailto:info@psaraconsultantindia.com"]'),pins:document.querySelectorAll('.pin-spacer').length,schema:[...document.querySelectorAll('script[type="application/ld+json"]')].map(e=>{try{const v=JSON.parse(e.textContent);return v!==null&&typeof v==='object'&&Object.keys(v).length>0}catch{return false}}),canonical:document.querySelector('link[rel="canonical"]')?.href};
}"""

def page_failures(result):
    expected_status = 404 if result['route'] == '/v3-missing-page-check' else 200
    checks = {
        'HTTP status': result['status'] == expected_status,
        'single heading': result['h1'] == 1,
        'hero has height': result['heroHeight'] > 0,
        'hero precedes content': result['heroEndsBeforeContent'],
        'hero images loaded': result['heroImageLoaded'],
        'Newsreader heading': 'newsreader' in result['headingFont'].lower(),
        'Hanken Grotesk body': 'hanken' in result['bodyFont'].lower(),
        'no document overflow': result['scrollWidth'] <= result['width'] + 1,
        'no overflowing content': not result['overflow'],
        'no overlapping text': not result['overlaps'],
        'WhatsApp contact': result['whatsapp'],
        'phone contact': result['phone'],
        'email contact': result['email'],
        'no pinning': result['pins'] == 0,
        'valid JSON-LD present': bool(result['schema']) and all(result['schema']),
        'no runtime errors': not result['errors'],
    }
    return [name for name, passed in checks.items() if not passed]

async def main():
    OUT.mkdir(parents=True, exist_ok=True)
    results=[]
    async with async_playwright() as p:
        browser=await p.chromium.launch(headless=True)
        for width,height in [(1440,900),(390,844)]:
            context=await browser.new_context(viewport={"width":width,"height":height}, device_scale_factor=1)
            await context.add_init_script("localStorage.setItem('psara_cookie_consent', JSON.stringify({essential:true,analytics:false,marketing:false}));sessionStorage.setItem('psara-v3-intro','1');")
            page=await context.new_page()
            for route in ROUTES:
                errors=[]
                listener=lambda error: errors.append(str(error))
                page.on("pageerror",listener)
                response=await page.goto(BASE_URL+route,wait_until="networkidle")
                await page.evaluate("document.fonts.ready")
                await page.wait_for_timeout(1250)
                slug=route.strip('/').replace('/','__')
                await page.screenshot(path=str(OUT/f"{width}-{slug}-hero.png"))
                total=await page.evaluate("document.documentElement.scrollHeight")
                for y in range(0,total,height-100):
                    await page.evaluate("y=>window.scrollTo({top:y,behavior:'instant'})",y)
                    await page.wait_for_timeout(70)
                await page.wait_for_timeout(1000)
                result=await page.evaluate(AUDIT)
                result.update(route=route,status=response.status if response else None,errors=errors)
                result['failures'] = page_failures(result)
                results.append(result)
                main_y=await page.locator('.v3-page-main').evaluate("e=>e.getBoundingClientRect().top+scrollY")
                await page.evaluate("y=>window.scrollTo({top:y-80,behavior:'instant'})",main_y)
                await page.wait_for_timeout(300)
                await page.screenshot(path=str(OUT/f"{width}-{slug}-content.png"))
                if route in ['/services/psara-license','/city/jaipur','/contact','/quote','/blog/what-is-psara-license-complete-guide','/about']:
                    await page.screenshot(path=str(OUT/f"{width}-{slug}-full.png"),full_page=True)
                print(json.dumps({k:result[k] for k in ['width','route','status','scrollWidth','h1','pins','overflow','overlaps','errors','failures']}),flush=True)
                page.remove_listener("pageerror",listener)
            await context.close()
        # Preference fallback and client-side navigation cleanup are independent of layout.
        context=await browser.new_context(viewport={"width":390,"height":844},reduced_motion="reduce")
        page=await context.new_page()
        await page.goto(BASE_URL+'/services/psara-license',wait_until='networkidle')
        await page.wait_for_timeout(300)
        reduced={"headingVisible":await page.locator('h1').is_visible(),"pins":await page.locator('.pin-spacer').count(),"heroTransform":await page.locator('.v3-hero-media').evaluate('e=>getComputedStyle(e).transform')}
        await page.screenshot(path=str(OUT/'390-reduced-motion.png'))
        await context.close()
        await browser.close()
    (OUT/'verification.json').write_text(json.dumps({"pages":results,"reducedMotion":reduced},indent=2),encoding='utf-8')
    failures = [f"{r['width']} {r['route']}: {', '.join(r['failures'])}" for r in results if r['failures']]
    if not reduced['headingVisible'] or reduced['pins'] != 0 or reduced['heroTransform'] != 'none':
        failures.append(f"Reduced-motion fallback: {reduced}")
    if failures:
        raise SystemExit('v3 page verification failed:\n' + '\n'.join(failures))
    print(f'PASS: {len(results)} page/viewport checks and reduced-motion fallback.')

if __name__=='__main__':
    asyncio.run(main())
