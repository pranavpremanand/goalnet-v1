import { images } from "../constants";
import Image from "next/image";
import Link from "next/link";
import { FaRegClock } from "react-icons/fa";

const CardItem = ({ img, idx }) => {
  return (
    <div
      key={img}
      className={`grid grid-cols-1 md:grid-cols-[47%,50%] lg:grid-cols-[40%,45%] gap-5 md:border-none pb-5 ${
        images[idx + 1] && "border-b"
      }`}
    >
      <Link href="/">
        <Image
          src={img}
          alt=""
          width={1000}
          height={1000}
          className="w-full h-[40vh] sm:h-[48vh] md:h-[40vh] lg:h-[45vh] rounded-md object-center object-cover hover:brightness-[70%] duration-200 transition-all"
        />
      </Link>
      <div className="flex flex-col gap-3">
        <span className="text-white flex items-center gap-2 text-[.8rem]">
          <FaRegClock /> Just now
        </span>
        <Link href="/">
          <h1
            className="text-white hover:text-primary duration-200 transition-colors font-semibold text-lg sm:text-xl lg:text-2xl truncate-lines-2"
            style={{ WebkitLineClamp: 2 }}
          >
            {
              "It's been 12 years since Leo Messi went off against Bayer Leverkusen ⚽⚽⚽⚽⚽ The first player in UCL history to score five goals in a single game, then Luiz Adriano and Erling Haaland followed suit ✋"
            }
          </h1>
        </Link>
        <p
          className="text-blue-gray-300 text-md truncate-lines-3 line-clamp-3"
          // style={{ WebkitLineClamp: 4 }}
        >
          {
            "It's been 12 years since Leo Messi went off against Bayer Leverkusen ⚽⚽⚽⚽⚽ The first player in UCL history to score five goals in a single game, then Luiz Adriano and Erling Haaland followed suit ✋It's been 12 years since Leo Messi went off against Bayer Leverkusen ⚽⚽⚽⚽⚽ The first player in UCL history to score five goals in a single game, then Luiz Adriano and Erling Haaland followed suit ✋"
          }
        </p>
        <button className="primary-btn w-fit">Read more</button>
      </div>
    </div>
  );
};

export default CardItem;
