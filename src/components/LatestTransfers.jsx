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
      console.log(data.data);
      return data;
    },
    refetchOnWindowFocus: true,
  });

  if (cards[0]) {
    return (
      <div className="wrapper my-6 md:my-12">
        <h1 className="text-2xl font-medium tracking-wider mb-2 text-white">
          Latest Transfers
        </h1>
        <div className="grid grid-cols-2 lg:grid-cols-12 gap-5 grid-rows-2 lg:h-[80vh]">
          <div className="col-span-2 lg:col-span-6 row-span-2 w-full h-full relative">
            <div
              style={{ backgroundImage: `url(${cards[0].image})` }}
              className="lg:h-full"
            >
              <Image
                src={cards[0].image}
                width={500}
                height={500}
                alt="card"
                className="w-full h-[55vh] lg:h-[55%] object-contain object-center backdrop-blur-3xl"
              />
              <div className="w-full flex flex-col gap-4 md:gap-2 bg-[#101010] lg:h-[45%] p-4">
                <h2 className="text-xl md:text-2xl lg:text-3xl text-wrap w-11/12 font-medium text-white">
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
                    href={`/${cards[0]._id}`}
                    className="primary-btn w-fit flex items-center gap-2"
                  >
                    Full story <GrLinkNext className="text-lg mt-1" />
                  </Link>
                </div>
              </div>
            </div>
          </div>

          {cards[1] && (
            <div
              className="flex flex-row-reverse items-center sm:block w-full col-span-2 sm:col-span-1 lg:col-span-3"
              style={{ backgroundImage: `url(${cards[1].image})` }}
            >
              <Image
                src={cards[1].image}
                width={500}
                height={500}
                alt="card"
                className="w-3/5 sm:w-full h-[30vh] lg:h-3/6 object-contain object-center backdrop-blur-3xl"
              />
              <div className="w-full flex flex-col justify-between gap-5 md:gap-3 bg-[#101010] h-full sm:h-fit lg:h-3/6 px-3 pt-3 sm:pt-2 pb-3">
                <Link
                  href={`/${cards[1]._id}`}
                  className="text-base xl:text-lg text-wrap w-full font-medium text-white hover:text-primary transition-colors duration-150"
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
              className="flex flex-row-reverse items-center sm:block w-full col-span-2 sm:col-span-1 lg:col-span-3"
              style={{ backgroundImage: `url(${cards[1].image})` }}
            >
              <Image
                src={cards[2].image}
                width={500}
                height={500}
                alt="card"
                className="w-3/5 sm:w-full h-[30vh] lg:h-3/6 object-contain object-center backdrop-blur-3xl"
              />
              <div className="w-full flex flex-col justify-between gap-5 md:gap-3 bg-[#101010] h-full sm:h-fit lg:h-3/6 px-3 pt-3 sm:pt-2 pb-3">
                <Link
                  href={`/${cards[2]._id}`}
                  className="text-base xl:text-lg text-wrap w-full font-medium text-white hover:text-primary transition-colors duration-150"
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
      <div className="col-span-2 lg:col-span-8 row-span-2 w-full h-full card rounded-lg bg-secondary border-2 border-[#101010] p-2 is-loading grid grid-cols-1 gap-5">
        <div className="image h-[55vh] lg:h-[60vh] rounded-sm"></div>
        <div className="content pt-2 flex flex-col gap-3">
          <div className="flex flex-col justify-between gap-3 h-full">
            <span className="w-[10rem] h-[2rem]"></span>
          </div>
        </div>
      </div>
      <div className="col-span-2 sm:col-span-1 lg:col-span-4 w-full h-full card rounded-lg bg-secondary border-2 border-[#101010] p-2 is-loading grid grid-cols-1 gap-5">
        <div className="image h-[25vh] sm:h-[30vh] rounded-sm"></div>
        <div className="content pt-2 flex flex-col gap-3">
          <div className="flex flex-col justify-between gap-3 h-full">
            <span className="w-[10rem] h-[2rem]"></span>
          </div>
        </div>
      </div>
      <div className="col-span-2 sm:col-span-1 lg:col-span-4 w-full h-full card rounded-lg bg-secondary border-2 border-[#101010] p-2 is-loading grid grid-cols-1 gap-5">
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
