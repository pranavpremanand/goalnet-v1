"use client";
import CategoryForm from "@/components/CategoryForm";
import Loading from "@/components/Loading";
import useSWR from "swr";
import { formatDistanceToNow } from "date-fns";

const fetcher = (url) => fetch(url).then((res) => res.json());

const Categories = () => {
  const { data, error, mutate } = useSWR("/api/category", fetcher);

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
  if (!data) return <Loading />;
  const categories = data.categories;
  return (
    <div className="my-3">
      <div className="wrapper">
        {categories?.length === 0 && (
          <h1 className="text-3xl font-bold tracking-wider text-center">
            No Categories Found
          </h1>
        )}
        <CategoryForm refetchData={mutate} />
        {categories?.length > 0 && (
          <div className="flex flex-col gap-4">
            <h1 className="text-3xl font-bold tracking-wider text-center mb-2">
              Categories
            </h1>

            <div className="w-full">
              <div className="w-full">
                {categories.map((category) => (
                  <div
                    className="w-full flex flex-col md:flex-row items-center gap-3 p-2 border-primary/50 border rounded-md mb-2"
                    key={category._id}
                  >
                    <span className="grow text-2xl md:text-base text-wrap line-clamp-2 mt-3 md:mt-0">
                      {JSON.parse(JSON.stringify(category.name))}
                    </span>
                    <div className="flex gap-2">
                      <button className="px-4 py-1 text-[.9rem] md:text-[.8rem] bg-black text-primary hover:bg-primary hover:text-black tracking-wide font-semibold transition-colors duration-300 rounded-full">
                        Edit
                      </button>
                      <button className="px-4 py-1 text-[.9rem] md:text-[.8rem] bg-black text-red-600 hover:bg-red-600 hover:text-black tracking-wide font-semibold transition-colors duration-300 rounded-full">
                        Delete
                      </button>
                    </div>
                    <span className="self-start md:self-auto text-xs md:w-[10rem] md:ml-3 text-gray-600">
                      {formatDistanceToNow(category.createdAt, {
                        addSuffix: true,
                      })}
                    </span>
                  </div>
                ))}
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default Categories;
