import Link from "next/link";
import { AxiosError } from "axios";
import { ArrowRight, CalendarDays, Search } from "lucide-react";
import { getPublicBlogs } from "@/lib/api";

function formatDate(value?: string | null) {
  if (!value) return "Unpublished";
  return new Intl.DateTimeFormat("en", {
    month: "long",
    day: "numeric",
    year: "numeric",
  }).format(new Date(value));
}

function getPostPreview(post: {
  excerpt?: string | null;
  contentText?: string | null;
}) {
  const preview = post.excerpt?.trim() || post.contentText?.trim() || "";

  if (!preview) return "";

  if (/^https?:\/\/(www\.)?linkedin\.com\//i.test(preview)) {
    return "LinkedIn post embedded in this article.";
  }

  return preview;
}

function isDisplayableImage(value?: string | null) {
  if (!value) return false;

  return /^https?:\/\//i.test(value) || value.startsWith("/");
}

export const metadata = {
  title: "Blog | Kairos Nexus Global",
  description:
    "Insights on remote hiring, verified talent, skill assessment, and global work from Kairos Nexus Global.",
};

export const dynamic = "force-dynamic";

export default async function BlogPage({
  searchParams,
}: {
  searchParams?: Promise<{ query?: string }>;
}) {
  const params = await searchParams;
  const query = params?.query || "";
  const response = await getPublicBlogs({
    page: 1,
    limit: 24,
    query: query || undefined,
  }).catch((error: unknown) => {
    if (error instanceof AxiosError) {
      console.error("Failed to load public blogs", {
        message: error.message,
        status: error.response?.status,
        data: error.response?.data,
      });
    } else {
      console.error("Failed to load public blogs", error);
    }

    return { data: [] };
  });
  const posts = response.data || [];

  return (
    <main className="pt-32 pb-20">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <div className="mb-12">
          <span className="text-[#C2185B] font-bold text-xs uppercase tracking-widest mb-2 block">
            Kairos Nexus Global Blog
          </span>
          <h1 className="text-4xl lg:text-6xl font-bold dark:text-white leading-tight">
            Ideas for better remote work
          </h1>
          <p className="text-zinc-500 dark:text-zinc-400 mt-4 max-w-2xl text-lg">
            Hiring playbooks, talent guidance, and verification insights for teams and professionals.
          </p>
        </div>

        <form className="mb-10 flex items-center gap-3 rounded-2xl border border-zinc-100 bg-white px-5 py-3 shadow-sm dark:border-zinc-800 dark:bg-zinc-950">
          <Search className="h-5 w-5 text-zinc-400" />
          <input
            name="query"
            defaultValue={query}
            placeholder="Search articles"
            className="w-full bg-transparent py-2 text-sm outline-none dark:text-white"
          />
          <button className="rounded-xl bg-[#C2185B] px-5 py-2 text-sm font-semibold text-white">
            Search
          </button>
        </form>

        {posts.length === 0 ? (
          <div className="rounded-2xl border border-zinc-100 bg-white p-10 text-center dark:border-zinc-800 dark:bg-zinc-950">
            <p className="text-lg font-semibold dark:text-white">No articles found</p>
            <p className="mt-2 text-sm text-zinc-500">
              Published posts will appear here once the team adds them.
            </p>
          </div>
        ) : (
          <div className="grid gap-6 md:grid-cols-2 xl:grid-cols-3">
            {posts.map((post) => (
              <Link
                key={post.id}
                href={`/blog/${post.slug}`}
                className="group overflow-hidden rounded-2xl border border-zinc-100 bg-white shadow-sm transition hover:-translate-y-1 hover:shadow-xl dark:border-zinc-800 dark:bg-zinc-950"
              >
                {isDisplayableImage(post.coverImage) ? (
                  <img
                    src={post.coverImage!}
                    alt={post.title}
                    className="h-52 w-full object-cover"
                  />
                ) : (
                  <div className="h-52 w-full bg-gradient-to-br from-zinc-100 to-pink-50 dark:from-zinc-900 dark:to-zinc-800" />
                )}
                <div className="p-6">
                  <div className="mb-4 flex items-center gap-2 text-xs font-medium text-zinc-500">
                    <CalendarDays className="h-4 w-4" />
                    {formatDate(post.publishedAt)}
                  </div>
                  <h2 className="text-xl font-bold leading-snug dark:text-white">
                    {post.title}
                  </h2>
                  {getPostPreview(post) && (
                    <p className="mt-3 line-clamp-3 text-sm leading-6 text-zinc-500 dark:text-zinc-400">
                      {getPostPreview(post)}
                    </p>
                  )}
                  <div className="mt-5 flex items-center text-sm font-semibold text-[#C2185B]">
                    Read article
                    <ArrowRight className="ml-2 h-4 w-4 transition group-hover:translate-x-1" />
                  </div>
                </div>
              </Link>
            ))}
          </div>
        )}
      </div>
    </main>
  );
}
