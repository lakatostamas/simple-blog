import { NextRequest, NextResponse } from "next/server";
import blog from "../blog.json";

export async function GET(req: NextRequest) {
  return NextResponse.json({
    categories: blog.categories,
  });
}
