"use client";
import React, { useState } from "react";
import { GrFormNext, GrFormPrevious } from "react-icons/gr";
import CardItem from "./CardItem";
import { getAllPosts } from "@/apiCalls";
import HomeCardItemLoader from "./HomeCardItemLoader";
import { useQuery } from "@tanstack/react-query";

const PostsList = () => {
  const [page, setPage] = useState(1);
  const [category, setCategory] = useState({ name: "Latest News", _id: "0" });

  // get initial posts
  const { data, error, refetch } = useQuery({
    queryKey: ["all-posts", category._id, page],
    queryFn: async () => {
      const response = await getAllPosts({ page, category: category._id });
      return response.json();
    },
    revalidateOnFocus: true,
  });

  if (error) return null;

  if (!data) {
    return <HomeCardItemLoader category={category} />;
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
    <section id="news" className="wrapper mt-8">
      <div className="flex items-center justify-between border-b border-[#191919] mb-5 gap-4">
        {/* <h1 className="text-2xl sm:text-3xl font-semibold mb-3 tracking-wide capitalize">
            Latest news
          </h1> */}
        {categories.length > 0 && (
          <select
            onChange={(e) => handleCategoryChange(e.target.value)}
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
