"use client";
import Image from "next/image";
import { useKeenSlider } from "keen-slider/react";
import { useState } from "react";
import { FaRegClock } from "react-icons/fa";
import { formatDistanceToNow } from "date-fns";
import Link from "next/link";
import useSWR from "swr";
import { fetcher } from "@/apiCalls";
import SmallLoader from "./SmallLoader";

const Banner = () => {
  const [opacities, setOpacities] = useState([]);
  const [sliderRef] = useKeenSlider(
    {
      initial: 0,
      loop: true,
      slides: {
        origin: "center",
        perView: 1,
      },
    },
    [
      (slider) => {
        let timeout;
        let mouseOver = false;
        function clearNextTimeout() {
          clearTimeout(timeout);
        }
        function nextTimeout() {
          clearTimeout(timeout);
          if (mouseOver) return;
          timeout = setTimeout(() => {
            slider.next();
          }, 2000);
        }
        slider.on("created", () => {
          slider.container.addEventListener("mouseover", () => {
            mouseOver = true;
            clearNextTimeout();
          });
          slider.container.addEventListener("mouseout", () => {
            mouseOver = false;
            nextTimeout();
          });
          nextTimeout();
        });
        slider.on("dragStarted", clearNextTimeout);
        slider.on("animationEnded", nextTimeout);
        slider.on("updated", nextTimeout);
      },
    ]
  );

  // get banners
  const { data, error, mutate } = useSWR(
    {
      url: "/api/banners",
    },
    fetcher,
    { revalidateOnFocus: true }
  );

  if (error) {
    return (
      <div className="wrapper grow flex items-center justify-center flex-col gap-2">
        <p className="text-2xl">Failed to load data. Try reloading the page</p>
        <a className="secondary-btn" href="/">
          Reload
        </a>
      </div>
    );
  }
  if (!data) {
    return (
      <div className="w-screen h-[40vh] sm:h-[55vh] md:h-[85vh] bg-blue-gray-50/5">
        <SmallLoader />
      </div>
    );
  }

  
    let { banners } = data;

  

  if (banners.length === 0) return null;

  return (
    <section className="flex flex-col items-center" id="home">
      <div ref={sliderRef} className="keen-slider">
        {banners.map((banner, i) => (
          <div
            key={i}
            className="keen-slider__slide relative"
            style={{ backgroundImage: `url(${banner.image})` }}
          >
            <Image
              src={banner.image}
              width={1000}
              height={1000}
              alt="post"
              className="w-full h-[40vh] sm:h-[55vh] md:h-[85vh] object-cover md:object-contain brightness-[65%] backdrop-blur-2xl"
              style={{ opacity: opacities[i] }}
            />
            <div className="wrapper absolute left-1/2 -translate-x-1/2 top-1/2 -translate-y-1/2 flex flex-col gap-2 md:gap-3">
              <span className="text-blue-gray-50 flex items-center gap-2 rounded-sm text-sm">
                <FaRegClock />
                {formatDistanceToNow(banner.createdAt, {
                  addSuffix: true,
                })}
              </span>
              <span className="bg-blue-500 text-blue-gray-50 px-2 py-[.2rem] rounded-sm text-sm w-fit">
                {banner.category.name}
              </span>
              <h1 className="text-blue-gray-50 font-bold text-xl sm:text-3xl lg:text-5xl max-w-[96%] sm:max-w-[70%] lg:max-w-[75%] truncate-lines-2 line-clamp-3">
                {banner.content}
              </h1>
              <Link href={`/${banner._id}`} className="primary-btn w-fit mt-2 md:mt-4">
                Read More
              </Link>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
};

export default Banner;
