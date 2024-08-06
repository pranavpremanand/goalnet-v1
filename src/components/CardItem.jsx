import { formatDistanceToNow } from "date-fns";
import Image from "next/image";
import Link from "next/link";
import { FaRegClock } from "react-icons/fa";

const CardItem = ({ post }) => {
  return (
    <div
      className={`grid grid-cols-1 md:grid-cols-[47%,50%] lg:grid-cols-[40%,45%] gap-5 md:border-none pb-5
      }`}
    >
      <Link href="/">
        <Image
          src={post.image}
          alt="Post"
          width={1000}
          height={1000}
          className="w-full h-[40vh] sm:h-[48vh] md:h-[40vh] lg:h-[45vh] rounded-md object-center object-cover hover:brightness-[70%] duration-200 transition-all"
        />
      </Link>
      <div className="flex flex-col justify-between gap-3 h-full">
        <div className="flex flex-col gap-3">
          <span className="bg-blue-500 text-white px-2 py-[.2rem] rounded-sm text-sm w-fit">
            {post.category.name}
          </span>
          <Link href="/">
            <h1 className="text-white hover:text-primary duration-200 transition-colors font-semibold text-lg sm:text-xl lg:text-2xl truncate-lines-2 line-clamp-2">
              {post.heading}
            </h1>
          </Link>
          <p className="text-blue-gray-300 truncate-lines-3 line-clamp-3">
            {post.content}
          </p>
          <Link href="/" className="primary-btn w-fit">
            Read more
          </Link>
        </div>
        <span className="text-white flex items-center gap-2 text-sm">
          <FaRegClock />
          {formatDistanceToNow(post.createdAt, {
            addSuffix: true,
          })}
        </span>
      </div>
    </div>
  );
};

export default CardItem;
