import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { BLOG_POSTS, BLOG_CATEGORIES } from "../../data/blog";
import { PageHero, PageMain } from "../../components/PageShell";
import StageShell from "../components/ui/StageShell";
import { pageMeta } from "../../lib/metadata";
import { hubHeroImage } from "../lib/location-accent";
import { ArrowUpRight, Clock3 } from "lucide-react";

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
      <PageMain className="psara-blog-main">
        <div className="psara-blog-intro" data-stagger>
          <div>
            <p className="psara-blog-kicker">PSARA CONSULTANT INDIA / JOURNAL</p>
            <h2>Clear guidance for serious security founders.</h2>
          </div>
          <p className="psara-blog-count">{posts.length.toString().padStart(2, "0")} articles<br /><span>licensing · compliance · growth</span></p>
        </div>

        <div className="psara-blog-filters" data-stagger>
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

        {featured && (
          <Link href={`/blog/${featured.slug}`} className="psara-blog-feature" data-stagger>
            <div className="psara-blog-feature-image">
              <Image src={featured.coverImage} alt={featured.title} fill priority sizes="(max-width: 900px) 100vw, 58vw" className="object-cover transition-transform duration-700 group-hover:scale-105" />
              <div className="psara-blog-feature-wash" />
              <span className="psara-blog-feature-label">Featured briefing</span>
            </div>
            <div className="psara-blog-feature-copy">
              <p className="psara-blog-kicker">{featured.category}</p>
              <h2>{featured.title}</h2>
              <p>{featured.excerpt}</p>
              <span className="psara-blog-read">Read briefing <ArrowUpRight size={16} /></span>
            </div>
          </Link>
        )}

        <div className="psara-blog-grid" data-stagger>
          {remaining.map((post, index) => (
            <Link key={post.slug} href={`/blog/${post.slug}`} className={`psara-blog-card ${index === 0 ? "psara-blog-card-tall" : ""}`}>
              <div className="psara-blog-card-image">
                <Image src={post.coverImage} alt={post.title} fill sizes="(max-width: 700px) 100vw, 33vw" className="object-cover transition-transform duration-700 group-hover:scale-105" />
                <div className="psara-blog-card-wash" />
                <span>{String(index + 2).padStart(2, "0")}</span>
              </div>
              <div className="psara-blog-card-copy">
                <p className="psara-blog-kicker">{post.category} <i>·</i> <Clock3 size={12} /> {post.readTime}</p>
                <h3>{post.title}</h3>
                <p>{post.excerpt}</p>
                <span className="psara-blog-read">Open article <ArrowUpRight size={15} /></span>
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
