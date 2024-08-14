import { connectDb } from "@/lib/database";
import Post from "@/lib/database/models/post.model";
import { NextResponse } from "next/server";

export const GET = async () => {
  try {
    connectDb();
    const banners = await Post.find({
      isBanner: true,
      isDeleted: false,
    })
      .populate({
        path: "categories",
        select: "name _id",
      })
      .limit(4)
      .sort({ createdAt: -1 });

    return NextResponse.json(
      { success: true, banners, message: "Banners fetched successfully" },
      { status: 200 }
    );
  } catch (err) {
    return NextResponse.json(
      { success: false, message: err.message },
      { status: 500 }
    );
  }
};
