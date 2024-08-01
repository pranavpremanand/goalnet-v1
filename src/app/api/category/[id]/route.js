import { connectDb } from "@/utils/database";
import Category from "@/utils/database/models/category.model";
import Post from "@/utils/database/models/post.model";
import { NextResponse } from "next/server";

// export const GET = async (req, { params }) => {
//   connectDb();

//   const { page } = params;

//   const limit = 10;

//   try {
//     const categories = await Category.find()
//       .skip((page - 1) * limit) // Skip items for previous pages
//       .limit(limit)   // Limit the number of items per page
//       .sort({ createdAt: "desc" });

//     const totalItems = await Category.countDocuments(); // Get total count of items
//     const totalPages = Math.ceil(totalItems / limit);

//     return NextResponse.json({
//       success: true,
//       message: "Categories fetched successfully",
//       categories,
//       pagination: {
//         page: parseInt(page),
//         limit,
//         totalItems,
//         totalPages,
//       },
//     });
//   } catch (err) {
//     return NextResponse.json({ success: false, message: err.message }, { status: 500 });
//   }
// };

// delete a category
export const POST = async (req, { params }) => {
  try {
    connectDb();
    const { id } = params;

    const postsExist = await Post.findOne({ category: id, isDeleted: false });
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
