import { formatDistanceToNow } from "date-fns";
import Image from "next/image";
import Link from "next/link";
import React from "react";
import { FaEye, FaEyeSlash, FaRegClock } from "react-icons/fa";

const PostItem = ({ post, handleCategoryChange }) => {
  return (
    <div className="pb-5 border-b border-[#2e2e2e]">
      <Link href={`/admin/posts/${post._id}`} className="group">
        <div className="h-[60vh] md:h-[40vh] lg:h-[35vh] duration-200 transition-all rounded-xl border-transparent p-2 border group-hover:border-primary/60 w-full grid grid-cols-1 md:grid-cols-[45%_50%] lg:grid-cols-[30%_65%] gap-1 md:gap-5">
          <div
            style={{ backgroundImage: `url(${post.image})` }}
            className="rounded-xl overflow-hidden"
          >
            <Image
              src={post.image}
              alt="post"
              width={500}
              height={500}
              className="w-full h-full rounded-xl object-contain group-hover:brightness-75 duration-200 transition-all backdrop-blur-3xl"
            />
          </div>
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
              <h3 className="text-blue-gray-50 font-semibold text-lg sm:text-xl group-hover:text-primary duration-200 transition-colors line-clamp-2 truncate-lines-2">
                {post.heading}
              </h3>
              <p className="text-gray-300 text-md truncate-lines-3 line-clamp-3 whitespace-pre-wrap">
                {post.content}
              </p>
            </div>
            <div className="flex flex-col lg:flex-row justify-between md:pr-5 items-start lg:items-center gap-3">
              <span className="text-[#a1a1a1] flex self-end lg:self-start items-center gap-2 text-[.8rem]">
                <FaRegClock />
                {formatDistanceToNow(post.createdAt, {
                  addSuffix: true,
                })}
              </span>
              {post.isDeleted ? (
                <span className="w-[7rem] px-2 py-1 bg-red-600 text-white flex items-center gap-2 justify-center tracking-wide font-semibold transition-colors duration-300 rounded-full">
                  <FaEyeSlash className="text-xl" /> Hidden
                </span>
              ) : (
                <span className="w-[7rem] px-2 py-1 bg-green-600 text-white flex items-center gap-2 justify-center tracking-wide font-semibold transition-colors duration-300 rounded-full">
                  <FaEye className="text-xl" /> Public
                </span>
              )}
            </div>
          </div>
        </div>
      </Link>
    </div>
  );
};

export default PostItem;
