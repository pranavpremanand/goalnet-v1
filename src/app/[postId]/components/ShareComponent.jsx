"use client";
import Image from "next/image";
import Link from "next/link";
import React from "react";
import toast from "react-hot-toast";
import { FaLink, FaShareAlt } from "react-icons/fa";

const ShareComponent = ({ content }) => {
  const handleCopy = () => {
    navigator.clipboard.writeText(content.url);
    toast.success("Link Copied");
  };

  const handleShare = async () => {
    if (navigator.share) {
      try {
        await navigator.share({
          ...content,
          files: [new File([], content.image, { type: "image/jpeg" })],
        });
      } catch (err) {
        handleCopy();
      }
    } else {
      handleCopy();
    }
  };
  return (
    <div className="flex items-center gap-3 justify-end">
      <button
        className="text-3xl md:bg-gray-700 w-8 h-8 md:p-2 flex lg:hidden justify-center items-center rounded-full"
        onClick={handleShare}
      >
        <FaShareAlt />
      </button>
      <button
        className="text-3xl md:bg-gray-700 w-8 h-8 md:p-2 hidden lg:flex justify-center items-center rounded-full"
        onClick={handleCopy}
      >
        <FaLink />
      </button>

      <Link
        href={`https://api.whatsapp.com/send?text=${encodeURIComponent(
          content.url
        )}`}
        target="_blank"
        rel="noopener noreferrer"
      >
        <Image
          src="/assets/images/whatsapp-icon.png"
          alt="wa-icon"
          width={100}
          height={100}
          className="w-[2.3rem] h-[2.3rem] object-contain"
        />
      </Link>
      <Link
        href={`https://www.facebook.com/sharer/sharer.php?u=${encodeURIComponent(
          content.url
        )}`}
        target="_blank"
        rel="noopener noreferrer"
      >
        <Image
          src="/assets/images/fb-icon.png"
          alt="fb-icon"
          width={100}
          height={100}
          className="w-[2.3rem] h-[2.3rem] object-contain"
        />
      </Link>

      <Link
        href={`https://twitter.com/intent/tweet?url=${encodeURIComponent(
          content.url
        )}`}
        target="_blank"
        rel="noopener noreferrer"
      >
        <Image
          src="/assets/images/twitter-icon.png"
          alt="twitter-icon"
          width={100}
          height={100}
          className="w-[2.5rem] h-[2.5rem] object-contain"
        />
      </Link>
      <Link
        href={`https://t.me/share/url?url=${encodeURIComponent(content.url)}`}
        target="_blank"
        rel="noopener noreferrer"
      >
        <Image
          src="/assets/images/telegram-icon.png"
          alt="telegram-icon"
          width={100}
          height={100}
          className="w-[2.3rem] h-[2.3rem] object-contain"
        />
      </Link>
    </div>
  );
};

export default ShareComponent;
