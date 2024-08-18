"use client";
import { Poppins } from "next/font/google";
import Link from "next/link";
import { useState, useEffect } from "react";
import NavItems from "./NavItems";
import { Squash as Hamburger } from "hamburger-react";
import { Drawer } from "@material-tailwind/react";
import { IoClose } from "react-icons/io5";

const poppins = Poppins({
  subsets: ["latin"],
  weight: ["300", "400", "500", "600", "700", "800", "900"],
});

const Header = () => {
  const [isOpen, setOpen] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      const scrollPosition = window.scrollY;
      if (scrollPosition > 100) {
        // Change 100 to whatever scroll position you prefer
        setIsScrolled(true);
      } else {
        setIsScrolled(false);
      }
    };

    window.addEventListener("scroll", handleScroll);

    // Clean up event listener on unmount
    return () => {
      window.removeEventListener("scroll", handleScroll);
    };
  }, []);

  return (
    <header className="sticky -top-1 left-0 z-30 w-full">
      <div
        className={`py-2 md:py-3 transition-colors duration-1000 ${
          isScrolled ? "backdrop-blur-lg bg-transparent" : "bg-secondary"
        }`}
      >
        <div className="wrapper flex justify-between items-center">
          <Link className={poppins.className} href={"/"} prefetch={false}>
            {/*
          <Image
            src="/assets/images/logo-1.png"
            alt="GoalNet Logo"
            width={500}
            height={500}
            className="w-[4rem] h-[4rem] object-contain object-center"
            loading='lazy'
          /> */}
            <span className="text-2xl font-bold text-blue-gray-50">
              Goal<span className="text-primary">Net.</span>
            </span>
          </Link>
          <div className="hidden md:flex">
            <NavItems />
          </div>
          <div className="md:hidden text-primary z-10">
            <Hamburger toggled={isOpen} toggle={setOpen} size={25} />
          </div>
        </div>
      </div>
      <Drawer
        open={isOpen}
        onClose={() => setOpen(false)}
        className="p-4 bg-black"
        placement="right"
      >
        <div className="mb-6 flex items-center justify-end pr-[.7rem] py-[.4rem]">
          <button
            onClick={() => setOpen(false)}
            className="text-primary text-[2.2rem]"
          >
            <IoClose />
          </button>
        </div>
        <NavItems onClose={() => setOpen(false)} />
      </Drawer>
    </header>
  );
};

export default Header;
