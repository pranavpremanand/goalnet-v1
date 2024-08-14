import { connectDb } from "@/lib/database";
import Post from "@/lib/database/models/post.model";
import { NextResponse } from "next/server";

// create a new post
export const POST = async (req) => {
  const body = await req.json();
  try {
    connectDb()
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

// update post
export const PATCH = async (req) => {
  const body = await req.json();
  console.log(body)
  try {
    connectDb()
    const data = await Post.findByIdAndUpdate(body.id, body);
    return NextResponse.json(
      { success: true, data, message: "Post updated successfully" },
      { status: 201 }
    );
  } catch (err) {
    return NextResponse.json(
      { success: false, message: err.message },
      { status: 500 }
    );
  }
}