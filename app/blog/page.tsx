"use client";

import Image from "next/image";
import { useGetPostsQuery } from "./_data/api";
import Link from "next/link";

export default function BlogPage() {
  const { data } = useGetPostsQuery();

  console.log(data);

  return (
    <section className="mt-5">
      <h1 className="text-center">From the blog</h1>
      <p className="mt-3 mx-auto mb-10 max-w-2xl text-center">
        Lorem ipsum dolor sit amet, consectetur adipiscing elit. Suspendisse
        rhoncus aliquet metus, vel luctus lorem mollis sit amet
      </p>
      <div className="flex gap-10">
        {data?.posts.map((post) => (
          <article
            key={post.id}
            className="w-2/6 bg-white rounded-lg drop-shadow-lg transition ease-in-out delay-150 hover:-translate-y-2"
          >
            <Link href={`/blog/${post.id}`}>
              <div className="relative h-60 overflow-hidden">
                <Image
                  className="object-cover rounded-t-lg"
                  src={post.imageUrl}
                  alt={post.title}
                  fill
                />
              </div>
              <div className="p-5">
                <span className="text-indigo-700">categories</span>
                <h2 className="mt-3">{post.title}</h2>
                <p className="text-gray-400 text-justify mt-5">
                  {post.excerpt}
                </p>
              </div>
            </Link>
          </article>
        ))}
      </div>
    </section>
  );
}
