import React from "react";
import { Swiper, SwiperSlide } from "swiper/react";
import SwiperCore, { Navigation, Pagination, Autoplay } from "swiper";
import { SteamGame } from "../type/Items";

import "swiper/css";
import "swiper/css/navigation";
import "swiper/css/pagination";
import "../assets/Pagination.css";

SwiperCore.use([Navigation, Pagination, Autoplay]);

const GameCarousel = ({
  gameSteam,
  steamUrlGame,
}: {
  gameSteam: SteamGame | undefined;
  steamUrlGame: string;
}) => {
  return (
    <div
      className="carousel flex overflow-auto"
      style={{
        zIndex: "-999",
      }}>
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
                  className="w-full h-full object-contain sm:object-cover rounded-lg"
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
