import { connectDb } from "@/lib/database";
import Category from "@/lib/database/models/category.model";
import Post from "@/lib/database/models/post.model";
import mongoose from "mongoose";
import { NextResponse } from "next/server";

// get posts and banners
export const POST = async (req) => {
  try {
    connectDb();
    const postLimit = 10;
    const body = await req.json();
    const { page, category } = body;
    const ObjectId = mongoose.Types.ObjectId;
    let posts;
    if (category !== "0") {
      posts = await Post.aggregate([
        { $match: { isDeleted: false, category: new ObjectId(category) } },
        {
          $lookup: {
            from: "categories",
            localField: "category",
            foreignField: "_id",
            as: "categoryDetails",
          },
        },
        { $unwind: "$categoryDetails" },
        {
          $project: {
            _id: { $toString: "$_id" },
            heading: 1,
            content: 1,
            image: 1,
            isBanner: 1,
            createdAt: {
              $dateToString: {
                format: "%Y-%m-%dT%H:%M:%S.%LZ",
                date: "$createdAt",
              },
            },
            updatedAt: {
              $dateToString: {
                format: "%Y-%m-%dT%H:%M:%S.%LZ",
                date: "$updatedAt",
              },
            },
            category: {
              _id: { $toString: "$categoryDetails._id" },
              name: "$categoryDetails.name",
            },
          },
        },
        { $limit: postLimit },
      ])
        .sort({ createdAt: -1 })
        .skip((page - 1) * postLimit);
    } else {
      posts = await Post.aggregate([
        { $match: { isDeleted: false } },
        {
          $lookup: {
            from: "categories",
            localField: "category",
            foreignField: "_id",
            as: "categoryDetails",
          },
        },
        { $unwind: "$categoryDetails" },
        {
          $project: {
            _id: { $toString: "$_id" },
            heading: 1,
            content: 1,
            image: 1,
            isBanner: 1,
            createdAt: {
              $dateToString: {
                format: "%Y-%m-%dT%H:%M:%S.%LZ",
                date: "$createdAt",
              },
            },
            updatedAt: {
              $dateToString: {
                format: "%Y-%m-%dT%H:%M:%S.%LZ",
                date: "$updatedAt",
              },
            },
            category: {
              _id: { $toString: "$categoryDetails._id" },
              name: "$categoryDetails.name",
            },
          },
        },
        { $limit: postLimit },
      ])
        .sort({ createdAt: -1 })
        .skip((page - 1) * postLimit);
    }

    const categories = await Category.find({ isDeleted: false }).sort({
      createdAt: "desc",
    });

    const totalItems = await Post.countDocuments(); // Get total count of items
    const totalPages = Math.ceil(totalItems / postLimit);

    return NextResponse.json(
      {
        success: true,
        data: {
          posts,
          categories,
          totalItems,
          totalPages,
          page,
          limit: postLimit,
        },
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
