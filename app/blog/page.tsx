import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { CalendarDays, Clock, User, ArrowUpRight } from "lucide-react";
import { BLOG_POSTS, BLOG_CATEGORIES } from "../../data/blog";
import { PageHero, PageMain } from "../../components/PageShell";
import { pageMeta } from "../../lib/metadata";

export const metadata: Metadata = pageMeta(
  "PSARA License Blog — State Guides, Compliance Tips & Industry Insights",
  "Expert-authored articles on PSARA License registration, state-wise guides, training MOU requirements, police verification process, compliance, and industry insights. 300+ agencies trust PSARA Consultant India.",
  "/blog",
  [
    "PSARA License Blog",
    "Security Agency Blog India",
    "PSARA License Guide",
    "Private Security Blog",
    "PSARA Consultant India Blog",
  ]
);

function BlogCard({ post }: { post: (typeof BLOG_POSTS)[number] }) {
  return (
    <Link
      href={`/blog/${post.slug}`}
      className="group relative flex flex-col border border-[var(--line)] transition-all duration-300 hover:border-[var(--line-gold)] hover:translate-y-[-2px]"
      style={{ backgroundColor: "color-mix(in srgb, var(--obsidian-2) 60%, transparent)" }}
    >
      {/* Corner ornament on hover */}
      <span className="absolute top-2 left-2 w-3 h-3 border-t border-l border-transparent group-hover:border-[var(--gold)] transition-colors duration-500 z-10" aria-hidden />
      <span className="absolute top-2 right-2 w-3 h-3 border-t border-r border-transparent group-hover:border-[var(--gold)] transition-colors duration-500 z-10" aria-hidden />

      {/* Cover image */}
      <div className="relative aspect-[16/9] overflow-hidden">
        <Image
          src={post.coverImage}
          alt={`${post.title} — PSARA Consultant India Blog`}
          fill
          sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
          className="object-cover transition-transform duration-500 group-hover:scale-105"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-[var(--obsidian)]/60 via-transparent to-transparent" />
        <div className="absolute bottom-2 left-2 z-10">
          <span className="inline-block px-2 py-0.5 text-[0.45rem] font-bold uppercase tracking-wider"
            style={{ backgroundColor: "var(--gold)", color: "var(--warm-dark)" }}>
            {post.category}
          </span>
        </div>
      </div>

      {/* Content */}
      <div className="flex flex-1 flex-col p-5">
        <div className="flex items-center gap-3 text-[0.6rem] font-medium text-[var(--text-dim)]">
          <span className="flex items-center gap-1">
            <CalendarDays className="h-3 w-3" aria-hidden />
            {new Date(post.publishedAt).toLocaleDateString("en-IN", {
              day: "numeric", month: "short", year: "numeric",
            })}
          </span>
          <span className="flex items-center gap-1">
            <Clock className="h-3 w-3" aria-hidden />
            {post.readTime}
          </span>
        </div>
        <h2 className="mt-3 font-[family-name:var(--font-display)] text-lg font-bold leading-tight text-[var(--cream)] transition-colors group-hover:text-[var(--gold)]">
          {post.title}
        </h2>
        <p className="mt-2 flex-1 text-sm font-medium leading-relaxed text-[var(--text-dim)]">
          {post.excerpt}
        </p>
        <div className="mt-4 flex items-center justify-between">
          <span className="flex items-center gap-2 text-[0.6rem] font-medium text-[var(--text-dim)]">
            <User className="h-3 w-3 text-[var(--gold)]" aria-hidden />
            {post.author}
          </span>
          <span className="text-[0.5rem] font-bold uppercase tracking-wider text-[var(--gold)] opacity-0 group-hover:opacity-100 transition-opacity flex items-center gap-1">
            Read <ArrowUpRight className="h-3 w-3" />
          </span>
        </div>
      </div>
    </Link>
  );
}

export default async function BlogPage({
  searchParams,
}: {
  searchParams: Promise<{ category?: string }>;
}) {
  const { category } = await searchParams;
  const selectedCategory = category || "All";

  const categories = BLOG_CATEGORIES;
  const posts = selectedCategory !== "All"
    ? BLOG_POSTS.filter((p) => p.category === selectedCategory)
    : BLOG_POSTS;

  return (
    <>
      <PageHero
        title="PSARA License Blog"
        lead="Expert guides, state-specific insights, and compliance tips for security agencies across India. Written by our licensing team with 300+ agencies served."
        crumbs={[{ label: "Blog" }]}
      />
      <PageMain>
        {/* Category filter tabs */}
        <div className="mb-8 flex flex-wrap gap-2">
          {categories.map((cat) => {
            const href = cat === "All" ? "/blog" : `/blog?category=${encodeURIComponent(cat)}`;
            const isActive = cat === "All" ? !selectedCategory || selectedCategory === "All" : selectedCategory === cat;
            return (
              <Link
                key={cat}
                href={href}
                className={`border px-3 py-1.5 text-[0.55rem] font-bold uppercase tracking-wider transition-colors ${
                  isActive
                    ? "border-[var(--gold)] bg-[var(--gold)] text-[var(--warm-dark)]"
                    : "border-[var(--line)] text-[var(--text-dim)] hover:border-[var(--gold)] hover:text-[var(--gold)]"
                }`}
              >
                {cat}
              </Link>
            );
          })}
        </div>

        {/* Blog posts grid */}
        <div className="grid grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-3">
          {posts.map((post) => (
            <BlogCard key={post.id} post={post} />
          ))}
        </div>

        {posts.length === 0 && (
          <div className="py-20 text-center">
            <p className="text-lg font-bold text-[var(--cream)]">No posts in this category yet.</p>
            <p className="mt-2 text-sm text-[var(--text-dim)]">
              Check back soon for new articles or{" "}
              <Link href="/blog" className="text-[var(--gold)] underline">
                browse all posts
              </Link>.
            </p>
          </div>
        )}

        {/* Bottom CTA */}
        <div className="mt-12 relative border border-[var(--line-gold)] p-6 text-center"
          style={{ backgroundColor: "color-mix(in srgb, var(--warm-dark-2) 60%, transparent)" }}
        >
          <div className="absolute top-2 left-2 w-3 h-3 border-t border-l border-[var(--gold)] opacity-30" aria-hidden />
          <div className="absolute top-2 right-2 w-3 h-3 border-t border-r border-[var(--gold)] opacity-30" aria-hidden />
          <div className="absolute bottom-2 left-2 w-3 h-3 border-b border-l border-[var(--gold)] opacity-30" aria-hidden />
          <div className="absolute bottom-2 right-2 w-3 h-3 border-b border-r border-[var(--gold)] opacity-30" aria-hidden />
          <p className="text-sm font-bold text-[var(--cream)]">
            Need PSARA License help?{" "}
            <a href="tel:+919983169555" className="text-[var(--gold)] underline hover:text-[var(--gold-soft)]">
              Call +91 99831 69555
            </a>{" "}or{" "}
            <a href="https://wa.me/919983169555" target="_blank" rel="noopener noreferrer"
              className="text-[var(--gold)] underline hover:text-[var(--gold-soft)]">
              WhatsApp us
            </a>.
          </p>
        </div>
      </PageMain>
    </>
  );
}
