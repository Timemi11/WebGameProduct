import React, { useState, useEffect } from "react";
import Modal from "./Modal";
import { GameInfo, SteamGame } from "../type/Items";
import { getFeatureGameSteam } from "../services/HttpMethod";
import { steamUrlGame } from "../services/ApiEndpoint";

export default function ShowGameProduct() {
  const [isDetail, setIsDetail] = useState<boolean>(false);
  const [selectedProduct, setSelectedProduct] = useState<GameInfo>();
  const [gameSteam, setGameSteam] = useState<SteamGame | undefined>(undefined);
  const handleToggleModal = (product?: GameInfo) => {
    setSelectedProduct(product);
    setIsDetail(!isDetail);
  };

  async function get() {
    const steamGame = (await getFeatureGameSteam()) || undefined;
    setGameSteam(steamGame);
  }
  console.log(gameSteam);

  useEffect(() => {
    get();
  }, []);

  return (
    <div className=" container mx-auto p-8 ">
      <h1
        style={{
          backgroundColor: "rgb(104, 66, 255)",
        }}
        className="text-3xl text-white text-center shadow-md p-4 rounded-lg  font-semibold mb-8 ">
        เกมของเรา
      </h1>
      <div className="image-big featured_win w-full ">
        <a
          className="w-full "
          href={`${steamUrlGame} ${gameSteam?.featured_win[0].id}`}>
          <img
            src={gameSteam?.featured_win[0].large_capsule_image}
            alt="steamgame"
            className="w-7/12 object-cover rounded-lg"
          />
        </a>
      </div>
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 place-items-center gap-8 ">
        {/* GameProduct */}
        {gameSteam?.featured_mac.map((items, ind) => (
          <div
            key={ind}
            className=" flex flex-col items-center justify-center text-white p-4 shadow-2xl rounded-lg ">
            <div className="image w-46 h-full mb-4 flex justify-center items-center">
              <img
                src={items.large_capsule_image}
                alt="prod_img"
                onClick={() => handleToggleModal(items)}
                className="object-cover rounded-lg"></img>
            </div>
            <div
              style={{ backgroundColor: "#212233" }}
              className="details w-full h-full flex flex-col justify-center items-center text-center p-4 rounded-lg">
              <h3 className="text-2xl font-semibold text-center ">
                {items.name}
              </h3>

              {items.discount_percent === 0 ? (
                <p className="text-green-400 text-xl">
                  {items.original_price === 0 || items.original_price === null
                    ? "ฟรี"
                    : "ราคา " + items.original_price / 100}
                </p>
              ) : (
                <div className="flex flex-col ">
                  <p className="text-red-700 line-through">
                    ราคาเดิม {items.original_price / 100} บาท
                  </p>
                  <p className="text-green-400 text-xl">
                    ลดเหลือ {(items.final_price / 100).toFixed(0)} บาท
                  </p>
                </div>
              )}

              <button
                // onClick={() => handleToggleModal(items)}
                className="mt-4 font-extrabold bg-violet-800 hover:bg-violet-700 text-white px-4 py-2 rounded-md">
                รายละเอียดเพิ่มเติม
              </button>
            </div>
          </div>
        ))}
        {/*  เปิด modal */}
        {isDetail && selectedProduct && (
          <Modal
            handleToggleModal={handleToggleModal}
            product={selectedProduct}
          />
        )}
        {/* End GameProduct */}
      </div>
    </div>
  );
}
