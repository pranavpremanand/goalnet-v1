import Post from "@/utils/database/models/post.model";
import { NextResponse } from "next/server";

export const GET = async () => {
  try {
    const data = await Post.find({ isDeleted: false }).sort({
      createdAt: "desc",
    });
    const banners = data.filter((post) => post.isBanner);
    return NextResponse.json(
      {
        success: true,
        data: { banners, posts: data },
        message: "Posts fetched successfully",
      },
      { status: 200 }
    );
  } catch (err) {
    return NextResponse.json(
      { success: false, message: err.message },
      { status: 500 }
    );
  }
};

// create a new post
export const POST = async (req) => {
  try {
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
