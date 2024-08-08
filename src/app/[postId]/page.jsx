import RelatedPosts from "@/app/[postId]/components/RelatedPosts";
import ShareComponent from "@/app/[postId]/components/ShareComponent";
import { connectDb } from "@/lib/database";
import Post from "@/lib/database/models/post.model";
import { formatDate } from "date-fns";
import mongoose from "mongoose";
import Image from "next/image";
import Link from "next/link";
import { FaRegClock } from "react-icons/fa";
import { PiCaretRightBold } from "react-icons/pi";

const PostInDetail = async ({ params }) => {
  const { postId } = params;
  
  let post;
  connectDb();
  const posts = await Post.aggregate([
    { $match: { _id: new mongoose.Types.ObjectId(postId), isDeleted: false } },
    {
      $lookup: {
        from: "categories", // The collection name for categories
        localField: "category", // The field in the post document
        foreignField: "_id", // The field in the category document
        as: "category" // The name of the new field to add
      }
    },
    { $unwind: "$category" } // Deconstruct the array (if multiple categories)
  ]).exec()

  if (posts.length===0) return null;

  post = posts[0];

  return (
    <section className="wrapper grow text-blue-gray-50">
      <div className="flex items-center gap-1 mb-10">
        <Link href="/" className="text-md">
          Home
        </Link>
        <PiCaretRightBold className="text-sm mt-[.15rem]" />
        <span className="text-md text-primary underline">
          {post.category.name}
        </span>
      </div>

      <div className="pb-16">
        <div className="flex flex-col gap-8 pb-7">
          <div
            className="w-full h-[35vh] sm:h-[55vh] md:h-[65vh]"
            style={{ backgroundImage: `url(${post.image}` }}
          >
            <Image
              src={post.image}
              alt="post"
              width={500}
              height={500}
              className="w-full h-[35vh] sm:h-[55vh] md:h-[65vh] object-contain backdrop-blur-3xl"
            />
          </div>
          <div className="flex flex-col gap-4 md:gap-8">
            <span className="bg-blue-500 text-blue-gray-50 px-2 py-[.2rem] rounded-sm w-fit text-sm">
              {post.category.name}
            </span>
            <h1 className="font-bold text-2xl sm:text-3xl lg:text-4xl">
              {post.heading}
            </h1>
            <div className="flex flex-col-reverse md:flex-row justify-between md:items-center gap-2 md:gap-4 md:mt-2">
              <ShareComponent
                content={{
                  title: "Check this out!",
                  text: `${post.heading}:`,
                  url: `https://goalnetonline.vercel.app/${post._id}`,
                }}
              />
              <span className="flex items-center gap-2 text-sm text-[#a1a1a1]">
                <FaRegClock />
                {formatDate(post.createdAt, "dd MMMM yyyy")}
              </span>
            </div>
          </div>
          <p className="text-blue-gray-200 text-lg">{post.content}</p>
        </div>
        <RelatedPosts category={post.category._id} currentPostId={post._id} />
      </div>
    </section>
  );
};

export default PostInDetail;
