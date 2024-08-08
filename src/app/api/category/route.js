import { connectDb } from "@/lib/database";
import Category from "@/lib/database/models/category.model";
import Post from "@/lib/database/models/post.model";
import { NextResponse } from "next/server";

// get all categories
export const GET = async () => {
  try {
    connectDb();
    const categories = await Category.find({ isDeleted: false }).sort({
      createdAt: "desc",
    });
    return NextResponse.json({ success: true, categories });
  } catch (err) {
    return NextResponse.json(
      { success: false, message: err.message },
      { status: 500 }
    );
  }
};

// create a new category
export const POST = async (req) => {
  try {
    connectDb();
    const { name } = await req.json();

    const alreadyExist = await Category.findOne({ name, isDeleted: false });
    if (alreadyExist) {
      return NextResponse.json(
        { success: false, message: "Category already exists" },
        { status: 400 }
      );
    } else {
      const data = await Category.create({ name });

      return NextResponse.json(
        { success: true, data, message: "Category created successfully" },
        { status: 201 }
      );
    }
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
    if (alreadyExist) {
      return NextResponse.json(
        { success: false, message: "Category already exists" },
        { status: 400 }
      );
    } else {
      const data = await Category.findByIdAndUpdate(id, { name });

      return NextResponse.json(
        { success: true, data, message: "Category updated successfully" },
        { status: 201 }
      );
    }
  } catch (err) {
    return NextResponse.json(
      { success: false, message: err.message },
      { status: 500 }
    );
  }
};
