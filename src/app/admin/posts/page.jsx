"use client";
import { fetcher } from "@/apiCalls";
import PostItem from "@/components/PostItem";
import Link from "next/link";
import React, { useState } from "react";
import { PiCaretRightBold } from "react-icons/pi";
import useSWR from "swr";

const page = () => {
  const [page, setPage] = useState(1);
  const [category, setCategory] = useState({ name: "Latest News", _id: "0" });

  // get initial posts
  const { data, error, mutate } = useSWR(
    {
      url: "/api/all-posts",
      options: { body: { page, category: category._id }, method: "POST" },
    },
    fetcher,
    { revalidateOnFocus: true }
  );

  if (error) {
    return (
      <div className="wrapper grow flex items-center justify-center flex-col gap-2">
        <p className="text-2xl">Failed to load data. Try reloading the page</p>
        <a className="secondary-btn" href="/admin/posts">
          Reload
        </a>
      </div>
    );
  }
  if (!data) {
    return <Loader category={category} />;
  }

  let { posts, categories } = data.data;

  const handleCategoryChange = (e) => {
    let selectedCategory = categories.find(
      (category) => category._id === e.target.value
    );

    if (!selectedCategory) {
      selectedCategory = { name: "Latest News", _id: "0" };
    }
    setCategory(selectedCategory); // Update state with new category
    setPage(1);
    mutate();
  };

  return (
    <section className="grow">
      <div className="wrapper">
        <div className="flex items-center gap-1 mb-10">
          <Link href="/admin" className="text-md text-blue-gray-50">
            Home
          </Link>
          <PiCaretRightBold className="text-sm mt-[.15rem]" />
          <Link href="/admin/posts" className="text-md text-primary underline">
            Posts
          </Link>
        </div>

        <div className="flex justify-between items-center">
          <Link href="/admin/posts/new-post" className="primary-btn">
            Upload a post
          </Link>
          {categories.length > 0 && (
            <select
              onChange={(e) => handleCategoryChange(e)}
              value={category._id}
              className="text-blue-gray-50 bg-[#191919] px-3 py-1 mb-2 text-lg w-full md:w-[16rem] text-ellipsis outline-none"
            >
              <option
                value="0"
                className="text-blue-gray-50 bg-[#191919] w-[16rem] text-ellipsis"
              >
                Latest News
              </option>
              {categories.map((category) => (
                <option
                  key={category._id}
                  value={category._id}
                  className="text-blue-gray-50 bg-[#191919] w-[16rem] text-ellipsis"
                >
                  {category.name}
                </option>
              ))}
            </select>
          )}
        </div>

        {posts.length > 0 ? (
          <>
            <h1 className="text-2xl font-bold tracking-wider text-center mb-5">
              Posts
            </h1>

            <div className="grid grid-cols-1 gap-5 pb-5">
              {posts.map((post) => (
                <PostItem post={post} key={post._id} refetchData={mutate} />
              ))}
            </div>
          </>
        ) : (
          <h1 className="text-3xl font-bold tracking-wider text-center">
            No Posts Found
          </h1>
        )}
      </div>
    </section>
  );
};

export default page;

const Loader = ({ category }) => {
  return (
    <section className="grow">
      <div className="wrapper">
        <div className="flex items-center gap-1 mb-10">
          <Link href="/admin" className="text-md text-blue-gray-50">
            Home
          </Link>
          <PiCaretRightBold className="text-sm mt-[.15rem]" />
          <Link href="/admin/posts" className="text-md text-primary underline">
            Posts
          </Link>
        </div>

        <div className="flex justify-between items-center">
          <Link href="/admin/posts/new-post" className="primary-btn">
            Upload a post
          </Link>
          <select
            disabled
            className="text-blue-gray-50 bg-[#191919] px-3 py-1 mb-2 text-lg w-full md:w-[16rem] text-ellipsis outline-none"
          >
            <option className="text-blue-gray-50 bg-[#191919]">{category.name}</option>
          </select>
        </div>

        <h1 className="text-2xl font-bold tracking-wider text-center mb-5">
          Posts
        </h1>

        <div className="grid grid-cols-1 gap-5 pb-5">
          <div className="card rounded-xl bg-black is-loading w-full  grid grid-cols-1 md:grid-cols-[50%_50%] lg:grid-cols-[30%_70%] gap-1 md:gap-5">
            <div className="image h-[30vh] sm:h-[35vh] lg:h-[30vh] rounded-xl"></div>
            <div className="content pt-2 flex flex-col gap-3">
              <div className="flex flex-col justify-between gap-3 h-full">
                <div className="flex flex-col gap-3">
                  <span className="h-[1.75rem] w-[13rem]"></span>
                  <h2 className="h-[2.5rem] md:h-[4rem]"></h2>
                  <p className="h-[5rem] md:h-[7rem]"></p>
                </div>
                <small className="w-[6.5rem] h-[1rem]"></small>
              </div>
            </div>
          </div>
          <div className="card rounded-xl bg-black is-loading w-full  grid grid-cols-1 md:grid-cols-[50%_50%] lg:grid-cols-[30%_70%] gap-1 md:gap-5">
            <div className="image h-[30vh] sm:h-[35vh] lg:h-[30vh] rounded-xl"></div>
            <div className="content pt-2 flex flex-col gap-3">
              <div className="flex flex-col justify-between gap-3 h-full">
                <div className="flex flex-col gap-3">
                  <span className="h-[1.75rem] w-[13rem]"></span>
                  <h2 className="h-[2.5rem] md:h-[4rem]"></h2>
                  <p className="h-[5rem] md:h-[7rem]"></p>
                </div>
                <small className="w-[6.5rem] h-[1rem]"></small>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
