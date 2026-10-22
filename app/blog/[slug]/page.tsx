import type { Metadata } from "next";
import { existsSync } from "node:fs";
import path from "node:path";
import Image from "next/image";
import Link from "next/link";
import { notFound } from "next/navigation";
import { CalendarDays, Clock, User, ArrowLeft } from "lucide-react";
import { BLOG_POSTS } from "../../../data/blog";
import { PageHero, PageMain, Prose } from "../../../components/PageShell";
import StageShell from "../../components/ui/StageShell";
import { GlassCard, CTABand } from "../../../components/v3/PagePrimitives";
import JsonLd from "../../../components/JsonLd";
import { pageMeta } from "../../../lib/metadata";
import { hubHeroImage } from "../../lib/location-accent";
import { SITE, CONTACT } from "../../../lib/config";

export function generateStaticParams() {
  return BLOG_POSTS.map((post) => ({ slug: post.slug }));
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>;
}): Promise<Metadata> {
  const { slug } = await params;
  const post = BLOG_POSTS.find((p) => p.slug === slug);
  if (!post) return {};
  const ogPath = `/assets/images/og/${slug}-og.svg`;
  const resolvedOgPath = existsSync(path.join(process.cwd(), "public", ogPath.slice(1)))
    ? ogPath
    : "/assets/images/og/default-og.jpg";
  return pageMeta(
    post.title,
    post.excerpt,
    `/blog/${slug}`,
    post.tags,
    resolvedOgPath
  );
}

