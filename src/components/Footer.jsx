import Link from "next/link";
import { socialLinks } from "../constants";

const Footer = () => {
  return (
    <div className="border-t border-[#191919] text-gray-500 py-6 h-fit bg-black">
      <div className="wrapper flex items-center justify-between flex-col gap-4 sm:flex-row">
        <small>© 2024 - GoalNet | All rights reserved</small>
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
        {/* <Link href="/" className="justify-self-end">
          <Image
            src="/assets/images/GoalNet - Logo.png"
            alt="GoalNet Logo"
            width={500}
            height={500}
            className="w-[6rem] md:w-[7.5rem] h-[1.5rem] md:h-[2rem] object-cover object-center"
            loading="lazy"
          />
        </Link> */}
      </div>
    </div>
  );
};

export default Footer;
