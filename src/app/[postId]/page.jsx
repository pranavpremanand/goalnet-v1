import RelatedPosts from "@/app/[postId]/components/RelatedPosts";
import ShareComponent from "@/app/[postId]/components/ShareComponent";
import { connectDb } from "@/lib/database";
import Post from "@/lib/database/models/post.model";
import { formatDate } from "date-fns";
import mongoose from "mongoose";
import Image from "next/image";
import Link from "next/link";
import { BiCaretLeft } from "react-icons/bi";
import { FaRegClock } from "react-icons/fa";

const PostInDetail = async ({ params }) => {
  const { postId } = params;

  connectDb();
  // const post = await Post.findOne({ _id: postId, isDeleted: false }).populate({
  //   path: "categories",
  //   select: "name _id",
  // });
  const posts = await Post.aggregate([
    {
      $match: {
        _id: new mongoose.Types.ObjectId(postId),
        isDeleted: false,
      },
    },
    {
      $lookup: {
        from: "categories",
        localField: "categories",
        foreignField: "_id",
        as: "categoryDetails",
      },
    },
    {
      $unwind: {
        path: "$categoryDetails",
        preserveNullAndEmptyArrays: true,
      },
    },
    {
      $project: {
        _id: 1,
        heading: 1,
        content: 1,
        image: 1,
        isBanner: 1,
        createdAt: {
          $dateToString: {
            format: "%Y-%m-%dT%H:%M:%S.%LZ",
            date: "$createdAt",
            onNull: "N/A", // Handle null values if necessary
          },
        },
        updatedAt: {
          $dateToString: {
            format: "%Y-%m-%dT%H:%M:%S.%LZ",
            date: "$updatedAt",
            onNull: "N/A", // Handle null values if necessary
          },
        },
        categories: {
          _id: { $toString: "$categoryDetails._id" },
          name: "$categoryDetails.name",
        },
      },
    },
  ]);

  const post = posts[0];
  return (
    <section className="wrapper grow text-blue-gray-50">
      <div className="flex items-center gap-1 mb-5">
        <Link href="/" className="text-md flex items-center font-medium">
          <BiCaretLeft className="text-2xl" /> Back
        </Link>
      </div>

      <div className="pb-16">
        <div className="flex flex-col gap-8 pb-7">
          <div
            className="w-full h-[35vh] sm:h-[55vh] md:h-[71vh]"
            style={{ backgroundImage: `url(${post.image}` }}
          >
            <Image
              src={post.image}
              alt="post"
              width={1000}
              height={1000}
              className="w-full h-[35vh] sm:h-[55vh] md:h-[71vh] object-contain backdrop-blur-3xl"
            />
          </div>
          <div className="flex flex-col gap-4 md:gap-8">
            <div className="flex flex-wrap max-w-md gap-2">
              {post.categories.map((category) => (
                <span
                  key={category._id}
                  className="bg-blue-500 text-blue-gray-50 px-2 py-[.2rem] rounded-sm text-[.8rem] sm:text-sm w-fit"
                >
                  {category.name}
                </span>
              ))}
            </div>
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
        <RelatedPosts categories={post.categories} currentPostId={post._id} />
      </div>
    </section>
  );
};

export default PostInDetail;
