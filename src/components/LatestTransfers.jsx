"use client";
import { useState } from "react";
import { getLatestTransfers } from "@/apiCalls";
import { useQuery } from "@tanstack/react-query";
import { formatDistanceToNow } from "date-fns";
import Image from "next/image";
import Link from "next/link";
import { FaRegClock } from "react-icons/fa";
import { GrLinkNext } from "react-icons/gr";

const LatestTransfers = () => {
  const [cards, setCards] = useState([]);
  const { data, isLoading, error } = useQuery({
    queryKey: ["latestTransfers"],
    queryFn: async () => {
      const response = await getLatestTransfers();
      const data = await response.json();
      setCards(data.data);
      return data;
    },
    refetchOnWindowFocus: true,
  });

  // if (isLoading) {
  // return <Loader />;
  // }

  if (data) {
    return (
      <div className="wrapper my-6 md:my-12">
        <h1 className="text-2xl font-medium tracking-wider mb-2">
          Latest Transfers
        </h1>
        <div className="grid grid-cols-2 lg:grid-cols-12 gap-5 grid-rows-2 lg:h-[80vh]">
          <div className="col-span-2 lg:col-span-8 row-span-2 w-full h-full relative">
            <div
              style={{ backgroundImage: `url(${cards[0].image})` }}
              className="lg:h-full"
            >
              <Image
                src={cards[0].image}
                // src={'/assets/images/messi-training.jpeg'}
                width={500}
                height={500}
                alt="card"
                className="object-contain w-full h-[55vh] lg:h-full backdrop-blur-3xl"
              />
            </div>
            <div className="md:flex hidden absolute top-0 left-0 w-full h-full bg-[linear-gradient(to_bottom,transparent_20%,black)]"></div>
            <div className="bg-[#191919] md:bg-transparent md:absolute md:bottom-9 md:left-0 p-4 flex flex-col gap-5">
              <h2 className="text-xl md:text-2xl lg:text-3xl text-wrap w-11/12 font-medium">
                {cards[0].heading}
              </h2>
              <div className="flex items-center justify-between mr-6">
                <div className="text-[.8rem] flex items-center gap-2">
                  <FaRegClock />
                  {formatDistanceToNow(cards[0].createdAt, {
                    addSuffix: true,
                  })}
                </div>
                <Link
                  href={`/${cards[0].id}`}
                  className="primary-btn w-fit flex items-center gap-2"
                >
                  Full story <GrLinkNext className="text-lg mt-1" />
                </Link>
              </div>
            </div>
          </div>

          {cards[1] && (
            <div
              className="w-full relative col-span-2 sm:col-span-1 lg:col-span-4"
              style={{ backgroundImage: `url(${cards[1].image})` }}
            >
              <Image
                src={cards[1].image}
                width={500}
                height={500}
                alt="card"
                className="w-full object-contain object-center h-[25vh] sm:h-[33vh] lg:h-full backdrop-blur-3xl"
              />
              <div className="lg:flex hidden absolute top-0 left-0 w-full h-full bg-[linear-gradient(to_bottom,transparent_20%,black)]"></div>
              <div className="w-full lg:absolute lg:bottom-4 lg:left-0 flex flex-col gap-5 md:gap-3 bg-[#191919] lg:bg-transparent p-4">
                <Link
                  href={`/${cards[1].id}`}
                  className="text-base sm:text-lg text-wrap w-full font-medium"
                >
                  {cards[1].heading}
                </Link>
                <div className="flex items-center justify-between mr-6">
                  <div className="text-[.8rem] flex items-center gap-2">
                    <FaRegClock />
                    {formatDistanceToNow(cards[1].createdAt, {
                      addSuffix: true,
                    })}
                  </div>
                </div>
              </div>
            </div>
          )}

          {cards[2] && (
            <div
              className="w-full relative col-span-2 sm:col-span-1 lg:col-span-4"
              style={{ backgroundImage: `url(${cards[2].image})` }}
            >
              <Image
                src={cards[2].image}
                width={500}
                height={500}
                alt="card"
                className="w-full object-contain object-center h-[25vh] sm:h-[33vh] lg:h-full backdrop-blur-3xl"
              />
              <div className="lg:flex hidden absolute top-0 left-0 w-full h-full bg-[linear-gradient(to_bottom,transparent_20%,black)]"></div>
              <div className="w-full lg:absolute lg:bottom-4 lg:left-0 flex flex-col gap-5 md:gap-3 bg-[#191919] lg:bg-transparent p-4">
                <Link
                  href={`/${cards[2].id}`}
                  className="text-base sm:text-lg text-wrap w-full font-medium"
                >
                  {cards[2].heading}
                </Link>
                <div className="flex items-center justify-between mr-6">
                  <div className="text-[.8rem] flex items-center gap-2">
                    <FaRegClock />
                    {formatDistanceToNow(cards[2].createdAt, {
                      addSuffix: true,
                    })}
                  </div>
                </div>
              </div>
            </div>
          )}
        </div>
      </div>
    );
  }
};

export default LatestTransfers;

const Loader = () => {
  return (
    <div className="wrapper grid grid-cols-2 lg:grid-cols-12 gap-5 grid-rows-2">
      <div className="col-span-2 lg:col-span-8 row-span-2 w-full h-full card rounded-lg bg-secondary border-2 border-[#191919] p-2 is-loading grid grid-cols-1 gap-5">
        <div className="image h-[55vh] lg:h-[60vh] rounded-sm"></div>
        <div className="content pt-2 flex flex-col gap-3">
          <div className="flex flex-col justify-between gap-3 h-full">
            <span className="w-[10rem] h-[2rem]"></span>
          </div>
        </div>
      </div>
      <div className="col-span-2 sm:col-span-1 lg:col-span-4 w-full h-full card rounded-lg bg-secondary border-2 border-[#191919] p-2 is-loading grid grid-cols-1 gap-5">
        <div className="image h-[25vh] sm:h-[30vh] rounded-sm"></div>
        <div className="content pt-2 flex flex-col gap-3">
          <div className="flex flex-col justify-between gap-3 h-full">
            <span className="w-[10rem] h-[2rem]"></span>
          </div>
        </div>
      </div>
      <div className="col-span-2 sm:col-span-1 lg:col-span-4 w-full h-full card rounded-lg bg-secondary border-2 border-[#191919] p-2 is-loading grid grid-cols-1 gap-5">
        <div className="image h-[25vh] sm:h-[30vh] rounded-sm"></div>
        <div className="content pt-2 flex flex-col gap-3">
          <div className="flex flex-col justify-between gap-3 h-full">
            <span className="w-[10rem] h-[2rem]"></span>
          </div>
        </div>
      </div>
    </div>
  );
};
