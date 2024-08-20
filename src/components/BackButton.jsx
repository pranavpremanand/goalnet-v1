"use client";
import { useRouter } from "next/navigation";
import { BiCaretLeft } from "react-icons/bi";

export default function BackButton() {
  const router = useRouter();

  const handleBack = () => {
      router.back(); // Fallback to router.back() if referer is not available
  };

  return (
    <button
      onClick={handleBack}
      className="text-md flex items-center font-medium"
    >
      <BiCaretLeft className="text-3xl sm:text-2xl" /> Back
    </button>
  );
}
