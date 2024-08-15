import { connectDb } from "@/lib/database";
import Category from "@/lib/database/models/category.model";
import { NextResponse } from "next/server";

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