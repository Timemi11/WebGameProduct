import React, { useState, useEffect, useContext } from "react";
import Modal from "./Modal";
import { GameInfo, Profile, SteamGame, Wishlist } from "../type/Items";
import {
  getFeatureGameSteam,
  getGameSteamById,
  getMemberById,
  updateUserWishlist,
} from "../services/HttpMethod";
import { steamUrlGame } from "../services/ApiEndpoint";
import GameCarousel from "./GameCarosel";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faHeart as solidHeart } from "@fortawesome/free-solid-svg-icons";
import { faHeart as regularHeart } from "@fortawesome/free-regular-svg-icons";
import { GetProfile } from "../App";

export default function ShowGameProduct() {
  const [isDetail, setIsDetail] = useState<boolean>(false);
  const [selectedProduct, setSelectedProduct] = useState<GameInfo>();
  const [gameSteam, setGameSteam] = useState<SteamGame | undefined>(undefined);
  const [favorites, setFavorites] = useState<Set<number>>(new Set());
  const dataLine = useContext<Profile | null>(GetProfile);
  const [wishList, setWishList] = useState();

  const handleToggleModal = (product?: GameInfo) => {
    setIsDetail(!isDetail);
    setSelectedProduct(product);
  };

  async function get() {
    const steamGame = (await getFeatureGameSteam()) || undefined;
    setGameSteam(steamGame);
  }

  // get info steam game before sent to favorite
  async function getFavorites(appId: number) {
    const info = await getGameSteamById(appId);

    getMemberId(dataLine?.userId || "").then((result) => {
      setWishList(result["wishList"]);
    });

    console.log(wishList);

    // await updateWishlist(info as Wishlist, dataLine?.userId || "");
    // console.log("info");
    // console.log(info);
    // console.log("steamItems");
    // console.log(steamItems);
  }

  async function updateWishlist(info: Wishlist, userId: string | "") {
    const res = await updateUserWishlist(info, userId);
    console.log(res);
  }

  async function getMemberId(userId: string) {
    const info = await getMemberById(userId); //ข้อมูลของ user ใน userMember
    return info;
  }

  useEffect(() => {
    get();
  }, [dataLine]);

  // const handleFavorites = (item: GameInfo) => {
  //   console.log("Favorited:", item.id);
  //   setFavorites((prev) => {
  //     const newFavorites = new Set(prev);
  //     if (newFavorites.has(item.id)) {
  //       newFavorites.delete(item.id);
  //     } else {
  //       newFavorites.add(item.id);
  //     }
  //     console.log("Set:", newFavorites);
  //     return newFavorites;
  //   });
  // };

  return (
    <div className=" container mx-auto p-8 ">
      <h1
        style={{
          backgroundColor: "rgb(104, 66, 255)",
        }}
        className="text-3xl text-white text-center shadow-md p-4 rounded-lg  font-semibold mb-8 ">
        เกมแนะนำ
      </h1>
      <GameCarousel gameSteam={gameSteam} steamUrlGame={steamUrlGame} />
      <h1
        style={{
          backgroundColor: "rgb(104, 66, 255)",
        }}
        className="text-3xl text-white text-center shadow-md p-4 rounded-lg  font-semibold my-8 ">
        เกมแนะนำทางฝั่ง WINDOW
      </h1>
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 place-items-center gap-8 ">
        {gameSteam?.featured_win.map((items, ind) => (
          <div
            key={ind}
            className=" flex flex-col items-center justify-center text-white p-4 shadow-2xl rounded-lg ">
            <div className="image w-46 h-full mb-4 flex justify-center items-center relative">
              <img
                src={items.large_capsule_image}
                alt="prod_img"
                onClick={() => handleToggleModal(items)}
                className="object-cover rounded-lg"></img>

              <button
                onClick={() => {
                  getFavorites(items.id);
                }}
                className={`absolute top-1 right-1 p-1`}>
                <FontAwesomeIcon
                  icon={favorites.has(items.id) ? solidHeart : regularHeart}
                  style={{ color: "red" }}
                />
              </button>
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
                onClick={() => handleToggleModal(items)}
                className="mt-4 font-extrabold bg-violet-800 hover:bg-violet-700 text-white px-4 py-2 rounded-md">
                รายละเอียด
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
      <h1
        style={{
          backgroundColor: "rgb(104, 66, 255)",
        }}
        className="text-3xl text-white text-center shadow-md p-4 rounded-lg  font-semibold my-8 ">
        เกมแนะนำทางฝั่ง LINUX
      </h1>
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 place-items-center gap-8 ">
        {gameSteam?.featured_linux.map((items, ind) => (
          <div
            key={ind}
            className=" flex flex-col items-center justify-center text-white p-4 shadow-2xl rounded-lg relative">
            <div className="image w-46 h-full mb-4 flex justify-center items-center relative">
              <img
                src={items.large_capsule_image}
                alt="prod_img"
                onClick={() => handleToggleModal(items)}
                className="object-cover rounded-lg "></img>

              <button
                onClick={() => getFavorites(items.id)}
                className={`absolute top-1 right-1 p-1`}>
                <FontAwesomeIcon
                  icon={favorites.has(items.id) ? solidHeart : regularHeart}
                  style={{ color: "red" }}
                />
              </button>
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
                onClick={() => handleToggleModal(items)}
                className="mt-4 font-extrabold bg-violet-800 hover:bg-violet-700 text-white px-4 py-2 rounded-md">
                รายละเอียด
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
      <h1
        style={{
          backgroundColor: "rgb(104, 66, 255)",
        }}
        className="text-3xl text-white text-center shadow-md p-4 rounded-lg  font-semibold my-8 ">
        เกมแนะนำทางฝั่ง MAC
      </h1>
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 place-items-center gap-8 ">
        {gameSteam?.featured_mac.map((items, ind) => (
          <div
            key={ind}
            className=" flex flex-col items-center justify-center text-white p-4 shadow-2xl rounded-lg relative">
            <div className="image w-46 h-full mb-4 flex justify-center items-center relative">
              <img
                src={items.large_capsule_image}
                alt="prod_img"
                onClick={() => handleToggleModal(items)}
                className="object-cover rounded-lg"></img>
              <button
                onClick={() => getFavorites(items.id)}
                className={`absolute top-1 right-1 p-1`}>
                <FontAwesomeIcon
                  icon={favorites.has(items.id) ? solidHeart : regularHeart}
                  style={{ color: "red" }}
                />
              </button>
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
                onClick={() => handleToggleModal(items)}
                className="mt-4 font-extrabold bg-violet-800 hover:bg-violet-700 text-white px-4 py-2 rounded-md">
                รายละเอียด
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
