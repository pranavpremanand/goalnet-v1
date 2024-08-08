"use client";
import Link from "next/link";
import React from "react";
import toast from "react-hot-toast";
import { AiFillInstagram } from "react-icons/ai";
import { FaFacebook, FaInstagram, FaInstagramSquare, FaShareAlt, FaTelegram } from "react-icons/fa";
import { IoLogoWhatsapp } from "react-icons/io5";
import { RiTwitterXLine } from "react-icons/ri";

const ShareComponent = ({ content }) => {
  const handleShare = async () => {
    const handleCopy = () => {
      navigator.clipboard.writeText(content.url);
      toast.success("Link Copied");
    };

    if (navigator.share) {
      try {
        await navigator.share(content);
      } catch (err) {
        toast(err.message);
        console.error("Error sharing:", err);
      }
    } else {
      handleCopy();
    }
  };
  return (
    <div className="flex items-center gap-3 md:gap-4 justify-end md:justify-start">
      <button
        className="text-xl md:text-2xl md:bg-gray-700 w-8 h-8 md:w-10 md:h-10 md:p-2 flex justify-center items-center rounded-full"
        onClick={handleShare}
      >
        <FaShareAlt />
      </button>
      <Link
        href={`https://api.whatsapp.com/send?text=${encodeURIComponent(
          content.url
        )}`}
        target="_blank"
        rel="noopener noreferrer"
        className="text-[1.6rem] md:text-[1.7rem] text-green-500 md:text-blue-gray-50 md:bg-green-500 w-8 h-8 md:w-10 md:h-10 md:p-1 flex justify-center items-center rounded-full"
      >
        <IoLogoWhatsapp />
      </Link>
      <Link
        href={`https://www.facebook.com/sharer/sharer.php?u=${encodeURIComponent(
          content.url
        )}`}
        target="_blank"
        rel="noopener noreferrer"
        className="text-2xl md:text-3xl text-blue-600 md:text-blue-gray-50 md:bg-blue-600 w-8 h-8 md:w-10 md:h-10 md:p-1 flex justify-center items-center rounded-full"
      >
        <FaFacebook />
      </Link>
      <Link
        href={`https://www.instagram.com/?url=${encodeURIComponent(
          content.url
        )}`}
        target="_blank"
        rel="noopener noreferrer"
        className="text-2xl md:text-3xl text-pink-500 md:text-blue-gray-50 md:bg-pink-500 w-8 h-8 md:w-10 md:h-10 md:p-1 flex justify-center items-center rounded-full"
      >
        <FaInstagram />
      </Link>
      <Link
        href={`https://twitter.com/intent/tweet?url=${encodeURIComponent(
          content.url
        )}`}
        target="_blank"
        rel="noopener noreferrer"
        className="text-xl md:text-2xl md:bg-[#1d1d1d] w-8 h-8 md:w-10 md:h-10 md:p-2 flex justify-center items-center rounded-full"
      >
        <RiTwitterXLine />
      </Link>
      <Link
        href={`https://t.me/share/url?url=${encodeURIComponent(content.url)}`}
        target="_blank"
        rel="noopener noreferrer"
        className="text-2xl md:text-3xl text-blue-600 md:text-blue-gray-50 md:bg-blue-600 w-8 h-8 md:w-10 md:h-10 md:p-1 flex justify-center items-center rounded-full"
      >
        <FaTelegram />
      </Link>
    </div>
  );
};

export default ShareComponent;
