/**
 * PSARA Quote Tool (/quote) — pricing engine check through the UI.
 * Guards: standard ops totals, per-state government-fee auto-fill,
 * coverage re-derivation, manual override stickiness, GST + amount-in-words.
 *
 * Run: npm run dev (separate shell) → npx cypress run --spec cypress/e2e/quote-tool.cy.ts
 */

describe("PSARA Quote Tool", () => {
  /**
   * Sets a React-controlled input value atomically via the native setter.
   * Avoids keystroke caret races: the gov-fee input is right-aligned, so
   * Cypress's pre-type click can drop the caret before the digits and shift
   * the typed value (12000 -> 120000). One change event = one desk edit.
   */
  const setInputValue = (selector: string, value: string) => {
    cy.get(selector).should("be.visible").then(($el) => {
      const el = $el[0] as HTMLInputElement;
      const setter = Object.getOwnPropertyDescriptor(window.HTMLInputElement.prototype, "value")!.set!;
      setter.call(el, value);
      el.dispatchEvent(new Event("input", { bubbles: true }));
    });
  };

  beforeEach(() => {
    cy.visit("/quote");
    cy.get('[data-testid="client-name"]').should("be.visible");
    // The quote number is generated in a mount effect, so it only appears once
    // React has hydrated and handlers are live. Waiting for it keeps dev-mode
    // hydration races out of every test below.
    cy.get('[data-testid="quote-meta"]').should("contain.text", "PSARA/QT/");
  });

  it("shows the standard whole-state structure totalling ₹3,65,000 for Rajasthan", () => {
    cy.get('[data-testid="state-select"]').should("have.value", "rajasthan");
    cy.get('[data-testid="gov-fee-input"]').should("have.value", "25000");
    cy.get('[data-testid="quote-grand-total"]').should("contain.text", "3,65,000");
    cy.get('[data-testid="quote-words"]').should("contain.text", "Rupees Three Lakh Sixty Five Thousand Only");
  });

  it("auto-fills the government fee when the state changes (Karnataka whole state = ₹50,000)", () => {
    cy.get('[data-testid="state-select"]').select("karnataka");
    cy.get('[data-testid="gov-fee-input"]').should("have.value", "50000");
    cy.get('[data-testid="quote-grand-total"]').should("contain.text", "3,90,000");
    cy.get('[data-testid="quote-words"]').should("contain.text", "Rupees Three Lakh Ninety Thousand Only");
  });

  it("re-derives the government fee when coverage changes", () => {
    cy.get('[data-testid="state-select"]').select("delhi");
    cy.get('[data-testid="gov-fee-input"]').should("have.value", "25000");
    cy.get('[data-testid="coverage-select"]').select("single-district");
    cy.get('[data-testid="gov-fee-input"]').should("have.value", "5000");
    cy.get('[data-testid="quote-grand-total"]').should("contain.text", "3,45,000");
  });

  it("keeps a manually edited government fee when the state changes", () => {
    setInputValue('[data-testid="gov-fee-input"]', "12000");
    cy.get('[data-testid="gov-fee-input"]').should("have.value", "12000");
    cy.get('[data-testid="state-select"]').select("karnataka");
    cy.get('[data-testid="gov-fee-input"]').should("have.value", "12000");
    cy.get('[data-testid="quote-grand-total"]').should("contain.text", "3,52,000");
  });

  it("adds GST @18% and words the total payable", () => {
    cy.get('[data-testid="quote-grand-total"]').should("contain.text", "3,65,000");
    cy.get('[data-testid="gst-toggle"]').check();
    cy.get('[data-testid="quote-total-payable"]').should("contain.text", "4,30,700");
    cy.get('[data-testid="quote-words"]').should("contain.text", "Rupees Four Lakh Thirty Thousand Seven Hundred Only");
  });

  it("resets to defaults for the current state via Load standard defaults", () => {
    cy.get('[data-testid="state-select"]').select("karnataka");
    setInputValue('[data-testid="gov-fee-input"]', "99000");
    cy.get('[data-testid="gov-fee-input"]').should("have.value", "99000");
    cy.get('[data-testid="load-defaults"]').click();
    cy.get('[data-testid="gov-fee-input"]').should("have.value", "50000");
    cy.get('[data-testid="quote-grand-total"]').should("contain.text", "3,90,000");
  });
});
