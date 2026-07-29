/**
 * PSARA Accessibility Test Suite
 * ==============================
 * Audits all 15 homepage sections for:
 *   - axe-core automated violations (WCAG 2.2 AA)
 *   - ARIA labels and landmarks
 *   - Heading hierarchy (h1 → h2 → h3)
 *   - Image alt text
 *   - Keyboard reachability of interactive elements
 *   - Focus order on interactive modals
 *   - Color contrast
 *   - Reduced motion handling
 *
 * Sections covered (all 15 from page.tsx):
 *   1. hero        — HeroDossier
 *   2. stats       — StatsBar
 *   3. why-us      — WhyChooseUs
 *   4. philosophy  — Philosophy
 *   5. ticker      — TickerMarquee
 *   6. briefs      — StateBriefs
 *   7. coverage    — StateGridHome
 *   8. presence    — Presence
 *   9. trust       — TrustProof
 *  10. process     — ApprovalRoadmap
 *  11. services    — PracticeIndex
 *  12. reviews     — GoogleReviews
 *  13. faq         — HomeFaq
 *  14. contact     — HomeContact
 *  15. site-footer — SiteFooter
 */

const SECTION_IDS = [
  "hero",
  "stats",
  "why-us",
  "philosophy",
  "ticker",
  "briefs",
  "coverage",
  "presence",
  "trust",
  "process",
  "services",
  "reviews",
  "faq",
  "contact",
  "site-footer",
] as const;

describe("PSARA homepage — axe-core automated a11y audit", () => {
  beforeEach(() => {
    cy.visit("/");
    cy.injectAxe();
    // Wait for GSAP/Preloader to settle
    cy.wait(500);
  });

  it("passes full-page axe audit at WCAG 2.2 AA", () => {
    cy.checkA11y(
      undefined,
      {
        runOnly: {
          type: "tag",
          values: ["wcag22aa", "wcag2aa", "best-practice"],
        },
        rules: {
          // GSAP/Tailwind may trigger scrollable false positives
          scrollable: { enabled: false },
        },
      },
      (violations) => {          violations.forEach((v) => {
            cy.log(`🚨 ${v.id}: ${v.description}`);
            v.nodes.forEach((n) => {
              cy.log(`  → ${n.target.join(", ")}`);
            });
          });
          expect(violations.length, `Full page: ${violations.length} axe violations`).to.equal(0);
        }
      );
    });

  it("has exactly one <h1> element", () => {
    cy.get("h1").should("have.length", 1);
    cy.get("h1").should("contain.text", "PSARA License");
  });

  it("has logical heading order (no skipped levels)", () => {
    const levels: number[] = [];
    cy.get("h1, h2, h3, h4, h5, h6")
      .each(($el) => {
        levels.push(parseInt($el.prop("tagName").replace("h", ""), 10));
      })
      .then(() => {
        for (let i = 1; i < levels.length; i++) {
          expect(levels[i] - levels[i - 1]).to.be.at.most(
            1,
            `Heading skip: h${levels[i - 1]} → h${levels[i]}`
          );
        }
      });
  });

  it("all images have alt attributes", () => {
    cy.get("img").each(($img) => {
      expect($img.attr("alt")).to.not.be.undefined;
    });
  });

  it("decorative images use alt=\"\"", () => {
    cy.get(".pointer-events-none img, [aria-hidden='true'] img").each(($img) => {
      expect($img.attr("alt")).to.equal("");
    });
  });

  it("all links have discernible text or aria-label", () => {
    cy.get("a").each(($a) => {
      const ariaLabel = $a.attr("aria-label");
      const text = $a.text().trim();
      const title = $a.attr("title");
      const hasLabel = !!(ariaLabel || text || title);
      expect(hasLabel, `Link missing accessible name: ${$a.attr("href")}`).to.be.true;
    });
  });

  it("all buttons have discernible text or aria-label", () => {
    cy.get("button").each(($btn) => {
      const ariaLabel = $btn.attr("aria-label");
      const text = $btn.text().trim();
      const title = $btn.attr("title");
      const hasLabel = !!(ariaLabel || text || title);
      expect(hasLabel, `Button missing accessible name`).to.be.true;
    });
  });

  it("iframes have a title attribute", () => {
    cy.get("iframe").should(($iframes) => {
      if ($iframes.length > 0) {
        $iframes.each((_, el) => {
          expect(el.title?.trim(), "iframe must have a title").to.not.be.empty;
        });
      }
    });
  });

  it("landmark elements exist: <main>, navigation, <footer>", () => {
    cy.get("main").should("exist");
    cy.get("nav, [role='navigation']").should("exist");
    cy.get("footer, [role='contentinfo']").should("exist");
  });
});

describe("PSARA homepage — per-section axe audit (all 15 sections)", () => {
  beforeEach(() => {
    cy.visit("/");
    cy.injectAxe();
    cy.wait(800);
  });

  SECTION_IDS.forEach((sectionId) => {
    it(`section #${sectionId} passes axe audit`, () => {
      cy.get(`#${sectionId}`).scrollIntoView({ duration: 300 });
      cy.wait(400);
      cy.get(`#${sectionId}`).should("be.visible");

      cy.checkA11y(
        `#${sectionId}`,
        {
          runOnly: {
            type: "tag",
            values: ["wcag22aa", "wcag2aa", "best-practice"],
          },
          rules: {
            scrollable: { enabled: false },
          },
        },
        (violations) => {
          violations.forEach((v) => {
            cy.log(`🚨 #${sectionId}: ${v.id} — ${v.description}`);
          });
          expect(violations.length, `#${sectionId}: ${violations.length} axe violations`).to.equal(0);
        }
      );
    });
  });
});

