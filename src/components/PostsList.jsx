"use client";
import React, { useState } from "react";
import { GrFormNext, GrFormPrevious } from "react-icons/gr";
import useSWR from "swr";
import CardItem from "./CardItem";
import { fetcher } from "@/apiCalls";

const PostsList = () => {
  const [page, setPage] = useState(1);
  const [category, setCategory] = useState("0");

  // get initial posts
  const { data, error, mutate } = useSWR(
    {
      url: "/api/all-posts",
      options: { body: { page, category }, method: "POST" },
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
    return <div>Loading...</div>;
  }

  let { posts, categories, totalPages } = data.data;

  const handleCategoryChange = (e) => {
    setCategory(e.target.value); // Update state with new category
    setPage(1);
    mutate();
  };
  return (
    <section id="latest-stories" className="wrapper mt-8">
      <div className="flex items-center justify-between border-b border-gray-500 mb-5 gap-4">
        {/* <h1 className="text-2xl sm:text-3xl font-semibold mb-3 tracking-wide capitalize">
            Latest news
          </h1> */}
        {categories.length > 0 && (
          <select
            onChange={(e) => handleCategoryChange(e)}
            value={category}
            className="text-black bg-white px-3 py-1 mb-2 text-lg w-full md:w-fit"
          >
            <option value="0">Latest News</option>
            {categories.map((category) => (
              <option key={category._id} value={category._id}>
                {category.name}
              </option>
            ))}
          </select>
        )}
        <div className="hidden md:flex gap-2 -mt-2">
          <button className="border hover:border-primary hover:text-primary transition duration-200 text-3xl">
            <GrFormPrevious />
          </button>
          <button className="border hover:border-primary hover:text-primary transition duration-200 text-3xl">
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
