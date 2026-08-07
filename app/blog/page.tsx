import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { BLOG_POSTS, BLOG_CATEGORIES } from "../../data/blog";
import { PageHero, PageMain } from "../../components/PageShell";
import StageShell from "../components/ui/StageShell";
import { pageMeta } from "../../lib/metadata";
import { hubHeroImage } from "../lib/location-accent";

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
  const cat = sp.cat;
  const posts = cat
    ? BLOG_POSTS.filter((p) => p.category === cat)
    : BLOG_POSTS;

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
        <div className="mb-10 flex flex-wrap gap-3" data-stagger>
          <Link
            href="/blog"
            className="text-[0.6rem] font-bold uppercase tracking-[0.16em]"
            style={{ color: !cat ? "var(--gold-bright)" : "var(--white-40)" }}
          >
            All
          </Link>
          {BLOG_CATEGORIES.map((c) => (
            <Link
              key={c}
              href={`/blog?cat=${encodeURIComponent(c)}`}
              className="text-[0.6rem] font-bold uppercase tracking-[0.16em]"
              style={{ color: cat === c ? "var(--gold-bright)" : "var(--white-40)" }}
            >
              {c}
            </Link>
          ))}
        </div>

        <div className="divide-y divide-white/10 border-t border-white/10" data-stagger>
          {posts.map((post) => (
            <Link
              key={post.slug}
              href={`/blog/${post.slug}`}
              className="group flex flex-col gap-3 py-7 transition-[color,border-color,background-color] duration-300 hover:pl-2 md:flex-row md:items-center md:gap-8"
            >
              {post.coverImage && (
                <div className="relative h-28 w-full shrink-0 overflow-hidden md:h-20 md:w-32">
                  <Image
                    src={post.coverImage}
                    alt=""
                    fill
                    className="object-cover opacity-80 transition-[color,border-color,background-color] duration-500 group-hover:opacity-100"
                    sizes="128px"
                  />
                </div>
              )}
              <div className="min-w-0 flex-1">
                <p className="text-[0.55rem] uppercase tracking-[0.16em]" style={{ color: "var(--gold-dim)" }}>
                  {post.category}
                </p>
                <h2
                  className="mt-1 text-lg font-semibold transition-colors group-hover:text-[var(--gold-bright)]"
                  style={{ fontFamily: "var(--font-display)" }}
                >
                  {post.title}
                </h2>
                <p className="mt-1 line-clamp-2 text-sm" style={{ color: "var(--white-55)" }}>
                  {post.excerpt}
                </p>
              </div>
            </Link>
          ))}
        </div>

        {posts.length === 0 && (
          <p style={{ color: "var(--white-40)" }}>No posts in this category.</p>
        )}
      </PageMain>
    </StageShell>
  );
}
