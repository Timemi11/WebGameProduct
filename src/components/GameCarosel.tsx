import React from "react";
import { Swiper, SwiperSlide } from "swiper/react";
import SwiperCore, { Navigation, Pagination, Autoplay } from "swiper";
import { SteamGame } from "../type/Items";

import "swiper/css";
import "swiper/css/navigation";
import "swiper/css/pagination";
import "../assets/Pagination.css";

SwiperCore.use([Navigation, Pagination, Autoplay]);

type CarouselProps = {
  gameSteam: SteamGame | undefined;
  steamUrlGame: string;
};

const GameCarousel = ({ gameSteam, steamUrlGame }: CarouselProps) => {
  return (
    <div className="carousel flex overflow-auto">
      <Swiper
        spaceBetween={10}
        slidesPerView={1}
        navigation
        loop={true}
        pagination={{ clickable: true }}
        scrollbar={{ draggable: true }}
        autoplay={{ delay: 3000, disableOnInteraction: false }}
        className="w-full h-full ">
        {gameSteam?.featured_win.map((items) => (
          <SwiperSlide key={items.id}>
            <div className="image-big featured_win w-full h-dvh sm:h-90  flex justify-center items-center">
              <a className="w-full h-full" href={`${steamUrlGame}${items.id}`}>
                <img
                  src={items.large_capsule_image}
                  alt="steamgame"
                  className="w-full h-full object-cover rounded-lg"
                />
              </a>
            </div>
          </SwiperSlide>
        ))}
      </Swiper>
    </div>
  );
};

export default GameCarousel;
