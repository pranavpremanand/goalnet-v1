import { formatDistanceToNow } from "date-fns";
import Image from "next/image";
import Link from "next/link";
import React from "react";
import { FaRegClock } from "react-icons/fa";

const PostItem = ({ post, handleCategoryChange }) => {
  return (
    <div className="hover:scale-[101%] duration-200 transition-all p-2 border rounded-xl border-primary/60 group">
      <div className="h-[60vh] md:h-[40vh] lg:h-[35vh] w-full grid grid-cols-1 md:grid-cols-[45%_50%] lg:grid-cols-[30%_65%] gap-1 md:gap-5">
        <Link
          href={`/admin/posts/${post._id}`}
          style={{ backgroundImage: `url(${post.image})` }}
          className="rounded-xl overflow-hidden"
        >
          <Image
            src={post.image}
            alt="post"
            width={500}
            height={500}
            className="w-full h-full rounded-xl object-contain group-hover:brightness-75 duration-200 transition-all backdrop-blur-xl"
          />
        </Link>
        <div className="flex flex-col justify-start gap-3">
          <div className="flex max-w-lg gap-2 truncate line-clamp-1">
            {post.categories.map((category) => (
              <button
                key={category._id}
                onClick={() => handleCategoryChange(category._id)}
                className="bg-blue-500 text-blue-gray-50 px-2 py-[.2rem] rounded-sm text-[.8rem] sm:text-sm w-fit"
              >
                {category.name}
              </button>
            ))}
          </div>
          <div className="grow flex flex-col gap-3">
            <Link
              href={`/admin/posts/${post._id}`}
              className="text-blue-gray-50 font-semibold text-lg sm:text-xl group-hover:text-primary duration-200 transition-colors line-clamp-2 truncate-lines-2"
            >
              {post.heading}
            </Link>
            <p className="text-gray-300 text-md truncate-lines-3 line-clamp-3">
              {post.content}
            </p>
          </div>
          <div className="flex flex-col lg:flex-row justify-between md:pr-5 items-start lg:items-center gap-3">
            <span className="text-blue-gray-50 flex self-end lg:self-start items-center gap-2 text-sm">
              <FaRegClock />
              {formatDistanceToNow(post.createdAt, {
                addSuffix: true,
              })}
            </span>
            {/* <div className="flex gap-2"> */}
            {/* <button className="w-[6rem] px-2 py-1 bg-black text-primary hover:bg-primary hover:text-black tracking-wide font-semibold transition-colors duration-300 rounded-full">
                Edit
              </button> */}
            {/* <button
              onClick={() => setShowDeleteAlert(true)}
              className="w-[6rem] px-2 py-1 bg-black text-red-600 hover:bg-red-600 hover:text-black tracking-wide font-semibold transition-colors duration-300 rounded-full"
            >
              Delete
            </button> */}
            {/* </div> */}
          </div>
        </div>
      </div>
    </div>
  );
};

export default PostItem;
