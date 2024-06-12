import React, { useState, useEffect, useContext } from "react";
import Modal from "./Modal";
import { GameInfo, SteamGame } from "../type/Items";
import { getFeatureGameSteam } from "../services/HttpMethod";
import { steamUrlGame } from "../services/ApiEndpoint";
import { Profile } from "../type/Items";
import { GetProfile } from "../App";

export default function ShowGameProduct() {
  const dataLine = useContext<Profile | null>(GetProfile);
  const [isDetail, setIsDetail] = useState<boolean>(false);
  const [selectedProduct, setSelectedProduct] = useState<GameInfo>();
  const [gameSteam, setGameSteam] = useState<SteamGame | undefined>(undefined);
  const [favorites, setFavorites] = useState<Set<number>>(new Set());
  const [searchQuery, setSearchQuery] = useState<string>("");

  const handleToggleModal = (product?: GameInfo) => {
    setIsDetail(!isDetail);
    setSelectedProduct(product);
  };

  async function get() {
    const steamGame = (await getFeatureGameSteam()) || undefined;
    setGameSteam(steamGame);
  }

  useEffect(() => {
    get();
  }, []);

  // const handleFavorite = (item: GameInfo) => {
  //     setFavorites(prev => {
  //         const newFavorites = new Set(prev);
  //         if (newFavorites.has(item.id)) {
  //             newFavorites.delete(item.id);
  //         } else {
  //             newFavorites.add(item.id);
  //         }
  //         return newFavorites;
  //     });
  // };

  // const favoriteGames = gameSteam?.featured_mac.filter(game => favorites.has(game.id));

  const handleSearchChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setSearchQuery(e.target.value);
  };

  const filteredGames = gameSteam?.featured_mac.filter((game) =>
    game.name.toLowerCase().includes(searchQuery.toLowerCase())
  );

  const deleteFav = (item: GameInfo) => {
    console.log("deleteFav:", item.id);
  };

  return (
    <div className="container mx-auto p-8">
      <h1
        style={{
          backgroundColor: "rgb(104, 66, 255)",
        }}
        className="text-3xl text-white text-center shadow-md p-4 rounded-lg font-semibold mb-8">
        สิ่งที่อยากได้ของ {dataLine?.displayName}
      </h1>
      <div className="mb-4">
        <input
          type="text"
          value={searchQuery}
          onChange={handleSearchChange}
          placeholder="ค้นหาเกมด้วยชื่อ"
          className="w-full p-2 border border-gray-300 rounded-lg"
        />
      </div>
      <div className="block block-cols-1 sm:block-cols-2 md:block-cols-3 lg:block-cols-4 xl:block-cols-5 place-items-center gap-8">
        {filteredGames?.map((items, ind) => (
          <div
            key={ind}
            className="flex flex-row items-start justify-center text-white p-4 shadow-2xl rounded-lg relative">
            <div className="image w-46 h-full flex justify-center items-center relative">
              <img
                src={items.large_capsule_image}
                alt="prod_img"
                onClick={() => handleToggleModal(items)}
                className="object-cover rounded-lg"></img>
            </div>
            <div
              style={{ backgroundColor: "#212233" }}
              className="details w-full h-full ml-4 flex flex-col justify-center items-center text-center p-[61px] rounded-lg relative">
              <button
                onClick={() => deleteFav(items)}
                className="absolute top-2 right-2 text-gray-400 underline">
                ลบออกจากสิ่งที่อยากได้
              </button>
              <h3 className="text-2xl font-semibold text-center">
                {items.name}
              </h3>
              {items.discount_percent === 0 ? (
                <p className="text-green-400 text-xl">
                  {items.original_price === 0 || items.original_price === null
                    ? "ฟรี"
                    : "ราคา " + items.original_price / 100}
                </p>
              ) : (
                <div className="flex flex-col">
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
        {/* เปิด modal */}
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
