import { NextApiRequest } from "next";
import { NextResponse } from "next/server";
import blog from "../../blog.json";

export async function GET(
  _req: NextApiRequest,
  { params }: { params: { slug: string } }
) {
  const { slug } = params;
  const post = blog.posts.find((post) => post.slug === slug);

  if (!post) {
    return new Response("Not found", {
      status: 404,
    });
  }

  return NextResponse.json({ post });
}
