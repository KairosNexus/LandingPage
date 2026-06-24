import Link from "next/link";
import { notFound } from "next/navigation";
import { ArrowLeft, CalendarDays } from "lucide-react";
import { getPublicBlogBySlug } from "@/lib/api";

export const dynamic = "force-dynamic";

function formatDate(value?: string | null) {
  if (!value) return "";
  return new Intl.DateTimeFormat("en", {
    month: "long",
    day: "numeric",
    year: "numeric",
  }).format(new Date(value));
}

function escapeHtml(value: string) {
  return value
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;")
    .replace(/'/g, "&#39;");
}

function getLinkedInEmbedUrn(url: string) {
  const decodedUrl = decodeURIComponent(url);
  const urnMatch = decodedUrl.match(/urn:li:(?:activity|share|ugcPost):[A-Za-z0-9:-]+/);

  if (urnMatch) return urnMatch[0];

  const activityMatch = decodedUrl.match(/activity-(\d+)/);
  if (activityMatch?.[1]) return `urn:li:activity:${activityMatch[1]}`;

  const shareMatch = decodedUrl.match(/share-(\d+)/);
  if (shareMatch?.[1]) return `urn:li:share:${shareMatch[1]}`;

  return null;
}

function renderLinkedInEmbed(url: string) {
  const urn = getLinkedInEmbedUrn(url);
  const safeUrl = escapeHtml(url);

  if (!urn) {
    return `<p class="my-6 rounded-2xl border border-zinc-200 bg-zinc-50 p-4 text-sm dark:border-zinc-800 dark:bg-zinc-900"><a href="${safeUrl}" target="_blank" rel="noreferrer">View LinkedIn post</a></p>`;
  }

  const iframeSrc = `https://www.linkedin.com/embed/feed/update/${urn}`;

  return `<div class="my-8 overflow-hidden rounded-2xl border border-zinc-200 bg-white shadow-sm dark:border-zinc-800 dark:bg-zinc-950"><iframe src="${escapeHtml(iframeSrc)}" title="Embedded LinkedIn post" height="560" width="100%" frameborder="0" allowfullscreen="" loading="lazy"></iframe><p class="border-t border-zinc-100 px-4 py-2 text-xs text-zinc-500 dark:border-zinc-800"><a href="${safeUrl}" target="_blank" rel="noreferrer">Open on LinkedIn</a></p></div>`;
}

function renderBlogContent(contentHtml: string) {
  return contentHtml.replace(
    /<blockquote\b[^>]*data-linkedin-embed[^>]*>[\s\S]*?<\/blockquote>/g,
    (match) => {
      const url =
        match.match(/\surl=["']([^"']+)["']/i)?.[1] ||
        match.match(/<a\b[^>]*href=["']([^"']+)["']/i)?.[1];

      return url ? renderLinkedInEmbed(url) : match;
    },
  );
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const response = await getPublicBlogBySlug(slug).catch(() => null);
  const post = response?.data;

  if (!post) {
    return {
      title: "Blog post not found | Kairos",
    };
  }

  return {
    title: `${post.title} | Kairos Blog`,
    description: post.excerpt || post.contentText || "Kairos blog article.",
    openGraph: {
      title: post.title,
      description: post.excerpt || post.contentText || "Kairos blog article.",
      images: post.coverImage ? [post.coverImage] : [],
    },
  };
}

export default async function BlogDetailPage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const response = await getPublicBlogBySlug(slug).catch(() => null);
  const post = response?.data;

  if (!post) {
    notFound();
  }

  const authorName = [post.author?.profile?.firstName, post.author?.profile?.lastName]
    .filter(Boolean)
    .join(" ");

  return (
    <main className="pt-28 pb-20">
      <article>
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <Link
            href="/blog"
            className="mb-8 inline-flex items-center text-sm font-medium text-zinc-500 transition hover:text-[#C2185B]"
          >
            <ArrowLeft className="mr-2 h-4 w-4" />
            Back to blog
          </Link>

          <header className="mx-auto max-w-4xl">
            <div className="mb-5 flex flex-wrap items-center gap-3 text-sm text-zinc-500">
              <span className="inline-flex items-center gap-2">
                <CalendarDays className="h-4 w-4" />
                {formatDate(post.publishedAt)}
              </span>
              {authorName && <span>{authorName}</span>}
            </div>

            <h1 className="text-4xl font-bold leading-tight dark:text-white lg:text-6xl">
              {post.title}
            </h1>
            {post.excerpt && (
              <p className="mt-5 text-lg leading-8 text-zinc-500 dark:text-zinc-400">
                {post.excerpt}
              </p>
            )}

            {post.tags?.length > 0 && (
              <div className="mt-6 flex flex-wrap gap-2">
                {post.tags.map((tag) => (
                  <span
                    key={tag}
                    className="rounded-full bg-pink-50 px-3 py-1 text-xs font-semibold text-[#C2185B] dark:bg-zinc-900"
                  >
                    {tag}
                  </span>
                ))}
              </div>
            )}
          </header>
        </div>

        {post.coverImage && (
          <div className="container mx-auto mt-10 px-4 sm:px-6 lg:px-8">
            <div className="mx-auto max-w-6xl rounded-3xl bg-zinc-50 p-2 dark:bg-zinc-900">
              <img
                src={post.coverImage}
                alt={post.title}
                className="mx-auto max-h-[560px] w-auto max-w-full rounded-2xl object-contain"
              />
            </div>
          </div>
        )}

        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div
            className="blog-content mx-auto mt-12 max-w-3xl"
            dangerouslySetInnerHTML={{ __html: renderBlogContent(post.contentHtml) }}
          />
        </div>
      </article>
    </main>
  );
}
