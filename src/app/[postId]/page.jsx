import RelatedPosts from "@/app/[postId]/components/RelatedPosts";
import ShareComponent from "@/app/[postId]/components/ShareComponent";
import { connectDb } from "@/lib/database";
import Post from "@/lib/database/models/post.model";
import { formatDate } from "date-fns";
import Image from "next/image";
import { BiCaretLeft } from "react-icons/bi";
import { FaRegClock } from "react-icons/fa";
import Category from "@/lib/database/models/category.model";
import NotFound from "../not-found";
import BackButton from "@/components/BackButton";

export const generateMetadata = async ({ params }) => {
  const { postId } = params;
  try {
    connectDb();
    const post = await Post.findOne({ _id: postId, isDeleted: false });
    return {
      title: post.heading,
      openGraph: {
        images: [post.image],
      },
    };
  } catch (error) {}
};

const PostInDetail = async ({ params }) => {
  const { postId } = params;
  let post;

  try {
    connectDb();
    post = await Post.findOne({ _id: postId, isDeleted: false }).populate({
      path: "categories",
      select: "name _id",
    });
  } catch (error) {
    return <NotFound />;
  }

  return (
    <section className="wrapper grow text-blue-gray-50">
      <div className="flex justify-start items-center gap-1 mb-5 py-2 sm:py-3 border-y border-[#252525]">
        <BackButton />
      </div>
      <div className="pb-12">
        <div className="flex flex-col gap-3 pb-7 border-b border-[#191919]">
          <div
            className="w-full h-[45vh] sm:h-[65vh] md:h-[73vh] mt-2 relative"
            style={{
              backgroundImage: `url(${
                post.image || "/assets/images/logo.png"
              })`,
            }}
          >
            <div className="absolute top-0 left-0 w-full h-full bg-gradient-to-b from-transparent to-black/20 z-10"></div>
            <Image  
              src={post.image || "/assets/images/logo.png"}
              alt="post"
              width={1000}
              height={1000}
              className="w-full h-full object-cover object-top md:object-center md:object-contain backdrop-blur-3xl"
            />
            <div className="inline sm:hidden absolute z-20 right-1 bottom-1">
              <ShareComponent
                content={{
                  title: "Check this story!",
                  text: `${post.heading}:`,
                  url: `https://goalnetonline.vercel.app/${post._id}`,
                }}
              />
            </div>
          </div>
          <div className="flex flex-col gap-4 md:gap-5">
            <div className="flex flex-wrap max-w-md lg:max-w-lg gap-2">
              {post.categories.length > 0 &&
                post.categories.map((category) => (
                  <span
                    key={category._id}
                    className="bg-blue-500 text-blue-gray-50 px-2 py-[.2rem] rounded-sm text-[.8rem] sm:text-sm w-fit"
                  >
                    {category.name}
                  </span>
                ))}
            </div>
            <h1 className="font-bold text-2xl sm:text-3xl lg:text-5xl my-3 leading-relaxed">
              {post.heading}
            </h1>
          </div>
          <div className="flex flex-row justify-end sm:justify-between items-center gap-4 sm:my-1 pb-2 sm:py-2 border-b sm:border-y border-[#252525]">
            <span className="flex items-center gap-2 text-[.8rem] md:text-sm text-[#a1a1a1]">
              <FaRegClock />
              {formatDate(post.createdAt, "dd MMMM yyyy")}
            </span>
            <div className="hidden sm:inline-block">
              <ShareComponent
                content={{
                  title: "Check this out!",
                  text: `${post.heading}:`,
                  url: `https://goalnetonline.vercel.app/${post._id}`,
                }}
              />
            </div>
          </div>
          <p className="text-blue-gray-100 whitespace-pre-wrap mt-4">
            {post.content}
          </p>
        </div>

        <RelatedPosts categories={post.categories} currentPostId={post._id} />
      </div>
    </section>
  );
};

export default PostInDetail;
