"use client";
import Image from "next/image";

const Error = () => {
  return (
    <div className="wrapper grow flex flex-col justify-center items-center bg-gradient-radial from-gray-900 to-black">
      <div className="flex font-bold items-end">
        <h1 className="text-8xl inline">ERR</h1>
        <Image
          src="/assets/images/football.png"
          width={300}
          height={300}
          alt=""
          className="w-[6rem] h-[6rem] animate-bounce"
        />
        <h1 className="text-8xl inline">R</h1>
      </div>
      <h2 className="text-4xl font-semibold">Something went wrong</h2>
      <a href="/" className="primary-btn mt-5">
        Home page
      </a>
    </div>
  );
};

export default Error;
