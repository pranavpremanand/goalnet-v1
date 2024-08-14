"use client";
import Image from "next/image";
import Link from "next/link";
import { usePathname } from "next/navigation";

const Error = () => {
  const pathname = usePathname();
  const isAdmin = pathname.includes("/admin") && pathname !== "/admin/login";

  return (
    <div className="wrapper grow flex flex-col justify-center items-center bg-gradient-radial from-gray-900 to-black">
      <div className="flex font-bold items-end">
        <h1 className="text-5xl lg:text-8xl inline">ERR</h1>
        <Image
          src="/assets/images/football.png"
          width={300}
          height={300}
          alt=""
          className="w-[3rem] lg:w-[6rem] h-[3rem] lg:h-[6rem] animate-bounce"
        />
        <h1 className="text-5xl lg:text-8xl inline">R</h1>
      </div>
      <h2 className="text-2xl lg:text-4xl font-semibold text-center">
        Something went wrong
      </h2>
      <Link href={isAdmin ? "/admin" : "/"} className="primary-btn mt-5">
        Home page
      </Link>
    </div>
  );
};

export default Error;
