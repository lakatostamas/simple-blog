"use client";

import { useGetPostsQuery } from "./_data/api";

export default function BlogPage() {
  const { data } = useGetPostsQuery();

  console.log(data);

  return (
    <section className="mt-5">
      <h1 className="text-center">From the blog</h1>
      <p className="mt-3 max-w-2xl text-center">
        Lorem ipsum dolor sit amet, consectetur adipiscing elit. Suspendisse
        rhoncus aliquet metus, vel luctus lorem mollis sit amet
      </p>
      <div className="flex">
        <div>
          image
          <div>categoriesList title description</div>
        </div>
      </div>
    </section>
  );
}
