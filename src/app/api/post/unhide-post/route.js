import { connectDb } from "@/lib/database";
import Category from "@/lib/database/models/category.model";
import Post from "@/lib/database/models/post.model";
import { NextResponse } from "next/server";

export const POST = async (req) => {
  try {
    const { id } = await req.json();
    connectDb();
    const data = await Post.findByIdAndUpdate(id, { isDeleted: false });

    if (!data) {
      return NextResponse.json(
        { success: false, message: "Post not found" },
        {
          status: 404,
        }
      );
    }

    await Category.updateMany(
      { _id: { $in: data.categories } },
      { $set: { isDeleted: false } }
    );

    return NextResponse.json(
      {
        success: true,
        message: "Unhid post and it's categories successfully",
        data,
      },
      {
        status: 200,
      }
    );
  } catch (err) {
    return NextResponse.json(
      { success: false, message: err.message },
      {
        status: 500,
      }
    );
  }
};
