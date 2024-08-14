import { connectDb } from "@/lib/database";
import Category from "@/lib/database/models/category.model";
import Post from "@/lib/database/models/post.model";
import mongoose from "mongoose";
import { NextResponse } from "next/server";

// get posts and banners
export const POST = async (req) => {
  try {
    connectDb();
    const body = await req.json();
    const { page, category } = body;
    let posts, totalItems,postLimit = 10;
    if (category !== "0") {
      posts = await Post.find({ isDeleted: false, categories: category })
        .populate({
          path: "categories",
          select: "name _id",
        })
        .sort({ createdAt: -1 })
        .skip((page - 1) * postLimit)
        .limit(postLimit);
        totalItems = await Post.countDocuments({ isDeleted: false, categories: category });
    } else {
      posts = await Post.find({ isDeleted: false })
        .populate({
          path: "categories",
          select: "name _id",
        })
        .sort({ createdAt: -1 })
        .skip((page - 1) * postLimit)
        .limit(postLimit);
        totalItems = await Post.countDocuments({ isDeleted: false});
    }

    const categories = await Category.find({ isDeleted: false }).sort({
      createdAt: -1,
    });

    const totalPages = Math.ceil(totalItems / postLimit);

    const data = {
      posts,
      categories,
      totalItems,
      totalPages,
      page,
      limit: postLimit,
    };

    return NextResponse.json(
      {
        success: true,
        data,
        message: "Data fetched successfully",
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
