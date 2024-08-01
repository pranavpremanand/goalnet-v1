import CardItem from "../components/CardItem";
import { images } from "../constants";
import { GrFormNext, GrFormPrevious } from "react-icons/gr";
import Banner from "../components/Banner";
import Post from "@/utils/database/models/post.model";
import { connectDb } from "@/utils/database";

export default async function Home() {
  await connectDb()
  const posts = await Post.aggregate([
    { $match: { isDeleted: false, isBanner: true } },
    {
      $lookup: {
        from: "categories",
        localField: "category",
        foreignField: "_id",
        as: "categoryDetails"
      }
    },
    { $unwind: "$categoryDetails" },
    {
      $project: {
        _id: { $toString: "$_id" },
        heading: 1,
        content: 1,
        image: 1,
        isBanner: 1,
        createdAt: { $dateToString: { format: "%Y-%m-%dT%H:%M:%S.%LZ", date: "$createdAt" } },
        updatedAt: { $dateToString: { format: "%Y-%m-%dT%H:%M:%S.%LZ", date: "$updatedAt" } },
        category: {
          _id: { $toString: "$categoryDetails._id" },
          name: "$categoryDetails.name"
        }
      }
    },
    { $limit: 20 }
  ]).sort({ createdAt: -1 });

  const banners = posts.filter((post) => post.isBanner);
  return (
    <section className="w-full">
      <Banner banners={banners}/>
      <section id="latest-stories" className="wrapper mt-8">
        <div className="flex items-center justify-between border-b border-gray-500 mb-5 gap-4">
          <h1 className="text-2xl sm:text-3xl font-semibold mb-3 tracking-wide capitalize">
            Latest news
          </h1>
          <div className="flex gap-2 -mt-4">
            <button className="border hover:border-primary hover:text-primary transition duration-200 text-3xl">
              <GrFormPrevious />
            </button>
            <button className="border hover:border-primary hover:text-primary transition duration-200 text-3xl">
              <GrFormNext />
            </button>
          </div>
        </div>
        <div className="grid grid-cols-1 gap-10 w-full pt-5">
          {posts.map((post) => (
            <CardItem post={post} key={post._id} />
          ))}
          <div className="flex justify-between mb-5 -mt-4 gap-4">
            <button className="disabled-btn min-w-[7rem] sm:min-w-[10rem]">
              Previous
            </button>
            <button className="secondary-btn min-w-[7rem] sm:min-w-[10rem]">
              Next
            </button>
          </div>
        </div>
      </section>
    </section>
  );
}
