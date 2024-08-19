import { connectDb } from "@/lib/database";
import Category from "@/lib/database/models/category.model";
import Post from "@/lib/database/models/post.model";
import { NextResponse } from "next/server";

export const GET = async (req) => {
  try {
    connectDb();
    const transfersId = await Category.findOne({
      isDeleted: false,
      name: "Transfer News",
    })
    const data = await Post.find({ categories: transfersId })
      .populate({ path: "categories", select: "name _id" })
      .sort({ createdAt: -1 })
      .limit(3);
    return NextResponse.json(
      { success: true, data, message: "Transfers fetched successfully" },
      { status: 200 }
    );
  } catch (err) {
    return NextResponse.json(
      { success: false, message: err.message },
      { status: 500 }
    );
  }
};
