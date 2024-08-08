import { formatDistanceToNow } from "date-fns";
import Image from "next/image";
import Link from "next/link";
import React from "react";
import { FaRegClock } from "react-icons/fa";

const PostItem = ({ post}) => {
  return (
    <div className="hover:scale-105 duration-200 transition-all">
      <div className="w-full grid grid-cols-1 md:grid-cols-[50%_50%] lg:grid-cols-[30%_70%] gap-1 md:gap-5 border border-primary/60 rounded-xl">
        <Link href={`/admin/posts/${post._id}`}>
          <Image
            src={post.image}
            alt="post"
            width={1000}
            height={1000}
            className="h-[30vh] sm:h-[35vh] lg:h-[30vh] rounded-xl object-center object-cover hover:brightness-[70%] duration-200 transition-all"
          />
        </Link>
        <div className="flex flex-col justify-start gap-3 p-3 sm:p-5">
          <span className="bg-blue-500 text-blue-gray-50 px-2 py-[.2rem] rounded-sm text-sm w-fit">
            {post.category.name}
          </span>
          <div className="grow">
            <Link
              href={`/admin/posts/${post._id}`}
              className="text-blue-gray-50 font-semibold text-lg sm:text-xl
              line-clamp-2 truncate-lines-2"
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