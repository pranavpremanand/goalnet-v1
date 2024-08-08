import { connectDb } from "@/lib/database";
import Post from "@/lib/database/models/post.model";
import { NextResponse } from "next/server";

// create a new post
export const POST = async (req) => {
  try {
    connectDb();
    const body = await req.json();
    const data = await Post.create(body);
    return NextResponse.json(
      { success: true, data, message: "Post created successfully" },
      { status: 201 }
    );
  } catch (err) {
    return NextResponse.json(
      { success: false, message: err.message },
      { status: 500 }
    );
  }
};
