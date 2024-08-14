import { connectDb } from "@/lib/database";
import Category from "@/lib/database/models/category.model";
import Post from "@/lib/database/models/post.model";
import { NextResponse } from "next/server";

export const GET = async (req, { params }) => {
  try {
    const { id } = params;
    connectDb();
    const data = await Post.findById(id).populate({
      path: "categories",
      select: "name _id",
    });
    const categories = await Category.find();
    if (!data) {
      return NextResponse.json(
        { success: false, message: "Post not found" },
        { status: 404 }
      );
    }
    return NextResponse.json(
      { success: true, message: "Post fetched successfully", data, categories },
      { status: 200 }
    );
  } catch (err) {
    NextResponse.json(
      { success: false, message: err.message },
      { status: 500 }
    );
  }
};

// change post visibility
export const POST = async (req, { params }) => {
  try {
    const { id } = params;
    const { isDeleted } = await req.json();
    connectDb();
    await Post.updateOne({ _id: id }, { $set: { isDeleted } });
    return NextResponse.json(
      {
        success: true,
        message: isDeleted
          ? "Hid the post successfully"
          : "Unhid the post successfully",
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

// delete post
export const DELETE = async (req, { params }) => {
  try {
    const { id } = params;
    connectDb();
    await Post.deleteOne({ _id: id });
    return NextResponse.json(
      { success: true, message: "Post deleted successfully" },
      { status: 200 }
    );
  } catch (err) {
    return NextResponse.json(
      { success: false, message: err.message },
      { status: 500 }
    );
  }
};
