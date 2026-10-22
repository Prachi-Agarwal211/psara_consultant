import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { BLOG_POSTS, BLOG_CATEGORIES } from "../../data/blog";
import { PageHero, PageMain } from "../../components/PageShell";
import StageShell from "../components/ui/StageShell";
import { pageMeta } from "../../lib/metadata";
import { hubHeroImage } from "../lib/location-accent";
import { ArrowUpRight, Clock3 } from "lucide-react";
import { Section } from "../../components/v3/PagePrimitives";

export const metadata: Metadata = pageMeta(
  "PSARA License Blog — Guides & Compliance Insights",
  "Articles on PSARA License registration, state guides, training MOU, police verification, and compliance.",
  "/blog"
);

export default async function BlogPage({
  searchParams,
}: {
  searchParams?: Promise<{ cat?: string }>;
}) {
  const sp = searchParams ? await searchParams : {};
  const cat = sp.cat === "All" ? undefined : sp.cat;
  const posts = cat
    ? BLOG_POSTS.filter((p) => p.category === cat)
    : BLOG_POSTS;
  const [featured, ...remaining] = posts;

  return (
    <StageShell>
      <PageHero
        title="Insights for security founders"
        lead="State guides, document checklists, and compliance notes from PSARA Consultant India."
        crumbs={[{ label: "Blog" }]}
        locationSlug="blog-hub"
        image={hubHeroImage("blog-hub")}
        meta="( INSIGHTS ) ( COMPLIANCE )"
      />
      <PageMain>
        <Section>
          <div className="mb-10 flex flex-col items-start justify-between gap-6 md:flex-row md:items-end">
            <div className="max-w-3xl">
              <h2>Clear guidance for serious security founders.</h2>
              <p className="mt-5 text-xs tracking-wider text-[#B9C2D3]">PSARA CONSULTANT INDIA / JOURNAL</p>
            </div>
            <p className="text-sm text-[#FFB547]">{posts.length.toString().padStart(2, "0")} articles<br /><span className="text-[#B9C2D3]">licensing · compliance · growth</span></p>
          </div>

          <nav aria-label="Filter articles by category" className="mb-12 flex flex-wrap gap-3 border-y border-white/15 py-5">
            <Link href="/blog" aria-current={!cat ? "page" : undefined} className={`rounded-full border px-4 py-2 text-sm transition-colors ${!cat ? "border-[#FFB547] bg-[#FFB547] text-[#0B1E3B]" : "border-white/25 text-[#FFFDF5] hover:border-[#FFB547]"}`}>All</Link>
            {BLOG_CATEGORIES.filter((c) => c !== "All").map((c) => (
              <Link key={c} href={`/blog?cat=${encodeURIComponent(c)}`} aria-current={cat === c ? "page" : undefined} className={`rounded-full border px-4 py-2 text-sm transition-colors ${cat === c ? "border-[#FFB547] bg-[#FFB547] text-[#0B1E3B]" : "border-white/25 text-[#FFFDF5] hover:border-[#FFB547]"}`}>{c}</Link>
            ))}
          </nav>

          {featured && (
            <Link data-v3-reveal href={`/blog/${featured.slug}`} className="group mb-16 grid min-w-0 grid-cols-1 overflow-hidden rounded-2xl bg-white/[0.04] lg:grid-cols-[1.15fr_1fr]">
              <div className="relative min-h-64 overflow-hidden bg-[#1a1510] sm:min-h-80 lg:min-h-[28rem]">
                <Image src={featured.coverImage} alt={featured.title} fill priority sizes="(max-width: 1024px) 100vw, 55vw" className={featured.coverImage.endsWith(".svg") ? "object-contain" : "object-cover transition-transform duration-700 motion-safe:group-hover:scale-105"} />
                <div className="absolute inset-0 bg-gradient-to-t from-[#081426]/70 via-[#081426]/10 to-[#E76F00]/10" />
                <span className="absolute bottom-6 left-6 rounded-full bg-[#FFFDF5] px-4 py-2 text-sm text-[#0B1E3B]">Featured briefing</span>
              </div>
              <div className="flex min-w-0 flex-col justify-center p-6 sm:p-10 lg:p-12">
                <h3 className="text-3xl leading-tight text-[#FFFDF5] transition-colors group-hover:text-[#FFB547] sm:text-4xl" style={{ fontFamily: "var(--font-display)" }}>{featured.title}</h3>
                <p className="mt-5 text-sm text-[#FFB547]">{featured.category}</p>
                <p className="mt-5 max-w-[60ch] text-base leading-relaxed text-[#B9C2D3]">{featured.excerpt}</p>
                <span className="mt-8 flex items-center gap-3 text-sm text-[#FFB547]">Read briefing <ArrowUpRight aria-hidden="true" size={18} /></span>
              </div>
            </Link>
          )}

          <div className="grid min-w-0 grid-cols-1 gap-x-9 gap-y-14 md:grid-cols-2 xl:grid-cols-3">
            {remaining.map((post, index) => (
              <Link data-v3-reveal key={post.slug} href={`/blog/${post.slug}`} className="group min-w-0">
                <div className="relative mb-6 aspect-[4/3] overflow-hidden rounded-xl bg-[#1a1510]">
                  <Image src={post.coverImage} alt={post.title} fill sizes="(max-width: 768px) 100vw, (max-width: 1280px) 50vw, 33vw" className={post.coverImage.endsWith(".svg") ? "object-contain" : "object-cover transition-transform duration-700 motion-safe:group-hover:scale-105"} />
                  <div className="absolute inset-0 bg-gradient-to-t from-[#081426]/65 via-transparent to-[#E76F00]/10" />
                  <span className="absolute bottom-4 left-5 text-sm text-white/90">{String(index + 2).padStart(2, "0")}</span>
                </div>
                <h3 className="text-2xl leading-tight text-[#FFFDF5] transition-colors group-hover:text-[#FFB547] sm:text-3xl" style={{ fontFamily: "var(--font-display)" }}>{post.title}</h3>
                <p className="mt-4 flex flex-wrap items-center gap-2 text-xs text-[#FFB547]">{post.category} <span aria-hidden="true">·</span> <Clock3 aria-hidden="true" size={13} /> {post.readTime}</p>
                <p className="mt-4 text-base leading-relaxed text-[#B9C2D3]">{post.excerpt}</p>
                <span className="mt-6 flex items-center gap-3 border-t border-white/15 pt-4 text-sm text-[#FFB547]">Open article <ArrowUpRight aria-hidden="true" size={17} /></span>
              </Link>
            ))}
          </div>
          {posts.length === 0 && <p className="py-10 text-[#B9C2D3]">No posts in this category.</p>}
        </Section>
      </PageMain>
    </StageShell>
  );
}
