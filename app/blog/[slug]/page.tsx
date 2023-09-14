"use client";

import { useMemo } from "react";
import Link from "next/link";

import Post from "../_components/Post";
import { useGetCategoriesQuery, useGetPostQuery } from "../_data/api";
import { normalizeCategories } from "../_utils/normalizeCategories";

export default function BlogPage({ params }: { params: { slug: string } }) {
  const { data: postData } = useGetPostQuery(params.slug);
  const { data: categoriesData } = useGetCategoriesQuery();

  const normalizedPost = useMemo(() => {
    if (!categoriesData || !postData) {
      return null;
    }

    return normalizeCategories(postData?.post, categoriesData?.categories);
  }, [categoriesData, postData]);

  return (
    <section className="mt-5">
      <div className="text-center mb-5">
        <Link href="/blog" className="text-indigo-600">
          Back to posts
        </Link>
      </div>
      {normalizedPost && <Post post={normalizedPost} variant="page" />}
    </section>
  );
}
