import React, { useState, useEffect, useContext } from "react";
import Modal from "./Modal";
import { GameInfo, Profile, SteamGame, Wishlist } from "../type/Items";
import {
  getHaveAppId,
  getFeatureGameSteam,
  getGameSteamById,
  getMemberById,
  updateUserWishlist,
  getAllAppId,
  deleteUserWishlistOneApp,
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

  const dataLine = useContext<Profile | null>(GetProfile);
  const [wishList, setWishList] = useState<Wishlist[]>([]);

  const handleToggleModal = (product?: GameInfo) => {
    setIsDetail(!isDetail);
    setSelectedProduct(product);
  };

  const get = async () => {
    const steamGame = (await getFeatureGameSteam()) || undefined;
    if (dataLine) {
      const newSteamGame = await checkAllHeart(steamGame);
      setGameSteam(newSteamGame);
    } else {
      setGameSteam(steamGame);
    }
  };

  // get info steam game before sent to favorite
  const getFavorites = async (appId: number) => {
    const info: Wishlist = await getGameSteamById(appId);

    const arrApp = await getHaveAppId(dataLine?.userId || "", appId);

    if (arrApp === undefined) {
      console.log("create");
      setWishList([...wishList, info]);
      const wishList1 = [...wishList, info];
      await updateWishlist(wishList1 as Wishlist[], dataLine?.userId || "");
    } else {
      // if มี appid ก็ไม่ต้องเพิ่ม ให้ลบ
      console.log(appId);
      await deleteUserWishlistOneApp(dataLine?.userId || "", appId.toString());
    }
  };

  const updateWishlist = async (info: Wishlist[], userId: string | "") => {
    const res = await updateUserWishlist(info, userId);
    console.log(res);
  };

  const getMemberId = async (userId: string) => {
    const info = await getMemberById(userId); //ข้อมูลของ user ใน userMember
    return info;
  };

  // 1.useeffect เพิ่ม check ว่ามี appid อะไรบ้างใน wihslist member ถ้ามีก็ไปเซตในตัวของ fav gamesteam  เป็น true
  const checkAllHeart = async (steamgame: SteamGame) => {
    const allApp = await getAllAppId(dataLine?.userId || "");

    // console.log(allApp);
    const appIdSet = new Set(allApp); // Set ช่วยให้ array ไม่เก็บค่าซ้ำ

    const newLargeCapsules = steamgame.large_capsules;

    // เปลี่ยนแปลงค่าของ fav ในข้อมูลเกม
    const newFeatured_win = steamgame?.featured_win.map((items) => {
      if (appIdSet.has(items.id)) {
        return { ...items, fav: true }; // เซ็ต fav เป็น true ถ้า appId อยู่ใน wishlist
      }
      return items;
    });
    const newFeatured_mac = steamgame?.featured_mac.map((items) => {
      if (appIdSet.has(items.id)) {
        return { ...items, fav: true }; // เซ็ต fav เป็น true ถ้า appId อยู่ใน wishlist
      }
      return items;
    });
    const newFeatured_linux = steamgame?.featured_linux.map((items) => {
      if (appIdSet.has(items.id)) {
        return { ...items, fav: true }; // เซ็ต fav เป็น true ถ้า appId อยู่ใน wishlist
      }
      return items;
    });

    return {
      large_capsules: newLargeCapsules,
      featured_win: newFeatured_win,
      featured_mac: newFeatured_mac,
      featured_linux: newFeatured_linux,
    };
  };

  useEffect(() => {
    get();

    if (dataLine) {
      getMemberId(dataLine?.userId || "").then((result) => {
        setWishList(result["wishList"]);
      });
    }

    // ใช้wishlist แล้วมันนำข้อมูล่าสุดมาให้ หลัง dom render เสร้จ useeffect  // ! ไปดูต่อคืนนี้ lifecycle
  }, [dataLine]);

  useEffect(() => {}, [gameSteam]);

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
                  items.fav = !items.fav;
                }}
                className={`absolute top-1 right-1 p-1`}>
                <FontAwesomeIcon
                  icon={items.fav ? solidHeart : regularHeart}
                  style={{ color: "red", fontSize: "30px" }}
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
                onClick={() => {
                  getFavorites(items.id);
                  items.fav = !items.fav;
                }}
                className={`absolute top-1 right-1 p-1`}>
                <FontAwesomeIcon
                  icon={items.fav ? solidHeart : regularHeart}
                  style={{ color: "red", fontSize: "30px" }}
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
                onClick={() => {
                  getFavorites(items.id);
                  items.fav = !items.fav;
                }}
                className={`absolute top-1 right-1 p-1`}>
                <FontAwesomeIcon
                  icon={items.fav ? solidHeart : regularHeart}
                  style={{ color: "red", fontSize: "30px" }}
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
