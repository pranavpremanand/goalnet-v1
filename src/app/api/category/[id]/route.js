import { connectDb } from "@/lib/database";
import Category from "@/lib/database/models/category.model";
import Post from "@/lib/database/models/post.model";
import { NextResponse } from "next/server";

// delete a category
export const POST = async (req, { params }) => {
  try {
    connectDb();
    const { id } = params;

    const postsExist = await Post.findOne({ categories: id, isDeleted: false });
    if (postsExist) {
      return NextResponse.json(
        {
          success: false,
          message:
            "Category cannot be deleted.\nPosts exist with this category",
          deletePostsConfirmation: true,
        },
        { status: 400 }
      );
    }

    const data = await Category.findByIdAndUpdate(id, { isDeleted: true });
    return NextResponse.json(
      {
        success: true,
        data,
        message: "Category deleted successfully",
        deletePostsConfirmation: false,
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

// delete a category with it's posts
export const DELETE = async (req, { params }) => {
  try {
    connectDb();
    const { id } = params;

    await Post.updateMany({ category: id }, { $set: { isDeleted: true } });
    await Category.updateOne({ _id: id }, { $set: { isDeleted: true } });
    return NextResponse.json(
      { success: true, message: "Category deleted successfully" },
      { status: 200 }
    );
  } catch (err) {
    return NextResponse.json(
      { success: false, message: err.message },
      { status: 500 }
    );
  }
};
