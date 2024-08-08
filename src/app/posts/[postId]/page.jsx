import RelatedPosts from "@/components/RelatedPosts";
import ShareComponent from "@/components/ShareComponent";
import Post from "@/lib/database/models/post.model";
import { formatDate } from "date-fns";
import Image from "next/image";
import Link from "next/link";
import { FaRegClock } from "react-icons/fa";
import { PiCaretRightBold } from "react-icons/pi";

const PostInDetail = async ({ params }) => {
  const { postId } = params;
  let post
  try{
    post = await Post.findOne({ _id: postId, isDeleted: false }).populate(
      "category"
    );
  }catch(err){
    console.error("Failed to fetch post:", err);
    return <div className="">error loading the page</div>
  }

  if(!post) return null

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
              className="w-full h-[35vh] sm:h-[55vh] md:h-[65vh] md:object-contain object-cover backdrop-blur-3xl"
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
        <RelatedPosts category={post.category} currentPostId={post._id} />
      </div>
    </section>
  );
};

export default PostInDetail;