export default async function BlogPostPage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const post = BLOG_POSTS.find((p) => p.slug === slug);
  if (!post) notFound();

  const related = BLOG_POSTS.filter(
    (p) => p.slug !== slug && (p.category === post.category || p.tags.some((t) => post.tags.includes(t)))
  ).slice(0, 3);
  const coverImage = existsSync(path.join(process.cwd(), "public", post.coverImage.slice(1)))
    ? post.coverImage
    : "/assets/images/generated/hero-poster.webp";

  // BlogPosting JSON-LD
  const blogPostingSchema = {
    "@context": "https://schema.org",
    "@type": "BlogPosting",
    "@id": `${SITE.url}/blog/${slug}`,
    headline: post.title,
    description: post.excerpt,
    image: `${SITE.url}${coverImage}`,
    datePublished: post.publishedAt,
    dateModified: post.modifiedAt,
    author: {
      "@type": "Person",
      name: post.author,
      ...(post.role ? { description: post.role } : {}),
    },
    publisher: {
      "@type": "Organization",
      name: SITE.name,
      logo: {
        "@type": "ImageObject",
        url: `${SITE.url}/logo.png`,
      },
    },
    mainEntityOfPage: {
      "@type": "WebPage",
      "@id": `${SITE.url}/blog/${slug}`,
    },
    about: {
      "@type": "Thing",
      name: post.category,
    },
    keywords: post.tags.join(", "),
  }

  // Breadcrumb schema
  const breadcrumbSchema = {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    itemListElement: [
      { "@type": "ListItem", position: 1, name: "Home", item: SITE.url },
      { "@type": "ListItem", position: 2, name: "Blog", item: `${SITE.url}/blog` },
      { "@type": "ListItem", position: 3, name: post.title, item: `${SITE.url}/blog/${slug}` },
    ],
  }

  return (
    <StageShell showCta={false}>
      <JsonLd data={blogPostingSchema} />
      <JsonLd data={breadcrumbSchema} />

      <PageHero
        title={post.title}
        lead={post.excerpt}
        crumbs={[
          { label: "Blog", href: "/blog" },
          { label: post.title.slice(0, 40) + "..." },
        ]}
        locationSlug={post.slug}
        image={hubHeroImage(post.slug)}
        meta={`( ${post.category.toUpperCase()} ) ( ${post.readTime} )`}
      />

      <PageMain>
        {/* Featured cover image */}
        <div className={`relative mb-12 overflow-hidden rounded-2xl bg-[#1a1510] ${coverImage.endsWith(".svg") ? "aspect-[1200/630]" : "aspect-[4/3] sm:aspect-[21/9]"}`}>
          <Image
            src={coverImage}
            alt={`${post.title} — PSARA Consultant India blog cover`}
            fill
            priority
            sizes="100vw"
            className={coverImage.endsWith(".svg") ? "object-contain" : "object-cover"}
          />
          <div className="absolute inset-0 bg-gradient-to-t from-[var(--obsidian)]/40 via-transparent to-transparent" />
          <div className="absolute bottom-5 left-5 right-5 flex w-fit max-w-[calc(100%-2.5rem)] items-center gap-3 rounded-full border border-white/20 bg-[#081426]/75 px-3 py-2 backdrop-blur-md">
            <Image src="/assets/images/brand/psara-consultant-india-mark-transparent.png" alt="PSARA Consultant India" width={34} height={34} className="h-8 w-8 object-contain" />
            <span className="text-xs font-medium text-white">PSARA Consultant India</span>
          </div>
        </div>

        <div className="grid min-w-0 grid-cols-1 gap-14 lg:grid-cols-12">
          <article className="min-w-0 lg:col-span-8">
            {/* Meta info bar */}
            <div className="mb-10 flex flex-wrap items-center gap-x-5 gap-y-4 border-b border-white/15 pb-7 text-sm text-[#B9C2D3]">
              <span className="flex min-w-0 flex-wrap items-center gap-1.5">
                <CalendarDays className="h-4 w-4 text-[var(--gold-bright)]" aria-hidden />
                {new Date(post.publishedAt).toLocaleDateString("en-IN", {
                  day: "numeric",
                  month: "long",
                  year: "numeric",
                })}
              </span>
              <span className="flex min-w-0 flex-wrap items-center gap-1.5">
                <Clock className="h-4 w-4 text-[var(--gold-bright)]" aria-hidden />
                {post.readTime}
              </span>
              <span className="flex min-w-0 flex-wrap items-center gap-1.5">
                <User className="h-4 w-4 shrink-0 text-[var(--gold-bright)]" aria-hidden />
                {post.author}
                {post.role && (
                  <span className="text-[#B9C2D3]">· {post.role}</span>
                )}
              </span>
              <span className="rounded border border-white/10 px-2 py-0.5 text-[11px] font-bold uppercase tracking-wider text-[var(--gold-bright)]">
                {post.category}
              </span>
            </div>

            {/* Content */}
            <Prose>
              <div dangerouslySetInnerHTML={{ __html: post.content }} />

              <div className="mt-8 border-t border-white/10 pt-6">
                <p className="text-sm font-bold text-white">
                  Tags:{" "}
                  {post.tags.map((tag) => (
                    <span
                      key={tag}
                      className="mr-2 inline-block rounded border border-white/10 px-2 py-0.5 text-[11px] font-medium text-[#B9C2D3]"
                    >
                      {tag}
                    </span>
                  ))}
                </p>
              </div>

              <GlassCard className="mt-10 p-6 sm:p-8">
                <h3 className="font-[family-name:var(--font-display)] text-2xl font-normal text-white">
                  Need Help With Your PSARA License?
                </h3>
                <p className="mt-2 text-sm text-[#B9C2D3]">
                  Contact PSARA Consultant India at <strong>{CONTACT.phoneDisplay}</strong> or send us a
                  WhatsApp message. Our team of experienced licensing advisors is ready to assist with
                  your application.
                </p>
                <div className="mt-4 flex flex-wrap gap-3">
                  <a
                    href={`tel:${CONTACT.phoneRaw}`}
                    className="inline-flex items-center gap-2 rounded-full px-5 py-2.5 text-xs font-bold uppercase tracking-wider transition-opacity hover:opacity-90"
                    style={{ background: "var(--grad-metal)", color: "var(--void)" }}
                  >
                    Call {CONTACT.phoneDisplay}
                  </a>
                  <a
                    href={`https://wa.me/${CONTACT.whatsapp.number}?text=${encodeURIComponent("Hello PSARA Consultant India — I read your blog and need help with PSARA License.")}`}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center gap-2 rounded-full border border-[var(--gold)]/30 px-5 py-2.5 text-xs font-bold uppercase tracking-wider text-[var(--gold-bright)] transition-colors hover:bg-white/5"
                  >
                    WhatsApp Us
                  </a>
                </div>
              </GlassCard>
            </Prose>

            <div className="mt-8">
              <Link
                href="/blog"
                className="inline-flex items-center gap-2 text-sm font-bold text-[var(--gold-bright)] underline"
              >
                <ArrowLeft className="h-4 w-4" />
                Back to all articles
              </Link>
            </div>
          </article>

          {/* Sidebar */}
          <aside className="min-w-0 lg:col-span-4">
            <div className="space-y-6 lg:sticky lg:top-28">
              {/* Category */}
              <GlassCard className="p-6">
                <h3 className="font-[family-name:var(--font-display)] text-2xl font-normal text-[#FFFDF5]">
                  Category
                </h3>
                <p className="mt-2 text-sm text-white">{post.category}</p>
              </GlassCard>

              {/* Author */}
              <GlassCard className="p-6">
                <h3 className="font-[family-name:var(--font-display)] text-2xl font-normal text-[#FFFDF5]">
                  Author
                </h3>
                <p className="mt-2 text-sm font-bold text-white">{post.author}</p>
                {post.role && (
                  <p className="mt-0.5 text-xs text-[#B9C2D3]">{post.role}</p>
                )}
              </GlassCard>

              {/* Related posts */}
              {related.length > 0 && (
                <GlassCard className="p-6">
                  <h3 className="font-[family-name:var(--font-display)] text-2xl font-normal text-[#FFFDF5]">
                    Related Articles
                  </h3>
                  <ul className="mt-3 space-y-3">
                    {related.map((r) => (
                      <li key={r.slug}>
                        <Link
                          href={`/blog/${r.slug}`}
                          className="group block"
                        >
                          <p className="text-sm font-bold text-white transition-colors group-hover:text-[var(--gold-bright)]">
                            {r.title}
                          </p>
                          <p className="mt-0.5 text-xs text-[#B9C2D3]">
                            {r.category} · {r.readTime}
                          </p>
                        </Link>
                      </li>
                    ))}
                  </ul>
                </GlassCard>
              )}

              {/* CTA */}
              <GlassCard className="p-6">
                <h3 className="font-[family-name:var(--font-display)] text-2xl font-normal text-white">
                  Get PSARA License Help
                </h3>
                <p className="mt-2 text-xs text-[#B9C2D3]">
                  300+ agencies across 36 States &amp; UTs trust us. Call or WhatsApp for a free consultation.
                </p>
                <div className="mt-4 space-y-2">
                  <a
                    href={`tel:${CONTACT.phoneRaw}`}
                    className="block w-full rounded-full py-2.5 text-center text-xs font-bold uppercase tracking-wider"
                    style={{ background: "var(--grad-metal)", color: "var(--void)" }}
                  >
                    Call {CONTACT.phoneDisplay}
                  </a>
                </div>
              </GlassCard>
            </div>
          </aside>
        </div>

        <CTABand title="Ready to Start Your PSARA Application?" lead="Call or WhatsApp — Jaipur · Delhi · Gurugram · Noida · Ahmedabad" />
      </PageMain>
    </StageShell>
  );
}
