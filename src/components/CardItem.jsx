"use client";
import { formatDistanceToNow } from "date-fns";
import Image from "next/image";
import Link from "next/link";
import { FaRegClock } from "react-icons/fa";

const CardItem = ({ post, handleCategoryChange }) => {
  return (
    <div
      className={`grid grid-cols-1 md:grid-cols-[47%,50%] lg:grid-cols-[40%,45%] gap-5 border-b border-[#191919] pb-5 group`}
    >
      <Link
        href={`/${post._id}`}
        className="w-full h-[40vh] sm:h-[48vh] md:h-[40vh] lg:h-[45vh] group-hover:brightness-75"
        style={{ backgroundImage: `url(${post.image}` }}
      >
        <Image
          src={post.image}
          alt="Post"
          width={1000}
          height={1000}
          className="w-full h-full object-center object-contain duration-200 transition-all backdrop-blur-xl"
        />
      </Link>
      <div className="flex flex-col justify-between gap-3 h-full">
        <div className="flex flex-col gap-3">
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
          <Link href={`/${post._id}`}>
            <h1 className="text-blue-gray-50 group-hover:text-primary duration-200 transition-colors font-semibold text-lg sm:text-xl lg:text-2xl truncate-lines-2 line-clamp-2">
              {post.heading}
            </h1>
          </Link>
          <p className="text-blue-gray-300 truncate-lines-3 line-clamp-3">
            {post.content}
          </p>
          <Link href={`/${post._id}`} className="primary-btn w-fit">
            Read more
          </Link>
        </div>
        <span className="text-blue-gray-50 flex items-center gap-2 text-sm">
          <FaRegClock />
          {formatDistanceToNow(post.createdAt, {
            addSuffix: true,
          })}
        </span>
      </div>
    </div>
  );
};

export default CardItem;
