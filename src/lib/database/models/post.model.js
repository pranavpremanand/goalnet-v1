import { Schema, models, model } from "mongoose";

const postSchema = new Schema(
  {
    heading: {
      type: String,
      required: true,
    },
    content: {
      type: String,
      required: true,
    },
    categories: [
      {
        type: Schema.Types.ObjectId,
        ref: "Category",
      },
    ],
    image: {
      type: String,
      required: true,
    },
    isBanner: {
      type: Boolean,
      default: false,
    },
    otherLinks: {
      type: Array,
    },
    isDeleted: {
      type: Boolean,
      default: false,
    },
  },
  { timestamps: true }
);

const Post = models?.Post || model("Post", postSchema);

export default Post;
