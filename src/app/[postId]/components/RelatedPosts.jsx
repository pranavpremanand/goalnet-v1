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
      categories: { $in: categoryList },
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
    <div className="flex flex-col gap-3 border-t border-secondary">
      <h2 className="text-xl md:text-2xl mt-10 font-medium">Related Stories</h2>
      <div className="w-full grid md:grid-cols-2 xl:grid-cols-3 gap-6">
        {posts.map((post, idx) => (
          <PostItem
            key={post._id}
            post={post}
            length={posts.length}
            index={idx}
          />
        ))}
      </div>
    </div>
  );
};

export default RelatedPosts;

const PostItem = ({ post, length, index }) => {
  return (
    <div
      className={`${
        length - 1 > index && "border-b border-[#252525]"
      } w-full flex flex-col gap-3 pb-4 sm:border-none`}
    >
      <Link
        href={`/${post._id}`}
        className="w-full  hover:brightness-75"
        // style={{ backgroundImage: `url(${post.image}` }}
      >
        <Image
          src={post.image}
          width={500}
          height={500}
          alt="post"
          className="w-full h-[35vh] max-h-[15rem] overflow-hidden backdrop-blur-3xl object-cover transition-all duration-150 hover:brightness-75"
        />
      </Link>
      <div className="flex max-w-xs sm:max-w-md md:max-w-xl gap-2 truncate line-clamp-1">
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
        <h2 className="text-blue-gray-50 text-wrap hover:text-primary duration-200 transition-colors font-semibold text-lg sm:text-xl lg:text-2xl truncate-lines-2 line-clamp-2">
          {post.heading}
        </h2>
      </Link>
      <p className="text-blue-gray-300 text-wrap truncate-lines-3 line-clamp-3 whitespace-pre-wrap">
        {post.content}
      </p>
    </div>
  );
};
