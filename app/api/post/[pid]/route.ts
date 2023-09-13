import { NextApiRequest } from "next";
import { NextResponse } from "next/server";
import blog from "../../blog.json";

export async function GET(
  _req: NextApiRequest,
  { params }: { params: { pid: string } }
) {
  const { pid } = params;
  const postId = parseInt(pid, 10);
  const post = blog.posts.find((post) => post.id === postId);

  if (!post) {
    return new Response("Not found", {
      status: 404,
    });
  }

  return NextResponse.json({ post });
}
