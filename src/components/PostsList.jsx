"use client";
import React, { useState  } from "react";
import { getAllPosts } from "@/apiCalls";
import HomeCardItemsLoader from "./HomeCardItemsLoader";
import { useQuery } from "@tanstack/react-query";
import { formatDistanceToNow } from "date-fns";
import Link from "next/link";
import Image from "next/image";
import { FaRegClock } from "react-icons/fa";
import { MdMoreTime } from "react-icons/md";

const PostsList = () => {
  const [page, setPage] = useState(1);
  const [category, setCategory] = useState({
    name: "Latest Stories",
    _id: "0",
  });
  const [posts, setPosts] = useState([]);
  let totalPages = 1;
  const [categories, setCategories] = useState([]);
  const [isFirstLoad, setIsFirstLoad] = useState(true);

  // get initial posts
  const { data, error, refetch, isLoading, isFetchedAfterMount } = useQuery({
    queryKey: ["all-posts", category._id, page],
    queryFn: async () => {
      const response = await getAllPosts({
        page,
        category: category._id,
        isAdmin: false,
      });
      const result = await response.json();
      setCategories(result.data.categories);
      if (isFetchedAfterMount) {
        if (isFirstLoad) {
          setPosts([...result.data.posts]);
        }
      } else {
        setIsFirstLoad(false);
        setPosts([...posts, ...result.data.posts]);
      }
      return result;
    },
    refetchOnWindowFocus: true,
  });

  if (error) return null;

  if (isLoading && isFirstLoad) {
    return <HomeCardItemsLoader category={category} />;
  }

  if (data) {
    totalPages = data.data.totalPages;
  }

  const handleCategoryChange = (val) => {
    let selectedCategory = categories.find((category) => category._id === val);
    setPosts([]);
    setIsFirstLoad(true);
    setPage(1);

    if (!selectedCategory) {
      selectedCategory = { name: "Latest Stories", _id: "0" };
    }
    setCategory(selectedCategory); // Update state with new category
    refetch();
  };

  return (
    <section id="posts" className="wrapper mt-8">
      <div className="flex items-center justify-between border-b border-[#191919] mb-5 gap-4">
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
          {categories.length > 0 &&
            categories.map((category) => (
              <option
                key={category._id}
                value={category._id}
                className="font-jost text-blue-gray-50 bg-[#191919] w-[16rem] text-ellipsis"
              >
                {category.name}
              </option>
            ))}
        </select>
      </div>
      <div className="grid grid-cols-1 gap-10 w-full pt-5">
        {posts.length > 0 ? (
          posts.map((post, i) => (
            <CardItem
              post={post}
              key={post._id}
              isLastItem={i === posts.length - 1}
              handleCategoryChange={handleCategoryChange}
            />
          ))
        ) : (
          <h2 className="text-center text-2xl">
            {!isFirstLoad && "No posts found"}
          </h2>
        )}
        {!isLoading ? (
          <>
            {page === 1 && page < totalPages && !isFirstLoad && (
              <div className="flex justify-center mb-5 -mt-4">
                <button
                  onClick={() => setPage((prev) => prev + 1)}
                  className="secondary-btn flex gap-2 items-center"
                >
                  Load More
                  <MdMoreTime className="text-xl" />
                </button>
              </div>
            )}
          </>
        ) : (
          <div className="flex justify-center w-full mb-5 -mt-4">
            <Image
              className="h-14 w-h-14 object-contain animate-spin"
              src="/assets/images/football.png"
              alt="loading"
              width={100}
              height={100}
            />
          </div>
        )}
      </div>
    </section>
  );
};

export default PostsList;

// post item
const CardItem = ({ post, handleCategoryChange, isLastItem }) => {
  return (
    <div
      className={` ${
        !isLastItem && "border-b"
      } grid grid-cols-1 md:grid-cols-[47%,50%] lg:grid-cols-[40%,45%] gap-5 border-[#191919] pb-5`}
    >
      <Link
        href={`/${post._id}`}
        className="w-full h-[38vh] sm:h-[48vh] md:h-[40vh] lg:h-[45vh] hover:brightness-75 duration-200 transition-all"
        style={{ backgroundImage: `url(${post.image}` }}
      >
        <Image
          src={post.image}
          alt="Post"
          width={1000}
          height={1000}
          className="w-full h-full object-top object-cover backdrop-blur-3xl"
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
            <h1 className="text-blue-gray-50 hover:text-primary duration-200 transition-colors font-medium text-lg sm:text-xl lg:text-2xl truncate-lines-2 line-clamp-2">
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
