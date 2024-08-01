"use client";
import { images } from "@/constants";
import Image from "next/image";
import Link from "next/link";
import React, { useState } from "react";
import { PiCaretRightBold } from "react-icons/pi";
import { BiEdit } from "react-icons/bi";
import { RiImageEditLine } from "react-icons/ri";

const PostDetails = () => {
  const [editHeading, setEditHeading] = useState(false);
  const [editContent, setEditContent] = useState(false);
  return (
    <section className="wrapper grow text-white">
      <div className="flex items-center gap-1 mb-10">
        <Link href="/admin" className="text-md">
          Home
        </Link>
        <PiCaretRightBold className="text-sm mt-[.15rem]" />
        <Link href="/admin/posts" className="text-md">
          Posts
        </Link>
        <PiCaretRightBold className="text-sm mt-[.15rem]" />
        <Link
          href={`/admin/posts/${100}`}
          className="text-md text-primary underline"
        >
          100
        </Link>
      </div>

      <div className="pb-5 lg:w-1/2">
        <div className="flex flex-col gap-10">
          <div className="flex flex-col gap-3">
            <h2 className="text-2xl underline text-center font-semibold">
              Post Image
            </h2>
            <div
              className="w-full h-[45vh] backdrop-blur-3xl"
              style={{ backgroundImage: `url(${images[4]})` }}
            >
              <Image
                src={images[4]}
                alt="post"
                width={500}
                height={500}
                className="w-full h-full object-contain"
              />
            </div>
            <button className="bg-primary/60 p-2 flex gap-2 items-center justify-center rounded-full px-2 cursor-pointer self-end w-[12rem]">
              <p>Change image</p>
              <RiImageEditLine className="text-xl" />
              <input
                type="file"
                name="image"
                id=""
                className="p-2 cursor-pointer hidden"
              />
            </button>
          </div>
          <div className="flex flex-col gap-3">
            <h2 className="text-2xl underline text-center font-semibold">
              Heading
            </h2>
            {editHeading ? (
              <textarea
                type="text"
                className="text-black p-2 outline-none"
                rows="4"
                defaultValue="It's been 12 years since Leo Messi went off against Bayer Leverkusen ⚽⚽⚽⚽⚽ The first player in UCL history to score five goals in a single game, then Luiz Adriano and Erling Haaland followed suit ✋"
              />
            ) : (
              <h1 className="font-bold text-xl sm:text-2xl">
                {
                  "It's been 12 years since Leo Messi went off against Bayer Leverkusen ⚽⚽⚽⚽⚽ The first player in UCL history to score five goals in a single game, then Luiz Adriano and Erling Haaland followed suit ✋"
                }
              </h1>
            )}
            {editHeading ? (
              <div className="flex gap-3 self-end">
                <button
                  onClick={() => setEditHeading(false)}
                  className="bg-primary/60 p-2 flex gap-2 items-center justify-center rounded-full px-2 cursor-pointer self-end w-[12rem]"
                >
                  Cancel
                </button>
                <button
                  onClick={() => setEditHeading(false)}
                  className="bg-primary/60 p-2 flex gap-2 items-center justify-center rounded-full px-2 cursor-pointer self-end w-[12rem]"
                >
                  Save
                </button>
              </div>
            ) : (
              <button
                onClick={() => setEditHeading(true)}
                className="bg-primary/60 p-2 flex gap-2 items-center justify-center rounded-full px-2 cursor-pointer self-end w-[12rem]"
              >
                <p>Change Heading</p>
                <BiEdit className="text-xl" />
              </button>
            )}
          </div>
          <div className="flex flex-col items-center gap-3">
            <h2 className="text-2xl underline text-center font-semibold">
              Category
            </h2>
            <select name="" id="" className='bg-gray-900 p-3 font-semibold'>
              <option value="">UEFA Champions League</option>
              <option value="">UEFA Europa League</option>
              <option value="">Copa Libertadores</option>
            </select>
          </div>
          <div className="flex flex-col gap-3">
            <h2 className="text-2xl underline text-center font-semibold">
              Content
            </h2>
            {editContent ? (
              <textarea
                type="text"
                className="text-black text-md p-2 outline-none"
                rows="5"
                defaultValue="Lorem ipsum dolor sit amet consectetur adipisicing elit. Harum velit
            repudiandae repellat alias eligendi ex iste officiis, hic vitae
            molestias! Velit expedita distinctio dignissimos quos consectetur
            cupiditate quod odit beatae! Lorem ipsum dolor sit amet consectetur
            adipisicing elit. Ullam dolores, qui, obcaecati numquam blanditiis
            adipisci, delectus vel porro explicabo maxime error cupiditate
            maiores tempore odit aut. Facilis eveniet nisi obcaecati. Lorem
            ipsum dolor, sit amet consectetur adipisicing elit. Voluptates
            molestiae et, quae eum minima cum repellendus autem, voluptatem sint
            nobis similique rem, asperiores quas laboriosam commodi. Hic nisi
            debitis quis?"
              />
            ) : (
              <p className="text-blue-gray-300 text-md">
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
            )}
            {editContent ? (
              <div className="flex gap-3 self-end">
                <button
                  onClick={() => setEditContent(false)}
                  className="bg-primary/60 p-2 flex gap-2 items-center justify-center rounded-full px-2 cursor-pointer self-end w-[12rem]"
                >
                  Cancel
                </button>
                <button
                  onClick={() => setEditContent(false)}
                  className="bg-primary/60 p-2 flex gap-2 items-center justify-center rounded-full px-2 cursor-pointer self-end w-[12rem]"
                >
                  Save
                </button>
              </div>
            ) : (
              <button
                onClick={() => setEditContent(true)}
                className="bg-primary/60 p-2 flex gap-2 items-center justify-center rounded-full px-2 cursor-pointer self-end w-[12rem]"
              >
                <p>Change Content</p>
                <BiEdit className="text-xl" />
              </button>
            )}
          </div>
        </div>
      </div>
    </section>
  );
};

export default PostDetails;
