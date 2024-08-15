import { connectDb } from "@/lib/database";
import Category from "@/lib/database/models/category.model";
import Post from "@/lib/database/models/post.model";
import { NextResponse } from "next/server";

// get all categories
export const POST = async (req) => {
  try {
    connectDb();
    const { includeDeleted } = await req.json();
    const data = await Category.find(
      includeDeleted ? {} : { isDeleted: false }
    ).sort({
      createdAt: -1,
    });
    return NextResponse.json(
      {
        success: true,
        message: "Categories fetched successfully",
        categories: data,
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

// update a category
export const PATCH = async (req) => {
  try {
    connectDb();
    const { id, name } = await req.json();

    const alreadyExist = await Category.findOne({ name, isDeleted: false });
    if (!alreadyExist) {
      const data = await Category.findByIdAndUpdate(id, { name });
      const newData = {
        ...data._doc,
        name,
      };
      return NextResponse.json(
        {
          success: true,
          data: newData,
          message: "Category updated successfully",
        },
        { status: 201 }
      );
    } else {
      if (alreadyExist._id == id) {
        return NextResponse.json(
          { success: false, message: "Try a new name" },
          { status: 400 }
        );
      } else if (alreadyExist._id != id) {
        return NextResponse.json(
          { success: false, message: "Category already exists" },
          { status: 400 }
        );
      }
    }
  } catch (err) {
    return NextResponse.json(
      { success: false, message: err.message },
      { status: 500 }
    );
  }
};