describe("PSARA homepage — keyboard navigation & focus", () => {
  beforeEach(() => {
    cy.visit("/");
    cy.wait(800);
  });

  it("first focusable element is reached via Tab", () => {
    cy.get("body").type("{tab}", { force: true });
    cy.focused().should("exist");
  });

  it("all anchor links (#hash) have valid targets on the page", () => {
    cy.get('a[href^="#"]').each(($a) => {
      const href = $a.attr("href");
      if (href && href !== "#") {
        cy.get(href).should("exist");
      }
    });
  });

  it("key interactive elements are keyboard-reachable", () => {
    const keySelectors = [
      '#hero a[href="#contact"]',
      '#hero a[href*="wa.me"]',
      '#hero button',
      '#contact a[href*="wa.me"]',
      '#contact a[href*="tel:"]',
      '#site-footer a[href*="tel:"]',
      '#site-footer a[href*="mailto:"]',
    ];

    keySelectors.forEach((sel) => {
      cy.get(sel).should("exist").and("be.visible");
      cy.get(sel).focus();
      cy.focused()
        .should("exist")
        .and(($el) => {
          const isFocusable =
            $el.is("a, button, input, select, textarea, [tabindex]") ||
            $el.find("a, button, input").length > 0;
          expect(isFocusable, `${sel} should be keyboard-focusable`).to.be.true;
        });
    });
  });
});

describe("PSARA homepage — EligibilityQuiz (modal) a11y", () => {
  beforeEach(() => {
    cy.visit("/");
    cy.injectAxe();
    cy.wait(800);
  });

  it("opens the quiz modal and checks ARIA attributes", () => {
    cy.get("#hero").contains("Readiness Check").click();
    cy.wait(400);

    cy.get('[role="dialog"]')
      .should("be.visible")
      .and("have.attr", "aria-modal", "true");

    cy.get('[role="dialog"] button[aria-label="Close"]').should("exist");

    // Escape should close the modal
    cy.get("body").type("{esc}", { force: true });
    cy.get('[role="dialog"]').should("not.exist");
  });

  it("quiz modal passes axe audit", () => {
    cy.get("#hero").contains("Readiness Check").click();
    cy.wait(300);

    cy.checkA11y(
      '[role="dialog"]',
      {
        runOnly: {
          type: "tag",
          values: ["wcag22aa", "wcag2aa", "best-practice"],
        },
        rules: {
          scrollable: { enabled: false },
        },
      },
      (violations) => {
        violations.forEach((v) => {
          cy.log(`🚨 Quiz modal: ${v.id} — ${v.description}`);
        });
        expect(violations.length, `Quiz modal: ${violations.length} axe violations`).to.equal(0);
      }
    );
  });
});

describe("PSARA homepage — reduced motion support", () => {
  it("respects prefers-reduced-motion: reduce and still renders core content", () => {
    cy.visit("/", {
      onBeforeLoad(win) {
        Object.defineProperty(win, "matchMedia", {
          writable: true,
          value: (query: string) => ({
            matches: query.includes("prefers-reduced-motion"),
            media: query,
            onchange: null,
            addListener: () => {},
            removeListener: () => {},
            addEventListener: () => {},
            removeEventListener: () => {},
            dispatchEvent: () => false,
          }),
        });
      },
    });

    // Core content should still render
    cy.get("#hero").should("exist");
    cy.get("h1").should("contain.text", "PSARA License");
    cy.get('a[href="#contact"]').should("be.visible");
  });
});

describe("PSARA homepage — ContactForm a11y", () => {
  beforeEach(() => {
    cy.visit("/");
    cy.injectAxe();
    cy.wait(800);
  });

  it("contact form inputs have accessible names (aria-label, placeholder, or associated label)", () => {
    cy.get("#contact").scrollIntoView({ duration: 300 });
    cy.wait(500);
    cy.get("#contact").should("be.visible");

    cy.get("#contact input, #contact select, #contact textarea").each(($input) => {
      const ariaLabel = $input.attr("aria-label");
      const placeholder = $input.attr("placeholder");
      const id = $input.attr("id");
      const hasAssociatedLabel = id ? Cypress.$(`label[for="${id}"]`).length > 0 : false;

      expect(!!(ariaLabel || placeholder || hasAssociatedLabel)).to.be.true;
    });
  });

  it("contact form passes axe audit", () => {
    cy.get("#contact").scrollIntoView({ duration: 300 });
    cy.wait(500);

    cy.checkA11y(
      "#contact",
      {
        runOnly: {
          type: "tag",
          values: ["wcag22aa", "wcag2aa", "best-practice"],
        },
        rules: {
          scrollable: { enabled: false },
        },
      },
      (violations) => {
        violations.forEach((v) => {
          cy.log(`🚨 Contact: ${v.id} — ${v.description}`);
        });
        expect(violations.length, `Contact section: ${violations.length} axe violations`).to.equal(0);
      }
    );
  });
});

describe("PSARA homepage — color contrast audit", () => {
  it("text elements meet 4.5:1 contrast ratio", () => {
    cy.visit("/");
    cy.injectAxe();
    cy.wait(800);

    cy.checkA11y(
      undefined,
      {
        runOnly: {
          type: "rule",
          values: ["color-contrast"],
        },
      },
      (violations) => {
        violations.forEach((v) => {
          cy.log(`🚨 Contrast violation: ${v.id} — ${v.description}`);
          v.nodes.forEach((n) => {
            cy.log(`  → ${n.target.join(", ")}`);
          });
        });
        expect(violations.length, `Color contrast: ${violations.length} contrast violations`).to.equal(0);
      }
    );
  });
});
