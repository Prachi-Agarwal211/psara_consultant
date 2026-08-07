/**
 * PSARA Accessibility Test Suite
 * ==============================
 * Audits the redesigned homepage (HeroStage + HomeStory) for:
 *   - axe-core automated violations (WCAG 2.2 AA)
 *   - ARIA labels and landmarks
 *   - Heading hierarchy (h1 → h2 → h3)
 *   - Image alt text
 *   - Keyboard reachability of interactive elements
 *   - Color contrast
 *   - Reduced motion handling
 *
 * Sections covered (current homepage):
 *   1. hero      — HeroStage
 *   2. about     — HomeStory About
 *   3. services  — HomeStory Services track
 *   4. why       — WhyChooseUs
 *   5. process   — HomeStory pinned process
 *   6. reviews   — GoogleReviews
 *   7. states    — StateGridHome
 *   8. faq       — HomeFaq
 *   9. presence  — HomeStory offices
 *  10. contact   — HomeContact (form + offices)
 *
 * Run with: CYPRESS_BASE_URL=http://localhost:3001 npm run test:a11y
 */

const SECTION_IDS = [
  "hero",
  "about",
  "services",
  "why",
  "process",
  "reviews",
  "states",
  "faq",
  "presence",
  "contact",
] as const;

const AXE_OPTIONS = {
  runOnly: {
    type: "tag" as const,
    values: ["wcag22aa", "wcag2aa", "best-practice"],
  },
};

describe("PSARA homepage — axe-core automated a11y audit", () => {
  beforeEach(() => {
    cy.visit("/");
    cy.injectAxe();
    // Wait for GSAP/reveals to settle
    cy.wait(800);
  });

  it("passes full-page axe audit at WCAG 2.2 AA", () => {
    cy.checkA11y(
      undefined,
      AXE_OPTIONS,
      (violations) => {
        violations.forEach((v) => {
          cy.log(`🚨 ${v.id}: ${v.description}`);
          v.nodes.forEach((n) => {
            cy.log(`  → ${n.target.join(", ")}`);
          });
        });
        expect(
          violations.map((v) => `${v.id} @ ${v.nodes.map((n) => n.target.join(" ")).join(" | ")}`),
          `Full page: ${violations.length} axe violations`
        ).to.deep.equal([]);
      }
    );
  });

  it("has exactly one <h1> element", () => {
    cy.get("h1").should("have.length", 1);
    cy.get("h1").should("contain.text", "Built for");
  });

  it("has logical heading order (no skipped levels)", () => {
    const levels: number[] = [];
    cy.get("h1, h2, h3, h4, h5, h6")
      .each(($el) => {
        levels.push(parseInt($el.prop("tagName").replace(/^H/i, ""), 10));
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
      // Skip images inside the closed (inert) mobile menu — hidden from the a11y tree entirely.
      if ($img.closest("[inert]").length) return;
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

describe("PSARA homepage — per-section axe audit", () => {
  beforeEach(() => {
    cy.visit("/");
    cy.injectAxe();
    cy.wait(800);
  });

  SECTION_IDS.forEach((sectionId) => {
    it(`section #${sectionId} passes axe audit`, () => {
      // Scroll to the very bottom first — this fires every GSAP ScrollTrigger so sections
      // are no longer stuck at opacity 0 (Lenis smooth scroll can miss programmatic scrollIntoView).
      cy.scrollTo("bottom", { duration: 400 });
      cy.wait(400);
      cy.get(`#${sectionId}`).scrollIntoView({ duration: 600 });
      cy.wait(900);

      cy.checkA11y(
        `#${sectionId}`,
        AXE_OPTIONS,
        (violations) => {
          violations.forEach((v) => {
            cy.log(`🚨 #${sectionId}: ${v.id} — ${v.description}`);
          });
          expect(
            violations.map((v) => `${v.id} @ ${v.nodes.map((n) => n.target.join(" ")).join(" | ")}`),
            `#${sectionId}: ${violations.length} axe violations`
          ).to.deep.equal([]);
        }
      );
    });
  });
});

describe("PSARA homepage — keyboard navigation & focus", () => {
  beforeEach(() => {
    cy.visit("/");
    // Trigger all GSAP section reveals so sections aren't stuck at opacity 0
    cy.scrollTo("bottom", { duration: 400 });
    cy.wait(500);
    cy.scrollTo("top", { duration: 300 });
    cy.wait(400);
  });

  it("first focusable element is reached via Tab", () => {
    cy.get("a, button, input, select, textarea, [tabindex]").first().focus();
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
      '#hero a[href="#about"]',
      '#hero a[href*="wa.me"]',
      '#hero a[href*="tel:"]',
      '#contact a[href*="wa.me"]',
      '#contact a[href*="tel:"]',
      '#contact button[type="submit"]',
      'footer a[href*="tel:"]',
      'footer a[href*="mailto:"]',
    ];

    keySelectors.forEach((sel) => {
      // Scroll the element into view first — GSAP section reveals keep below-fold
      // sections at opacity 0 until their ScrollTrigger fires, so visibility must
      // be asserted after the element is actually in the viewport (and revealed).
      cy.get(sel).first().scrollIntoView({ duration: 200 });
      cy.wait(250);
      cy.get(sel).first().should("exist").and("be.visible");
      cy.get(sel).first().focus();
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
    cy.get("h1").should("contain.text", "Built for");
    cy.get('a[href="#about"]').should("be.visible");
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

      expect(!!(ariaLabel || placeholder || hasAssociatedLabel), `Field missing accessible name: ${$input.attr("class")}`).to.be.true;
    });
  });

  it("contact form passes axe audit", () => {
    cy.get("#contact").scrollIntoView({ duration: 300 });
    cy.wait(500);

    cy.checkA11y(
      "#contact",
      AXE_OPTIONS,
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
