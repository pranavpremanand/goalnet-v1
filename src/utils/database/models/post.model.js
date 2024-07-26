import { Schema, models, model, SchemaTypes } from "mongoose";

const postSchema = new Schema(
  {
    title: {
      type: String,
      required: true,
    },
    content: {
      type: String,
      required: true,
    },
    category: {
      type: SchemaTypes.ObjectId,
      ref: "categories",
      required: true,
    },
    image: {
      type: String,
      required: true,
    },
    isBanner: {
      type: Boolean,
      default: false,
    },
    otherLinks: {
      type: String,
    },
  },
  { timestamps: true }
);

const Post = models?.posts || model("posts", postSchema);

export default Post;
