import { connectDb } from "@/lib/database";
import Post from "@/lib/database/models/post.model";
import { NextResponse } from "next/server";

export const POST = async (req) => {
  const { currentPostId, categoryList } = await req.json();
  try {
    connectDb();
    const data = await Post.find({
      _id: { $ne: currentPostId },
      categories: categoryList,
      isDeleted: false,
    })
      .populate({ path: "categories", select: "name _id" })
      .limit(4)
      .sort({
        createdAt: -1,
      });

    return NextResponse.json(
      { success: true, message: "Posts fetched successfully", data },
      { status: 200 }
    );
  } catch (err) {
    NextResponse.json(
      { success: false, message: err.message },
      { status: 500 }
    );
  }
};
