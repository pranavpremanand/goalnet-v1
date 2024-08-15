import { connectDb } from "@/lib/database";
import Post from "@/lib/database/models/post.model";
import Image from "next/image";
import Link from "next/link";

const RelatedPosts = async ({ categories, currentPostId }) => {
  let posts = [];
  const categoryList = categories.map((category) => category._id);
  try {
    connectDb();
    posts = await Post.find({
      _id: { $ne: currentPostId },
      categories: categoryList,
      isDeleted: false,
    })
      .populate({ path: "categories", select: "name _id" })
      .limit(4)
      .sort({
        createdAt: -1,
      });
  } catch (err) {
    return null;
  }

  if (posts.length === 0) return null;

  return (
    <div className="flex flex-col gap-3 border-t border-[#191919]">
      <h2 className="text-2xl mt-10 font-medium">Related Posts</h2>
      <div className="w-full grid sm:grid-cols-2 md:grid-cols-3 xl:grid-cols-4 gap-6">
        {posts.map((post) => (
          <PostItem key={post._id} post={post} />
        ))}
      </div>
    </div>
  );
};

export default RelatedPosts;

const PostItem = ({ post }) => {
  return (
    <div className="flex flex-col gap-3 border-b border-[#191919] pb-4 sm:border-none group">
      <Link
        href={`/${post._id}`}
        className="w-full h-[35vh] max-h-[15rem] group-hover:brightness-75"
        style={{ backgroundImage: `url(${post.image}` }}
      >
        <Image
          src={post.image}
          width={500}
          height={500}
          alt="post"
          className="w-full h-full overflow-hidden backdrop-blur-3xl object-contain transition-all duration-150 group-hover:brightness-75"
        />
      </Link>
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
      <Link href={`/${post._id}`}>
        <h2 className="text-blue-gray-50 group-hover:text-primary duration-200 transition-colors font-semibold text-lg sm:text-xl lg:text-2xl truncate-lines-2 line-clamp-2">
          {post.heading}
        </h2>
      </Link>
      <p className="text-blue-gray-300 truncate-lines-3 line-clamp-3">
        {post.content}
      </p>
    </div>
  );
};
