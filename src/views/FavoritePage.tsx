import React, { useState, useEffect, useContext } from "react";
import Modal from "../components/FavPageModal";
import {
  deleteUserWishlistOneApp,
  getWishListApp,
} from "../services/HttpMethod";
import { Profile, DatainWishlists } from "../type/Items";
import { GetProfile } from "../App";

export default function ShowGameProduct() {
  const dataLine = useContext<Profile | null>(GetProfile);
  const [isDetail, setIsDetail] = useState<boolean>(false);
  const [selectedProduct, setSelectedProduct] = useState<DatainWishlists>();
  const [searchQuery, setSearchQuery] = useState<string>("");
  const [favGame, setFavGame] = useState<DatainWishlists[]>([]);

  const fhandleToggleModal = (fproduct?: DatainWishlists) => {
    setIsDetail(!isDetail);
    setSelectedProduct(fproduct);
  };

  async function get() {
    const myWishList = await getWishListApp(dataLine?.userId || "");
    console.log(dataLine?.userId);
    console.log(myWishList);
    if (myWishList) {
      // Check if myWishList is an array or a single object
      if (Array.isArray(myWishList)) {
        setFavGame(myWishList); // If myWishList is already an array
      } else {
        setFavGame([myWishList]); // Wrap myWishList in an array if it's a single object
      }
      console.log(myWishList);
    } else {
      console.error("Failed to fetch wishlist data.");
    }
  }

  useEffect(() => {
    get();
  }, [dataLine]);

  const handleSearchChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setSearchQuery(e.target.value);
  };

  const filteredGames = favGame?.filter((game) =>
    game.name.toLowerCase().includes(searchQuery.toLowerCase())
  );

  const deleteFav = async (item: DatainWishlists) => {
    console.log("deleteFav:", item.appId);
    const appId = String(item.appId);
    await deleteUserWishlistOneApp(dataLine?.userId || "", appId);
    window.location.reload();
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
          className="w-full h-full p-2 border border-gray-300 rounded-lg"
        />
      </div>
      <div className="block block-cols-1 sm:block-cols-2 md:block-cols-3 lg:block-cols-4 xl:block-cols-5 place-items-center gap-8">
        {filteredGames?.map((items, ind) => (
          <div
            key={ind}
            className="flex flex-col sm:flex-row sm:items-start sm:justify-center text-white p-4 shadow-2xl rounded-lg relative">
            <div className="image w-46 h-full flex justify-center items-center relative">
              <img
                src={items.image}
                alt="prod_img"
                onClick={() => fhandleToggleModal(items)}
                className="object-cover rounded-lg"></img>
            </div>
            <div
              style={{ backgroundColor: "#212233" }}
              className="details w-full h-full flex flex-col justify-center items-center text-center p-[22px] rounded-lg relative">
              <button
                onClick={() => deleteFav(items)}
                className="absolute top-2 right-2 text-red-600 underline">
                ลบออกจากสิ่งที่อยากได้
              </button>
              <div className="textfield mt-4 sm:mt-0">
                <h3 className="text-2xl font-semibold text-center">
                  {items.name}
                </h3>
                <p className="text-green-400 text-xl">
                  {items.price.formattedPrice}
                </p>
                <button
                  onClick={() => fhandleToggleModal(items)}
                  className="mt-4 font-extrabold bg-violet-800 hover:bg-violet-700 text-white px-4 py-2 rounded-md">
                  รายละเอียด
                </button>
              </div>
            </div>
          </div>
        ))}
        {/* เปิด modal */}
        {isDetail && selectedProduct && (
          <Modal
            handleToggleModal={fhandleToggleModal}
            product={selectedProduct}
          />
        )}
        {/* End GameProduct */}
      </div>
    </div>
  );
}