import { connectDb } from "@/lib/database";
import Category from "@/lib/database/models/category.model";
import Post from "@/lib/database/models/post.model";
import { NextResponse } from "next/server";

// delete a category
export const POST = async (req, { params }) => {
  try {
    connectDb();
    const { id } = params;
    let updatedData = {};

    const categoryData = await Category.findById(id);

    if (categoryData.isDeleted) {
      // unhide category
      await Category.findByIdAndUpdate(id, { isDeleted: false });
      updatedData = {
        ...categoryData._doc,
        isDeleted: false,
      };

      return NextResponse.json(
        {
          success: true,
          data: updatedData,
          message: "Category unhid successfully",
          hidePostsConfirmation: false,
        },
        { status: 200 }
      );
    } else {
      // check if category has posts
      const postsExist = await Post.findOne({
        categories: id,
        isDeleted: false,
      });
      if (postsExist) {
        return NextResponse.json(
          {
            success: false,
            message:
              "Category cannot be hidden.\nPosts exist with this category",
            hidePostsConfirmation: true,
          },
          { status: 400 }
        );
      }

      // hide category with no posts
      const data = await Category.findByIdAndUpdate(id, { isDeleted: true });
      updatedData = {
        ...data._doc,
        isDeleted: true,
      };
      return NextResponse.json(
        {
          success: true,
          data: updatedData,
          message: "Category hid successfully",
          hidePostsConfirmation: false,
        },
        { status: 200 }
      );
    }
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

    await Post.updateMany(
      { categories: { $in: id } },
      { $set: { isDeleted: true } }
    );
    await Category.updateOne({ _id: id }, { $set: { isDeleted: true } });
    return NextResponse.json(
      {
        success: true,
        message: "Category and it's associated posts hid successfully",
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
