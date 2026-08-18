/**
 * Location Identity System — per-state/city visual uniqueness.
 * Deterministic accent + hero image per slug, so every location page
 * reads as hand-built while staying stable across builds.
 *
 * Accents: cherry (brand) / gold / bronze / parchment — assigned by slug hash.
 * Heroes: generated state imagery where available, themed backgrounds otherwise.
 */

export type AccentId = "gold" | "amber" | "bronze" | "electric";

export interface LocationAccent {
  id: AccentId;
  /** Primary accent (text, icons) */
  base: string;
  /** Light accent (highlights on dark) */
  bright: string;
  /** Deep accent (glow cores, chips) */
  deep: string;
  /** Hairline border rgba */
  line: string;
  /** Soft translucent fill */
  soft: string;
  /** Stronger translucent fill */
  strong: string;
  /** Radial glow for section atmosphere */
  glow: string;
}

export const LOCATION_ACCENTS: Record<AccentId, LocationAccent> = {
  gold: {
    id: "gold",
    base: "#D4B872",
    bright: "#E8D5A3",
    deep: "#8C6E2F",
    line: "rgba(212,184,114,0.35)",
    soft: "rgba(212,184,114,0.08)",
    strong: "rgba(212,184,114,0.16)",
    glow: "rgba(212,184,114,0.08)",
  },
  amber: {
    id: "amber",
    base: "#C9945B",
    bright: "#E0B784",
    deep: "#8A5A2B",
    line: "rgba(201,148,91,0.38)",
    soft: "rgba(201,148,91,0.08)",
    strong: "rgba(201,148,91,0.16)",
    glow: "rgba(201,148,91,0.08)",
  },
  bronze: {
    id: "bronze",
    base: "#B08D57",
    bright: "#CDB183",
    deep: "#7A5F33",
    line: "rgba(176,141,87,0.38)",
    soft: "rgba(176,141,87,0.08)",
    strong: "rgba(176,141,87,0.16)",
    glow: "rgba(176,141,87,0.08)",
  },
  electric: {
    id: "electric",
    base: "#6557E8",
    bright: "#B8B2FF",
    deep: "#30266F",
    line: "rgba(101,87,232,0.38)",
    soft: "rgba(101,87,232,0.08)",
    strong: "rgba(101,87,232,0.16)",
    glow: "rgba(101,87,232,0.12)",
  },
};

const ACCENT_IDS: AccentId[] = ["gold", "amber", "bronze", "electric"];

/** FNV-1a style deterministic hash */
export function hashSlug(slug: string): number {
  let h = 2166136261;
  for (let i = 0; i < slug.length; i++) {
    h ^= slug.charCodeAt(i);
    h = Math.imul(h, 16777619);
  }
  return Math.abs(h);
}

export function getLocationAccent(slug: string): LocationAccent {
  return LOCATION_ACCENTS[ACCENT_IDS[hashSlug(slug) % ACCENT_IDS.length]];
}

/** CSS custom-property map — spread onto a wrapper to theme children */
export function accentStyleVars(a: LocationAccent): Record<string, string> {
  return {
    "--acc": a.base,
    "--acc-bright": a.bright,
    "--acc-deep": a.deep,
    "--acc-line": a.line,
    "--acc-soft": a.soft,
    "--acc-strong": a.strong,
    "--acc-glow": a.glow,
  };
}

/* ── Hero imagery ───────────────────────────────────────────── */

/** Generated per-state heroes */
const STATE_HEROES: Record<string, string> = {
  "delhi-ncr": "/assets/images/generated/state-delhi-ncr.jpg",
  karnataka: "/assets/images/generated/state-karnataka.jpg",
  maharashtra: "/assets/images/generated/state-maharashtra.jpg",
  "tamil-nadu": "/assets/images/generated/state-tamil-nadu.jpg",
  "uttar-pradesh": "/assets/images/generated/state-uttar-pradesh.jpg",
};

/** Reusable themed backgrounds (Batch 4 — consistent dark-navy/gold grade, no text) */
const THEME_HEROES = [
  "/assets/images/generated/theme-govt-corridor.jpg",
  "/assets/images/generated/theme-guard-patrol.jpg",
  "/assets/images/generated/theme-industrial-night.jpg",
];

/** Cinematic stage stills as fallback */
const CINEMATIC_HEROES = [
  "/assets/images/cinematic/hero-stage.jpg",
  "/assets/images/cinematic/services-atmosphere.jpg",
  "/assets/images/cinematic/process-path.jpg",
];

const HUB_HERO_OVERRIDES: Record<string, string> = {
  "services-hub": "/assets/images/generated/inner-hero-dossier.png",
  "blog-hub": "/assets/images/generated/inner-hero-dossier.png",
  "about-hub": "/assets/images/generated/inner-hero-parchment.png",
  "contact-hub": "/assets/images/generated/inner-hero-parchment.png",
};

export function stateHeroImage(slug: string): string {
  const direct = STATE_HEROES[slug];
  if (direct) return direct;
  return THEME_HEROES[hashSlug(slug) % THEME_HEROES.length];
}

export function cityHeroImage(citySlug: string): string {
  return THEME_HEROES[hashSlug(citySlug) % THEME_HEROES.length];
}

/** Generic fallback for non-location hubs (services, guides) */
export function hubHeroImage(seed: string): string {
  if (HUB_HERO_OVERRIDES[seed]) return HUB_HERO_OVERRIDES[seed];
  return CINEMATIC_HEROES[hashSlug(seed) % CINEMATIC_HEROES.length];
}
