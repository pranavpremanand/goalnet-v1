"use client";
import Image from "next/image";
import { useKeenSlider } from "keen-slider/react";
import { useState } from "react";
import { FaRegClock } from "react-icons/fa";
import { formatDistanceToNow } from "date-fns";

const Banner = ({ banners }) => {
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

  if (banners.length === 0) return null;

  return (
    <section className="flex flex-col items-center" id="home">
      <div ref={sliderRef} className="keen-slider" id="home">
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
              className="w-full h-[60vh] sm:h-[55vh] md:h-[85vh] object-contain brightness-[70%] backdrop-blur-3xl"
              style={{ opacity: opacities[i] }}
            />
            <div className="wrapper absolute sm:left-10 top-[45%] flex flex-col gap-2 md:gap-3 items-start">
              <span className="text-white flex items-center gap-2 rounded-sm text-[.9rem]">
                <FaRegClock />
                {formatDistanceToNow(banner.createdAt, {
                  addSuffix: true,
                })}
              </span>
              <span className="bg-blue-500 text-white px-2 py-[.2rem] rounded-sm text-[.9rem]">
                {banner.category.name}
              </span>
              <h1 className="text-white font-bold text-2xl sm:text-3xl lg:text-5xl max-w-[96%] sm:max-w-[70%] lg:max-w-[75%] truncate-lines-2 line-clamp-3">
                {banner.content}
              </h1>
              <button className="primary-btn w-fit mt-2 md:mt-4">
                Read More
              </button>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
};

export default Banner;
