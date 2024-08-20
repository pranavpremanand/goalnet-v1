"use client";
import { getAllPosts } from "@/apiCalls";
import PostItem from "@/components/PostItem";
import { useQuery } from "@tanstack/react-query";
import Link from "next/link";
import React, { useState } from "react";
import { PiCaretRightBold } from "react-icons/pi";

const Posts = () => {
  const [page, setPage] = useState(1);
  const [category, setCategory] = useState({ name: "Latest News", _id: "0" });

  // get initial posts
  const { data, error, refetch, isLoading } = useQuery({
    queryKey: ["all-posts", page, category._id],
    queryFn: async () => {
      const response = await getAllPosts({
        page,
        category: category._id,
        isAdmin: true,
      });
      return response.json();
    },
    refetchOnWindowFocus: true,
  });

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
  if (isLoading) {
    return <Loader category={category} />;
  }

  let { posts, categories, totalPages } = data.data;

  const handleCategoryChange = (val) => {
    let selectedCategory = categories.find((category) => category._id === val);

    if (!selectedCategory) {
      selectedCategory = { name: "Latest News", _id: "0" };
    }
    setCategory(selectedCategory); // Update state with new category
    setPage(1);
    refetch();
  };

  return (
    <section className="grow">
      <div className="wrapper">
        <div className="flex items-center gap-1 mb-10">
          <Link href="/admin" className="text-md" title="Home">
            Home
          </Link>
          <PiCaretRightBold className="text-sm mt-[.15rem]" />
          <Link href="/admin/posts" className="text-md text-primary" title="Posts">
            Posts
          </Link>
        </div>

        <div className="flex flex-col gap-4 md:flex-row justify-between items-center">
          <Link href="/admin/posts/new-post" className="primary-btn" title="Upload a post">
            Upload a post
          </Link>
          {categories.length > 0 && (
            <select
              onChange={(e) => handleCategoryChange(e.target.value)}
              value={category._id}
              className="text-blue-gray-50 bg-[#252525] px-3 py-1 mb-2 text-lg w-full md:w-[16rem] text-ellipsis outline-none"
            >
              <option
                value="0"
                className="text-blue-gray-50 bg-[#252525] w-[16rem] text-ellipsis"
              >
                Latest News
              </option>
              {categories.map((category) => (
                <option
                  key={category._id}
                  value={category._id}
                  className="text-blue-gray-50 bg-[#252525] w-[16rem] text-ellipsis"
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
                <PostItem
                  post={post}
                  key={post._id}
                  handleCategoryChange={handleCategoryChange}
                />
              ))}
            </div>
            <div className="flex justify-between mb-5 -mt-2 gap-4">
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

export default Posts;

const Loader = ({ category }) => {
  return (
    <section className="grow">
      <div className="wrapper">
        <div className="flex items-center gap-1 mb-10">
          <Link href="/admin" className="text-md text-blue-gray-50" title="Home">
            Home
          </Link>
          <PiCaretRightBold className="text-sm mt-[.15rem]" />
          <Link href="/admin/posts" className="text-md text-primary" title="Posts">
            Posts
          </Link>
        </div>

        <div className="flex flex-col gap-4 md:flex-row justify-between items-center">
          <Link href="/admin/posts/new-post" className="primary-btn" title="Upload a post">
            Upload a post
          </Link>
          <select
            disabled
            className="text-blue-gray-50 bg-[#252525] px-3 py-1 mb-2 text-lg w-full md:w-[16rem] text-ellipsis outline-none"
          >
            <option className="text-blue-gray-50 bg-[#252525]">
              {category.name}
            </option>
          </select>
        </div>

        <h1 className="text-2xl font-bold tracking-wider text-center mb-5">
          Posts
        </h1>

        <div className="grid grid-cols-1 gap-10 pb-5">
          <div className="card rounded-xl bg-secondary border-2 border-[#252525] p-2 is-loading w-full  grid grid-cols-1 md:grid-cols-[50%_50%] lg:grid-cols-[30%_70%] gap-1 md:gap-5">
            <div className="image h-[30vh] sm:h-[35vh] lg:h-[30vh] rounded-xl"></div>
            <div className="content pt-2 flex flex-col gap-3">
              <div className="flex flex-col justify-between gap-3 h-full w-11/12">
                <div className="flex flex-col gap-3">
                  <span className="h-[1.75rem] w-[13rem]"></span>
                  <h2 className="h-[2.5rem] md:h-[4rem]"></h2>
                  <p className="h-[5rem] md:h-[6rem]"></p>
                </div>
                <small className="w-[6.5rem] h-[1rem]"></small>
              </div>
            </div>
          </div>
          <div className="card rounded-xl bg-secondary border-2 border-[#252525] p-2 is-loading w-full  grid grid-cols-1 md:grid-cols-[50%_50%] lg:grid-cols-[30%_70%] gap-1 md:gap-5">
            <div className="image h-[30vh] sm:h-[35vh] lg:h-[30vh] rounded-xl"></div>
            <div className="content pt-2 flex flex-col gap-3">
              <div className="flex flex-col justify-between gap-3 h-full w-11/12">
                <div className="flex flex-col gap-3">
                  <span className="h-[1.75rem] w-[13rem]"></span>
                  <h2 className="h-[2.5rem] md:h-[4rem]"></h2>
                  <p className="h-[5rem] md:h-[6rem]"></p>
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
