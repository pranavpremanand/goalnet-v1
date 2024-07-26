import { connectDb } from "@/utils/database";
import Category from "@/utils/database/models/category.model";
import { revalidatePath } from "next/cache";
import { NextResponse } from "next/server";

// get all categories
export const GET = async () => {
  try {
    connectDb();
    const categories = await Category.find().sort({ createdAt: "desc" });
    return NextResponse.json({ success: true, categories });
  } catch (err) {
    return NextResponse.json(err);
  }
};

// create a new category
export const POST = async (req) => {
  try {
    connectDb();
    const { name } = await req.json();

    const alreadyExist = await Category.findOne({ name });
    // if (alreadyExist) {
    //   return NextResponse.json(
    //     { success: false, message: "Category already exists" },
    //     { status: 400 }
    //   );
    // } else {
      const data = await Category.create({ name });

      revalidatePath("/admin/categories");

      return NextResponse.json(
        { success: true, data, message: "Category created successfully" },
        { status: 201 }
      );
    // }
  } catch (err) {
    return NextResponse.json(err);
  }
};
