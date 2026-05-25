import Link from "next/link";

import { sanityFetch } from "@/sanity/lib/live";
import { postsQuery, type PostListItem } from "@/sanity/queries";

export default async function BlogIndex() {
  const { data } = await sanityFetch({ query: postsQuery });
  const posts = (data ?? []) as PostListItem[];

  return (
    <main className="mx-auto max-w-2xl px-6 py-20">
      <h1 className="font-serif text-5xl leading-tight mb-12">Essays</h1>

      {posts.length === 0 ? (
        <p className="font-sans text-accent">
          No published essays yet. Create one in the Studio and publish it.
        </p>
      ) : (
        <ul className="space-y-10">
          {posts.map((post) => (
            <li key={post._id}>
              <Link href={`/blog/${post.slug}`} className="block group">
                <h2 className="font-serif text-3xl group-hover:text-accent transition-colors">
                  {post.title}
                </h2>
                {post.publishedAt ? (
                  <p
                    className="font-sans text-accent mt-1"
                    style={{ fontSize: "var(--text-footnote)" }}
                  >
                    {new Date(post.publishedAt).toLocaleDateString("en-US", {
                      year: "numeric",
                      month: "long",
                      day: "numeric",
                    })}
                  </p>
                ) : null}
                {post.excerpt ? (
                  <p className="mt-2">{post.excerpt}</p>
                ) : null}
              </Link>
            </li>
          ))}
        </ul>
      )}
    </main>
  );
}
