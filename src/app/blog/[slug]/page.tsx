import { notFound } from "next/navigation";
import Link from "next/link";

import { PortableBody } from "@/components/PortableBody";
import { SanityImage } from "@/components/SanityImage";
import { sanityFetch } from "@/sanity/lib/live";
import { postBySlugQuery, type PostFull } from "@/sanity/queries";

export default async function PostPage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const { data } = await sanityFetch({
    query: postBySlugQuery,
    params: { slug },
  });
  const post = data as PostFull | null;

  if (!post) notFound();

  return (
    <div className="max-w-2xl xl:max-w-[58rem]">
      {/* Sticky module labels, aligned over the text and the footnotes gutter */}
      <div
        className="sticky top-0 z-10 flex bg-[var(--background)] border-b border-[var(--rule)] font-sans uppercase tracking-wide text-foreground/50"
        style={{ fontSize: "var(--text-footnote)" }}
      >
        <div className="flex-1 px-6 py-3">Library</div>
        <div
          className="hidden xl:block px-6 py-3 border-l border-[var(--rule)]"
          style={{ width: "calc(var(--notes-w) + 2rem)" }}
        >
          Footnotes
        </div>
      </div>

      <article className="essay">
        <Link
          href="/blog"
          className="font-sans text-accent"
          style={{ fontSize: "var(--text-footnote)" }}
        >
          ← All essays
        </Link>

        <h1 className="font-serif text-5xl leading-tight mt-4 mb-3">
          {post.title}
        </h1>

        {post.publishedAt ? (
          <p
            className="font-sans text-accent mb-8"
            style={{ fontSize: "var(--text-footnote)" }}
          >
            {new Date(post.publishedAt).toLocaleDateString("en-US", {
              year: "numeric",
              month: "long",
              day: "numeric",
            })}
          </p>
        ) : null}

        {post.coverImage ? <SanityImage value={post.coverImage} /> : null}

        {post.body ? <PortableBody body={post.body} /> : null}
      </article>
    </div>
  );
}
