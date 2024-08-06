"use client";
import Banner from "../components/Banner";
import useSWR from "swr";
import { fetcher } from "@/apiCalls";
import PostsList from "@/components/PostsList";
import SmallLoader from "@/components/SmallLoader";

export default function Home() {
  // get banners
  const { data, error, mutate } = useSWR(
    {
      url: "/api/banners",
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
    return (
    <div className="w-screen h-[40vh] sm:h-[55vh] md:h-[85vh] bg-white/5">
      <SmallLoader />
    </div>
    );
  }

  let { banners } = data;

  return (
    <section className="w-full flex-1 grow">
      <Banner banners={banners} />
      <PostsList />
    </section>
  );
}
