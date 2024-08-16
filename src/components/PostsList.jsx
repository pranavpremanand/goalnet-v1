"use client";
import React, { useState } from "react";
import { GrFormNext, GrFormPrevious } from "react-icons/gr";
import { getAllPosts } from "@/apiCalls";
import HomeCardItemsLoader from "./HomeCardItemsLoader";
import { useQuery } from "@tanstack/react-query";
import { formatDistanceToNow } from "date-fns";
import Link from "next/link";
import Image from "next/image";
import { FaRegClock } from "react-icons/fa";

const PostsList = () => {
  const [page, setPage] = useState(1);
  const [category, setCategory] = useState({ name: "Latest Stories", _id: "0" });

  // get initial posts
  const { data, error, refetch } = useQuery({
    queryKey: ["all-posts", category._id, page],
    queryFn: async () => {
      const response = await getAllPosts({
        page,
        category: category._id,
        isAdmin: false,
      });
      return response.json();
    },
    revalidateOnFocus: true,
  });

  if (error) return null;

  if (!data) {
    return <HomeCardItemsLoader category={category} />;
  }

  let { posts, categories, totalPages } = data.data;

  const handleCategoryChange = (val) => {
    let selectedCategory = categories.find((category) => category._id === val);

    if (!selectedCategory) {
      selectedCategory = { name: "Latest Stories", _id: "0" };
    }
    setCategory(selectedCategory); // Update state with new category
    setPage(1);
    refetch();
  };
  return (
    <section id="posts" className="wrapper mt-8">
      <div className="flex items-center justify-between border-b border-[#2e2e2e] mb-5 gap-4">
        {categories.length > 0 && (
          <select
            onChange={(e) => handleCategoryChange(e.target.value)}
            value={category._id}
            className="text-blue-gray-50 bg-[#191919] px-3 py-1 mb-2 text-xl w-full md:w-[16rem] text-ellipsis outline-none"
          >
            <option
              value="0"
              className="font-jost text-blue-gray-50 bg-[#191919] w-[16rem] text-ellipsis"
            >
              Latest Stories
            </option>
            {categories.map((category) => (
              <option
                key={category._id}
                value={category._id}
                className="font-jost text-blue-gray-50 bg-[#191919] w-[16rem] text-ellipsis"
              >
                {category.name}
              </option>
            ))}
          </select>
        )}
        <div className="hidden md:flex gap-2 -mt-2">
          <button
            disabled={page === 1}
            className={`${
              page === 1
                ? "text-gray-500 border-gray-500"
                : "text-primary border-primary hover:border-gray-500 hover:text-gray-500"
            }  transition duration-200 text-3xl border`}
            onClick={() => setPage((prev) => (page > 1 ? prev - 1 : prev))}
          >
            <GrFormPrevious />
          </button>
          <button
            disabled={page >= totalPages}
            className={`${
              page >= totalPages
                ? "text-gray-500 border-gray-500"
                : "text-primary border-primary hover:border-gray-500 hover:text-gray-500"
            }  transition duration-200 text-3xl border`}
            onClick={() =>
              setPage((prev) => (page < totalPages ? prev + 1 : prev))
            }
          >
            <GrFormNext />
          </button>
        </div>
      </div>
      <div className="grid grid-cols-1 gap-10 w-full pt-5">
        {posts.length > 0 ? (
          posts.map((post) => (
            <CardItem
              post={post}
              key={post._id}
              handleCategoryChange={handleCategoryChange}
            />
          ))
        ) : (
          <h2 className="text-center text-2xl">No posts found</h2>
        )}
        <div className="flex justify-between mb-5 -mt-4 gap-4">
          <button
            disabled={page === 1}
            className={`${
              page === 1 ? "disabled-btn" : "secondary-btn"
            } min-w-[7rem] sm:min-w-[10rem]`}
            onClick={() => setPage((prev) => (page > 1 ? prev - 1 : prev))}
          >
            Previous
          </button>
          <button
            disabled={page >= totalPages}
            className={`${
              page >= totalPages ? "disabled-btn" : "secondary-btn"
            } min-w-[7rem] sm:min-w-[10rem]`}
            onClick={() =>
              setPage((prev) => (prev < totalPages ? prev + 1 : prev))
            }
          >
            Next
          </button>
        </div>
      </div>
    </section>
  );
};

export default PostsList;


// post item
const CardItem = ({ post, handleCategoryChange }) => {
  return (
    <div
      className={`grid grid-cols-1 md:grid-cols-[47%,50%] lg:grid-cols-[40%,45%] gap-5 border-b border-[#2e2e2e] pb-5`}
    >
      <Link
        href={`/${post._id}`}
        className="w-full h-[38vh] sm:h-[48vh] md:h-[40vh] lg:h-[45vh] hover:brightness-75"
        style={{ backgroundImage: `url(${post.image}` }}
      >
        <Image
          src={post.image}
          alt="Post"
          width={1000}
          height={1000}
          className="w-full h-full object-top object-cover duration-200 transition-all backdrop-blur-3xl"
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
            <h1 className="text-blue-gray-50 hover:text-primary duration-200 transition-colors font-semibold text-lg sm:text-xl lg:text-2xl truncate-lines-2 line-clamp-2">
              {post.heading}
            </h1>
          </Link>
          <p className="text-blue-gray-300 truncate-lines-3 line-clamp-3 whitespace-pre-wrap">
            {post.content}
          </p>
          <Link href={`/${post._id}`} className="primary-btn w-fit">
            Read more
          </Link>
        </div>
        <span className="text-[#a1a1a1] flex items-center gap-2 text-[.8rem] self-end">
          <FaRegClock />
          {formatDistanceToNow(post.createdAt, {
            addSuffix: true,
          })}
        </span>
      </div>
    </div>
  );
};