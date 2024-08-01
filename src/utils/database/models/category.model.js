import { Schema, models, model } from "mongoose";

const categorySchema = new Schema(
  {
    name: {
      type: String,
      required: true,
    },
    isDeleted:{
      type: Boolean,
      default: false,
    }
  },
  { timestamps: true }
);

const Category = models?.Category || model("Category", categorySchema);

export default Category;
