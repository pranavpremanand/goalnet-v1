"use client";
import Image from "next/image";
import { useKeenSlider } from "keen-slider/react";
import { useState } from "react";
import { FaRegClock } from "react-icons/fa";
import { formatDistanceToNow } from "date-fns";
import Link from "next/link";
import { getBanners } from "@/apiCalls";
import SmallLoader from "./SmallLoader";
import { useQuery } from "@tanstack/react-query";

const Banner = () => {
  const [opacities, setOpacities] = useState([]);
  let banners = [];
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
  const { data, error, isLoading } = useQuery({
    queryKey: ["banners"],
    queryFn: async () => {
      const response = await getBanners();
      return response.json();
    },

    revalidateOnFocus: true,
  });

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

  if (isLoading) {
    return (
      <div className="w-screen h-[65vh] md:h-[85vh] bg-blue-gray-50/5">
        <SmallLoader />
      </div>
    );
  }

  banners = data.banners;

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
              className="w-full h-[65vh] md:h-[85vh] object-cover object-top md:object-center md:object-contain brightness-[68%] backdrop-blur-3xl"
              style={{ opacity: opacities[i] }}
            />
            <div className="wrapper absolute left-1/2 -translate-x-1/2 top-2/3 sm:top-1/2 -translate-y-[40%] sm:-translate-y-[30%] lg:-translate-y-1/4 flex flex-col gap-2 md:gap-3">
              <span className="text-blue-gray-50 flex items-center gap-2 rounded-sm text-[.8rem]">
                <FaRegClock />
                {formatDistanceToNow(banner.createdAt, {
                  addSuffix: true,
                })}
              </span>
              <div className="flex max-w-lg gap-2 truncate line-clamp-1">
                {banner.categories.map((category) => (
                  <span
                    key={category._id}
                    className="bg-blue-500 text-blue-gray-50 px-2 py-[.2rem] rounded-sm text-[.8rem] sm:text-sm w-fit leading-5"
                  >
                    {category.name}
                  </span>
                ))}
              </div>
              <h1 className="text-blue-gray-50 font-bold text-xl sm:text-3xl lg:text-5xl max-w-[96%] sm:max-w-[70%] lg:max-w-[75%] truncate-lines-2 line-clamp-2 sm:line-clamp-3">
                {banner.heading}
              </h1>
              <Link
                href={`/${banner._id}`}
                className="primary-btn w-fit mt-2 md:mt-4"
              >
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
