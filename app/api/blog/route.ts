import { NextRequest, NextResponse } from "next/server";
import blog from "../blog.json";

const getNormalizedQueries = (qs: URLSearchParams) => {
  const searchParams = new URLSearchParams(qs);

  const titleQuery = searchParams.get("title")?.toLowerCase() ?? null;
  const categoryId = searchParams.get("category");
  const pageQuery = searchParams.get("page");

  return {
    titleQuery,
    categoryIdQuery: categoryId ? parseInt(categoryId, 10) : null,
    pageQuery: pageQuery ? parseInt(pageQuery, 10) : 0,
  };
};

const PAGE_SIZE = 5;

export async function GET(req: NextRequest) {
  const { titleQuery, categoryIdQuery, pageQuery } = getNormalizedQueries(
    req.nextUrl.searchParams
  );

  const matchingPosts = blog.posts.filter((post) => {
    if (titleQuery) {
      return post.title.toLowerCase().includes(titleQuery.toLowerCase());
    }

    if (categoryIdQuery) {
      return post.categories.includes(categoryIdQuery);
    }

    return true;
  });

  return NextResponse.json({
    posts: matchingPosts.slice(
      pageQuery * PAGE_SIZE,
      (pageQuery + 1) * PAGE_SIZE
    ),
  });
}
