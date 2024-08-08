import Post from "@/lib/database/models/post.model";
import Image from "next/image";
import Link from "next/link";

const RelatedPosts = async ({ category, currentPostId }) => {
  let posts = [];
  posts = await Post.find({
    _id: { $ne: currentPostId },
    category,
    isDeleted: false,
  })
    .limit(4)
    .sort({
      createdAt: -1,
    });

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
    <div className="flex flex-col gap-3 border-b border-[#191919] pb-4 sm:border-none">
      <Link href={`/posts/${post._id}`}>
        <Image
          src={post.image}
          width={500}
          height={500}
          alt="post"
          className="w-full h-[30vh] max-h-[12rem] object-cover rounded-md hover:brightness-[70%] transition-all duration-150"
        />
      </Link>
      <Link href={`/posts/${post._id}`}>
        <h2 className="text-blue-gray-50 hover:text-primary duration-200 transition-colors font-semibold text-lg sm:text-xl lg:text-2xl truncate-lines-2 line-clamp-2">
          {post.heading}
        </h2>
      </Link>
      <p className="text-blue-gray-300 truncate-lines-3 line-clamp-3">
        {post.content}
      </p>
    </div>
  );
};
