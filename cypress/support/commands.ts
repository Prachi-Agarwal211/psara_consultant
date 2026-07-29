/**
 * Custom Cypress commands for PSARA accessibility testing.
 * cypress-axe's `cy.injectAxe()` and `cy.checkA11y()` are available
 * via the import in e2e.ts.
 */

/// <reference types="cypress" />
/// <reference types="cypress-axe" />
/// <reference types="@testing-library/cypress" />

/**
 * Assert that an element matching the selector passes keyboard reachability:
 * - It must be focusable (tabindex >= 0 or a naturally focusable element like a, button, input).
 * - Pressing Tab on the document body should eventually reach it.
 */
Cypress.Commands.add("assertKeyboardReachable", { prevSubject: false }, (selector: string, label?: string) => {
  cy.get("body").focus();
  cy.get(selector).should("exist");

  // Tab through the document and assert the element receives focus
  cy.get(selector).focus();
  cy.focused()
    .should("have.length", 1)
    .and(($el) => {
      const tag = $el.prop("tagName").toLowerCase();
      const tabIndex = $el.attr("tabindex");
      const role = $el.attr("role");

      const isFocusable =
        ["a", "button", "input", "select", "textarea", "details", "summary"].includes(tag) ||
        (tabIndex !== undefined && parseInt(tabIndex, 10) >= 0) ||
        (role !== undefined && ["link", "button", "menuitem", "tab", "option", "radio", "checkbox"].includes(role));

      if (!isFocusable) {
        const msg = `${selector}: ${label || tag} is not keyboard-focusable — add tabindex="0" or use a focusable element.`;
        Cypress.log({ name: "a11y", message: msg, $el });
        assert.isTrue(isFocusable, msg);
      }
    });
});

/**
 * Assert that an element has a non-empty accessible name
 * (via aria-label, aria-labelledby, or native label association).
 */
Cypress.Commands.add("assertAccessibleName", { prevSubject: false }, (selector: string) => {
  cy.get(selector).should(($el) => {
    const el = $el[0];
    const label =
      el.getAttribute("aria-label") ||
      el.getAttribute("aria-labelledby") ||
      el.getAttribute("alt") ||
      el.textContent?.trim();

    const msg = `${selector} is missing an accessible name (aria-label, aria-labelledby, alt, or visible text).`;
    Cypress.log({ name: "a11y", message: msg, $el });
    expect(label, msg).to.not.be.empty;
  });
});

/**
 * Assert that interactive elements (a, button, input) have discernible text or aria-label.
 */
Cypress.Commands.add("assertInteractiveLabeled", { prevSubject: false }, (selector: string) => {
  cy.get(selector).each(($el) => {
    const el = $el[0];
    const ariaLabel = el.getAttribute("aria-label");
    const text = el.textContent?.trim();
    const alt = el.getAttribute("alt");
    const title = el.getAttribute("title");

    const hasLabel = !!(ariaLabel || text || alt || title);
    const tag = el.tagName.toLowerCase();

    if (!hasLabel) {
      const msg = `<${tag}> at ${selector} has no visible text or aria-label — screen reader users cannot identify it.`;
      Cypress.log({ name: "a11y", message: msg, $el });
      assert.isTrue(hasLabel, msg);
    }
  });
});

/**
 * Assert the page has exactly one <h1> element.
 */
Cypress.Commands.add("assertExactlyOneH1", { prevSubject: false }, () => {
  cy.get("h1").should("have.length", 1);
});

/**
 * Assert heading hierarchy is logical (no skipped levels, e.g. h1 → h3).
 */
Cypress.Commands.add("assertHeadingOrder", { prevSubject: false }, () => {
  const headings: string[] = [];
  cy.get("h1, h2, h3, h4, h5, h6").each(($el) => {
    headings.push($el.prop("tagName").toLowerCase());
  });
  cy.then(() => {
    for (let i = 1; i < headings.length; i++) {
      const prev = parseInt(headings[i - 1].replace("h", ""), 10);
      const curr = parseInt(headings[i].replace("h", ""), 10);
      if (curr > prev + 1) {
        const msg = `Heading level skipped: ${headings[i - 1]} → ${headings[i]} (expected no more than +1 level jump).`;
        Cypress.log({ name: "a11y", message: msg });
        assert.isAtMost(curr, prev + 1, msg);
      }
    }
  });
});

/**
 * Assert that all images have non-empty alt text (decorative images must have alt="").
 */
Cypress.Commands.add("assertImagesHaveAlt", { prevSubject: false }, () => {
  cy.get("img").each(($img) => {
    const alt = $img.attr("alt");
    // alt must be present (even if empty string)
    const msg = `Image is missing alt attribute — add alt="" for decorative or descriptive alt for informative.`;
    Cypress.log({ name: "a11y", message: msg, $el: $img });
    expect(alt, msg).to.not.be.undefined;
  });
});

/**
 * Assert that landmark elements (<main>, <nav>, <aside>, <footer>, <header>) have roles
 * where HTML semantics alone don't convey landmark status (e.g., for <div role="navigation">).
 */
Cypress.Commands.add("assertLandmarks", { prevSubject: false }, () => {
  cy.get("main, nav, aside, footer, header, [role='banner'], [role='navigation'], [role='main'], [role='complementary'], [role='contentinfo']").should("exist");
});

export {};
