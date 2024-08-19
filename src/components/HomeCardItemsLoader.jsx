import React from "react";
import { GrFormNext, GrFormPrevious } from "react-icons/gr";

const HomeCardItemsLoader = ({ category, hideCategories }) => {
  return (
    <section id="posts" className="wrapper mt-8 pt-5 grid grid-cols-1 gap-10">
      {!hideCategories && (
        <div className="flex items-center justify-between border-b border-[#101010] gap-4">
          <select
            disabled
            className="text-blue-gray-50 bg-[#101010] px-3 py-1 mb-2 text-xl w-full md:w-[16rem] text-ellipsis outline-none"
          >
            <option className="text-blue-gray-50 bg-[#101010] w-[16rem] text-ellipsis">
              {category.name}
            </option>
          </select>
        </div>
      )}

      <div className="card rounded-lg bg-secondary border-2 border-[#191919] p-2 is-loading w-full grid grid-cols-1 md:grid-cols-[47%,50%] lg:grid-cols-[40%,45%] gap-5">
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

      <div className="card rounded-lg bg-secondary border-2 border-[#191919] p-2 is-loading w-full grid grid-cols-1 md:grid-cols-[47%,50%] lg:grid-cols-[40%,45%] gap-5">
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

      <div className="card rounded-lg bg-secondary border-2 border-[#191919] p-2 is-loading w-full grid grid-cols-1 md:grid-cols-[47%,50%] lg:grid-cols-[40%,45%] gap-5">
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

export default HomeCardItemsLoader;
