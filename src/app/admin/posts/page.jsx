import PostItem from "@/components/PostItem";
import { images } from "@/constants";
import Link from "next/link";
import React from "react";
import { PiCaretRightBold } from "react-icons/pi";

const page = () => {
  return (
    <section className="grow">
      <div className="wrapper">
        <div className="flex items-center gap-1 mb-10">
          <Link href="/admin" className="text-md text-white">
            Home
          </Link>
          <PiCaretRightBold className="text-sm mt-[.15rem]" />
          <Link href="/admin/posts" className="text-md text-primary underline">
            Posts
          </Link>
        </div>

        <div className="w-fit">
            <Link href='/admin/posts/new-post' className='primary-btn'>Upload a post</Link>
        </div>

        <h1 className="text-2xl font-bold tracking-wider text-center mb-5">
          Posts
        </h1>

        <div className="grid grid-cols-1 gap-5 pb-5">
          {images.map((url) => (
            <PostItem url={url} key={url} />
          ))}
        </div>
      </div>
    </section>
  );
};

export default page;
