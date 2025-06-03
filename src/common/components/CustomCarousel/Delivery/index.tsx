"use client";
import Slider from "react-slick";
import { FC } from "react";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import { CustomCarouselProps } from "./interface";
import CustomArrow from "../components/CustomArrow/Delivery";
//import SmallCardAntd from "../../Cards/SmallCardAntd/Delivery";
import SmallCardTailwind from "../../Cards/SmallCardTailwind/Delivery";

const CustomCarousel: FC<CustomCarouselProps> = ({ items }) => {
  const settings = {
    arrows: true,
    centerMode: true,
    centerPadding: "20px",
    dots: true,
    infinite: true,
    speed: 500,
    slidesToShow: 3,
    slidesToScroll: 1,
    nextArrow: <CustomArrow direction="right" />,
    prevArrow: <CustomArrow direction="left" />,
    responsive: [
      { breakpoint: 1024, settings: { slidesToShow: 2 } },
      { breakpoint: 768, settings: { slidesToShow: 1, centerMode: false } },
    ],
  };

  return (
    <div className="relative px-2 sm:px-4 md:px-6 py-6 h-[34vh] md:mb-10">
      <style>{`
        .slick-prev::before, .slick-next::before {
          display: none;
        }
        .custom-slick-arrow {
          display: flex;
          opacity: 1;
        }
        .slick-disabled .custom-slick-arrow {
          opacity: 0.5;
          cursor: not-allowed;
        }
        .slick-slide {
          display: flex;
          align-items: center;
          height: 100%;
        }
        .slick-slide > div {
          display: flex;
          height: 100%;
        }
      `}</style>

      <Slider {...settings}>
        {items.map((item, index) => (
          <div key={index} className="px-2">
            <SmallCardTailwind {...item} />
          </div>
        ))}
      </Slider>
    </div>
  );
};

export default CustomCarousel;
