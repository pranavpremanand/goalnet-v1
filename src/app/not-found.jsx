import Image from "next/image";
import Link from "next/link";

const NotFound = () => {
  return (
    <div className="grow flex flex-col justify-center items-center bg-gradient-radial from-gray-900 to-black">
      <div className="flex font-bold items-end">
        <h1 className="text-8xl inline">4</h1>
        <Image
          src="/assets/images/football.png"
          width={300}
          height={300}
          alt=""
          className="w-[6rem] h-[6rem] animate-bounce"
        />
        <h1 className="text-8xl inline">4</h1>
      </div>
      <h2 className="text-4xl font-semibold">Page not found</h2>
      <Link href="/" className="primary-btn mt-5">
        Home page
      </Link>
    </div>
  );
};

export default NotFound;
