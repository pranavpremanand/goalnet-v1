"use client";
import CategoryForm from "@/app/admin/categories/components/CategoryForm";
import Link from "next/link";
import { PiCaretRightBold } from "react-icons/pi";
import { getCategories } from "@/apiCalls";
import { useQuery } from "@tanstack/react-query";
import { useDispatch, useSelector } from "react-redux";
import { setCategories } from "@/lib/redux/storeSlice";
import CategoryItem from "./components/CategoryItem";
import Loading from "@/app/loading";

const Categories = () => {
  const dispatch = useDispatch();
  const { categories } = useSelector((state) => state.store);
  const { error, isLoading } = useQuery({
    queryKey: ["categories"],
    queryFn: async () => {
      const response = await getCategories({ includeDeleted: true });
      const data = await response.json();
      dispatch(setCategories(data.categories));
      return data;
    },
    refetchOnWindowFocus: true,
  });

  if (error)
    return (
      <div className="wrapper grow flex items-center justify-center flex-col gap-2">
        <p className="text-2xl">
          Failed to load categories. Try reloading the page
        </p>
        <a className="secondary-btn" href="/admin/categories">
          Reload
        </a>
      </div>
    );

  if (isLoading) return <Loading />;
  return (
    <section className="grow">
      <div className="wrapper">
        <div className="flex items-center gap-1">
          <Link href="/admin" className="text-md">
            Home
          </Link>
          <PiCaretRightBold className="text-sm mt-[.15rem]" />
          <Link
            href="/admin/categories"
            className="text-md text-primary"
          >
            Categories
          </Link>
        </div>

        {categories.length === 0 && (
          <h1 className="text-3xl font-bold tracking-wider text-center">
            No Categories Found
          </h1>
        )}

        <CategoryForm
          dispatch={dispatch}
          categories={categories}
          setCategories={setCategories}
        />
        {categories.length > 0 && (
          <div className="flex flex-col gap-4">
            <h1 className="text-2xl font-bold tracking-wider text-center mb-2">
              Categories
            </h1>
            <div className="w-full">
              <div className="w-full">
                {categories.map((category) => (
                  <CategoryItem
                    key={category._id}
                    category={category}
                    setCategories={setCategories}
                    categories={categories}
                    dispatch={dispatch}
                  />
                ))}
              </div>
            </div>
          </div>
        )}
        {/* <div className="flex justify-between items-center gap-2 mt-2">
          <button
            className={
              data.pagination.page === 1 ? "disabled-btn" : "secondary-btn"
            }
            disabled={data.pagination.page === 1}
          >
            Previous
          </button>
          <div className='w-7 h-7 text-black flex justify-center items-center font-semibold rounded-full bg-blue-gray-50'>{data.pagination.page}</div>
          <button
            className={
              data.pagination.totalPages === data.pagination.page
                ? "disabled-btn"
                : "secondary-btn"
            }
            disabled={data.pagination.totalPages === data.pagination.page}
          >
            Next
          </button>
        </div> */}
      </div>
    </section>
  );
};

export default Categories;
