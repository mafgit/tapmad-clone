'use client'
import { Swiper, SwiperSlide } from "swiper/react";
import "swiper/css";
import ICard from "@/app/models/ICard";
import SliderCard from "./SliderCard";
import "swiper/css/navigation";
import { FaChevronLeft, FaChevronRight } from "react-icons/fa6";
import { Navigation, Autoplay } from "swiper/modules";

const Slider = ({ cards }: { cards: ICard[] }) => {
  return (
    <div className="mb-6 relative">
      {cards.length ? (
        <>
          <div className="perspective-distant absolute top-1/2 left-[10px] z-10 -translate-y-1/2">
            <button className="slider-prev-btn flex justify-center items-center w-[40px] h-[40px] bg-black/60 text-xl rounded-full cursor-pointer ">
              <FaChevronLeft />
            </button>
          </div>
          <Swiper
            modules={[Navigation, Autoplay]}
            slidesPerView={3}
            spaceBetween={10}
            className="w-[105vw] relative left-[-2.5vw]"
            pagination={{ clickable: true }}
            navigation={{
              nextEl: ".slider-next-btn",
              prevEl: ".slider-prev-btn",
            }}
            centeredSlides={true}
            autoplay={{ delay: 3000, disableOnInteraction: false }}
            loop={true}
            initialSlide={0}
          >
            {cards.map((card: ICard, card_i: number) => (
              <SwiperSlide key={"slide-" + card_i}>
                {({ isActive }) => <SliderCard card={card} active={isActive} />}
              </SwiperSlide>
            ))}
          </Swiper>
          <div className="absolute top-1/2 right-[10px] z-10 -translate-y-1/2">
            <button className="slider-next-btn flex justify-center items-center w-[40px] h-[40px] bg-black/60 text-xl rounded-full cursor-pointer ">
              <FaChevronRight />
            </button>
          </div>
        </>
      ) : (
        ""
      )}
    </div>
  );
};

export default Slider;
