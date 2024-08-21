import Link from "next/link";
import { socialLinks } from "../constants";

const Footer = () => {
  return (
    <div className="border-t border-[#252525] text-gray-500 py-6 h-fit">
      <div className="wrapper flex items-center justify-between flex-col gap-4 sm:flex-row">
        <small>© 2024 - GoalNet | All rights reserved</small>
        <div className="flex gap-4 text-2xl">
          {socialLinks.map((link) => (
            <Link
              key={link.url}
              href={link.url}
              className="hover:text-gray-400 transition duration-200"
              target="_blank"
              rel="noreferrer"
              title={link.label}
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
