"use client";

import { useEffect, useMemo, useState } from "react";
import { useRouter, usePathname, useSearchParams } from "next/navigation";
import qs from "qs";
import { useGetCategoriesQuery, useGetPostsQuery } from "./_data/api";
import Post from "./_components/Post";
import { useDebounce } from "@/src/hooks/useDebounce";

export default function BlogPage() {
  const router = useRouter();
  const pathname = usePathname();
  const searchParams = useSearchParams();
  const [page, setPage] = useState(
    parseInt(searchParams.get("page") as string, 10) ?? 0
  );
  const [category, setCategory] = useState<string>(
    searchParams.get("category") ?? ""
  );
  const [searchString, setSearchString] = useState("");
  const debouncedSearchString = useDebounce<string>(searchString, 500);

  const { data: postsData } = useGetPostsQuery(
    qs.stringify({
      page,
      category,
      title: debouncedSearchString,
    })
  );

  const { data: categoriesData } = useGetCategoriesQuery();

  useEffect(() => {
    const query = qs.stringify({
      page,
      category,
      title: debouncedSearchString,
    });
    router.push(`${pathname}?${query}`);
  }, [page, router, pathname, category, debouncedSearchString]);

  const normalizedPosts = useMemo(() => {
    if (!categoriesData || !postsData) {
      return [];
    }

    return (postsData.posts ?? []).map((post) => ({
      ...post,
      categories: post.categories
        .map((categoryId) =>
          (categoriesData?.categories ?? []).find(
            (category) => category.id === categoryId
          )
        )
        .filter(Boolean),
    }));
  }, [categoriesData, postsData]);

  const totalPageCount = useMemo(
    () => Math.floor((postsData?.totalCount ?? 0) / (postsData?.pageSize ?? 0)),
    [postsData?.totalCount, postsData?.pageSize]
  );

  const onCategoryChange = (ev: React.ChangeEvent<HTMLSelectElement>) => {
    setPage(0);
    setCategory(ev.target.value);
  };

  const onSearchStringChange = (ev: React.ChangeEvent<HTMLInputElement>) => {
    setPage(0);
    setSearchString(ev.target.value);
  };

  return (
    <section className="mt-5">
      <h1 className="text-center">From the blog</h1>
      <p className="mt-3 mx-auto mb-10 max-w-2xl text-center">
        Lorem ipsum dolor sit amet, consectetur adipiscing elit. Suspendisse
        rhoncus aliquet metus, vel luctus lorem mollis sit amet
      </p>
      <div className="flex flex-col items-center">
        <input
          className="shadow appearance-none border rounded w-full lg:w-1/2 py-4 px-3 mb-10 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
          id="title"
          type="text"
          placeholder="Search..."
          value={searchString}
          onChange={onSearchStringChange}
        />

        <select
          id="categories"
          className="shadow border rounded lg:w-1/2 w-full py-4 px-3 mb-10 text-gray-700 focus:outline-none focus:shadow-outline"
          onChange={onCategoryChange}
          value={category}
        >
          <option value="">Select a category</option>
          {(categoriesData?.categories ?? []).map((category) => (
            <option key={`cat-${category.id}`} value={category.id}>
              {category.name}
            </option>
          ))}
        </select>
      </div>

      <div className="flex flex-col items-center gap-10 lg:flex-row lg:items-stretch">
        {normalizedPosts.map((post) => (
          <Post key={post.id} post={post} />
        ))}
      </div>
      <div className="flex justify-between mt-10">
        <button
          className="bg-indigo-600 hover:bg-indigi-800 text-white font-bold py-2 px-4 rounded"
          onClick={() => setPage(Math.max(0, page - 1))}
        >
          Previous Posts
        </button>
        <button
          className="bg-indigo-600 hover:bg-indigi-800 text-white font-bold py-2 px-4 rounded"
          onClick={() => setPage(Math.min(totalPageCount, page + 1))}
        >
          Next Posts
        </button>
      </div>
    </section>
  );
}
