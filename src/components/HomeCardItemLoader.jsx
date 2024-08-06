import React from "react";
import { GrFormNext, GrFormPrevious } from "react-icons/gr";

const HomeCardItemLoader = () => {
  return (
    <section
      id="latest-stories"
      className="wrapper mt-8 pt-5 grid grid-cols-1 gap-10"
    >
      <div className="flex items-center justify-between border-b border-gray-500 gap-4">
        <select
          disabled
          className="text-black bg-white px-3 py-1 mb-2 text-lg w-full md:w-[15rem]"
        >
          <option value="0">Latest News</option>
        </select>
        <div className="hidden md:flex gap-2 -mt-2">
          <button className="border hover:border-primary hover:text-primary transition duration-200 text-3xl">
            <GrFormPrevious />
          </button>
          <button className="border hover:border-primary hover:text-primary transition duration-200 text-3xl">
            <GrFormNext />
          </button>
        </div>
      </div>

      <div className="card rounded-sm bg-black is-loading w-full grid grid-cols-1 md:grid-cols-[47%,50%] lg:grid-cols-[40%,45%] gap-5">
        <div className="image h-[30vh] md:h-[40vh] lg:h-[45vh] rounded-sm"></div>
        <div className="content pt-2 flex flex-col gap-3">
          <div className="flex flex-col justify-between gap-3 h-full">
            <div className="flex flex-col gap-3">
              <span className="h-[1.75rem] w-[13rem]"></span>
              <h2 className="h-[2.5rem] md:h-[4rem]"></h2>
              <p className="h-[5rem] md:h-[7rem]"></p>
            </div>
            <small className="w-[6.5rem] h-[1rem]"></small>
          </div>
        </div>
      </div>

      <div className="card rounded-sm bg-black is-loading w-full grid grid-cols-1 md:grid-cols-[47%,50%] lg:grid-cols-[40%,45%] gap-5">
        <div className="image h-[30vh] md:h-[40vh] lg:h-[45vh] rounded-sm"></div>
        <div className="content pt-2 flex flex-col gap-3">
          <div className="flex flex-col justify-between gap-3 h-full">
            <div className="flex flex-col gap-3">
              <span className="h-[1.75rem] w-[13rem]"></span>
              <h2 className="h-[2.5rem] md:h-[4rem]"></h2>
              <p className="h-[5rem] md:h-[7rem]"></p>
            </div>
            <small className="w-[6.5rem] h-[1rem]"></small>
          </div>
        </div>
      </div>

      <div className="card rounded-sm bg-black is-loading w-full grid grid-cols-1 md:grid-cols-[47%,50%] lg:grid-cols-[40%,45%] gap-5">
        <div className="image h-[30vh] md:h-[40vh] lg:h-[45vh] rounded-sm"></div>
        <div className="content pt-2 flex flex-col gap-3">
          <div className="flex flex-col justify-between gap-3 h-full">
            <div className="flex flex-col gap-3">
              <span className="h-[1.75rem] w-[13rem]"></span>
              <h2 className="h-[2.5rem] md:h-[4rem]"></h2>
              <p className="h-[5rem] md:h-[7rem]"></p>
            </div>
            <small className="w-[6.5rem] h-[1rem]"></small>
          </div>
        </div>
      </div>
    </section>
  );
};

export default HomeCardItemLoader;
