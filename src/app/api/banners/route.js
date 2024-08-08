import { connectDb } from "@/lib/database";
import Post from "@/lib/database/models/post.model";
import { NextResponse } from "next/server";

export const GET = async () => {
  try {
    connectDb();
    const banners = await Post.aggregate([
      { $match: { isBanner: true, isDeleted: false } },
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
      { $limit: 5 },
    ]).sort({
      createdAt: "desc",
    });

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
