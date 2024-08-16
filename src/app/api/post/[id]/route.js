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
    const post = await Post.findById(id).populate({
      path: "categories",
      select: "name _id isDeleted",
    });

    if (!post) {
      return NextResponse.json(
        { success: false, message: "Post not found" },
        { status: 404 }
      );
    }

    if (post.isDeleted) {
      // check for all hidden categories linked to this post
      const hiddenCategories = post.categories.filter(
        (category) => category.isDeleted
      );
      if (hiddenCategories.length > 0) {
        const hiddenCategoryNames = hiddenCategories.map(
          (category) => category.name
        );
        return NextResponse.json(
          {
            success: false,
            message: `Cannot unhide post.\nThe following categories are hidden:\n${hiddenCategoryNames.join(
              ", "
            )}.`,
            hiddenCategoryNames,
          },
          { status: 400 }
        );
      } else {
        // hide the post
        await Post.updateOne({ _id: id }, { $set: { isDeleted } });
        return NextResponse.json(
          {
            success: true,
            message: "Unhid the post successfully",
          },
          { status: 200 }
        );
      }
    }

    await Post.updateOne({ _id: id }, { $set: { isDeleted } });
    return NextResponse.json(
      {
        success: true,
        message: "Hid the post successfully",
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
