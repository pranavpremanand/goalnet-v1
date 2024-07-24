import Link from "next/link";
import Image from "next/image";
import { socialLinks } from "../constants";

const Footer = () => {
  return (
    <div className="border-t border-gray-500 text-gray-500 py-6 h-fit bg-black">
      <div className="wrapper flex items-center justify-between flex-col gap-4 sm:flex-row">
        {/* <Link href="/">
          <Image
            src="/assets/images/logo-1.png"
            alt="GoalNet Logo"
            width={500}
            height={500}
            className="w-[4rem] h-[4rem] object-contain object-center"
            loading='lazy'
          />
        </Link> */}
        <small className="">© 2024 - GoalNet. | All rights reserved</small>
        <div className="flex gap-4 text-2xl">
          {socialLinks.map((link) => (
            <Link
              key={link.url}
              href={link.url}
              className="hover:text-gray-400 transition duration-200"
              target="_blank"
            >
              {link.icon}
            </Link>
          ))}
        </div>
      </div>
    </div>
  );
};

export default Footer;
