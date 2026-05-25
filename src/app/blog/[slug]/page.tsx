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
    <main className="mx-auto max-w-2xl px-6 py-20">
      <Link
        href="/blog"
        className="font-sans text-accent"
        style={{ fontSize: "var(--text-footnote)" }}
      >
        ← All essays
      </Link>

      <h1 className="font-serif text-5xl leading-tight mt-6 mb-4">
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
    </main>
  );
}
