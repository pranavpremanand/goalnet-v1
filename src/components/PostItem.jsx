import Image from "next/image";
import Link from "next/link";
import React from "react";
import { FaRegClock } from "react-icons/fa";

const PostItem = () => {
  return (
    <Link
      href="/admin/posts/1"
      className="hover:scale-105 duration-200 transition-all"
    >
      <div className="w-full grid grid-cols-1 md:grid-cols-[50%_50%] lg:grid-cols-[30%_70%] gap-1 md:gap-5 border border-primary/60 rounded-xl">
        <Image
          src={'/assets/images/messi (2).jpg'}
          alt="post"
          width={1000}
          height={1000}
          className="h-[30vh] sm:h-[35vh] lg:h-[30vh] rounded-xl object-center object-cover hover:brightness-[70%] duration-200 transition-all"
        />
        <div className="flex flex-col justify-start gap-3 p-3 sm:p-5">
          <div className="grow">
            <h1
              className="text-white font-semibold text-lg sm:text-xl line-clamp-2 truncate-lines-2"
            >
              {
                "It's been 12 years since Leo Messi went off against Bayer Leverkusen ⚽⚽⚽⚽⚽ The first player in UCL history to score five goals in a single game, then Luiz Adriano and Erling Haaland followed suit ✋"
              }
            </h1>
            <p className="text-blue-gray-300 text-md truncate-lines-3 line-clamp-3">
              Lorem ipsum dolor sit amet consectetur adipisicing elit. Harum
              velit repudiandae repellat alias eligendi ex iste officiis, hic
              vitae molestias! Velit expedita distinctio dignissimos quos
              consectetur cupiditate quod odit beatae! Lorem ipsum dolor sit
              amet consectetur adipisicing elit. Ullam dolores, qui, obcaecati
              numquam blanditiis adipisci, delectus vel porro explicabo maxime
              error cupiditate maiores tempore odit aut. Facilis eveniet nisi
              obcaecati. Lorem ipsum dolor, sit amet consectetur adipisicing
              elit. Voluptates molestiae et, quae eum minima cum repellendus
              autem, voluptatem sint nobis similique rem, asperiores quas
              laboriosam commodi. Hic nisi debitis quis?
            </p>
          </div>
          <div className="flex flex-col lg:flex-row justify-between md:pr-5 items-start lg:items-center gap-3">
            <span className="text-white flex self-end lg:self-start items-center gap-2 text-sm">
              <FaRegClock /> Just now
            </span>
            <div className="flex gap-2">
              {/* <button className="w-[6rem] px-2 py-1 bg-black text-primary hover:bg-primary hover:text-black tracking-wide font-semibold transition-colors duration-300 rounded-full">
                Edit
              </button> */}
              <button className="w-[6rem] px-2 py-1 bg-black text-red-600 hover:bg-red-600 hover:text-black tracking-wide font-semibold transition-colors duration-300 rounded-full">
                Delete
              </button>
            </div>
          </div>
        </div>
      </div>
    </Link>
  );
};

export default PostItem;
