"use client";
import React, { useState } from "react";
import { GrFormNext, GrFormPrevious } from "react-icons/gr";
import useSWR from "swr";
import CardItem from "./CardItem";
import { fetcher } from "@/apiCalls";
import HomeCardItemLoader from "./HomeCardItemLoader";

const PostsList = () => {
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
        <a className="secondary-btn" href="/">
          Reload
        </a>
      </div>
    );
  }
  if (!data) {
    return <HomeCardItemLoader category={category} />;
  }

  let { posts, categories, totalPages } = data.data;

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
    <section id="latest-stories" className="wrapper mt-8">
      <div className="flex items-center justify-between border-b border-[#191919] mb-5 gap-4">
        {/* <h1 className="text-2xl sm:text-3xl font-semibold mb-3 tracking-wide capitalize">
            Latest news
          </h1> */}
        {categories.length > 0 && (
          <select
            onChange={(e) => handleCategoryChange(e)}
            value={category._id}
            className="text-blue-gray-50 bg-[#191919] px-3 py-1 mb-2 text-xl w-full md:w-[16rem] text-ellipsis outline-none"
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
        <div className="hidden md:flex gap-2 -mt-2">
          <button
            disabled={page === 1}
            className={`${
              page === 1
                ? "text-gray-500 border-gray-500"
                : "text-primary border-primary hover:border-gray-500 hover:text-gray-500"
            }  transition duration-200 text-3xl border`}
          >
            <GrFormPrevious />
          </button>
          <button
            disabled={page === totalPages}
            className={`${
              page === totalPages
                ? "text-gray-500 border-gray-500"
                : "text-primary border-primary hover:border-gray-500 hover:text-gray-500"
            }  transition duration-200 text-3xl border`}
          >
            <GrFormNext />
          </button>
        </div>
      </div>
      <div className="grid grid-cols-1 gap-10 w-full pt-5">
        {posts.length > 0 ? (
          posts.map((post) => <CardItem post={post} key={post._id} />)
        ) : (
          <h2 className="text-center text-2xl">No posts found</h2>
        )}
        <div className="flex justify-between mb-5 -mt-4 gap-4">
          <button
            disabled={page === 1}
            className={`${
              page === 1 ? "disabled-btn" : "secondary-btn"
            } min-w-[7rem] sm:min-w-[10rem]`}
          >
            Previous
          </button>
          <button
            disabled={page === totalPages}
            className={`${
              page === totalPages ? "disabled-btn" : "secondary-btn"
            } min-w-[7rem] sm:min-w-[10rem]`}
          >
            Next
          </button>
        </div>
      </div>
    </section>
  );
};

export default PostsList;
