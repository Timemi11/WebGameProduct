import React, { useState, useEffect } from "react";

import Modal from "./Modal";

import { GameProduct } from "../type/items";
import { getGameProduct } from "../service/fectch";

export default function ShowGameProduct() {
  const [gamedata, setGameData] = useState<GameProduct[]>([]);
  const [isDetail, setIsDetail] = useState<boolean>(false);
  const [selectedProduct, setSelectedProduct] = useState<GameProduct>();

  const handleToggleModal = (product?: GameProduct) => {
    setSelectedProduct(product);
    setIsDetail(!isDetail);
  };

  async function get() {
    const data = await getGameProduct();
    setGameData(data);
  }

  useEffect(() => {
    get();
  }, []);

  return (
    <div className=" container mx-auto p-4 ">
      <h1
        style={{
          backgroundColor: "rgb(104, 66, 255)",
        }}
        className="text-3xl text-white text-center shadow-md p-4 rounded-lg  font-semibold mb-8 ">
        สินค้าของเรา
      </h1>

      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 place-items-center gap-8 ">
        {/* GameProduct */}
        {gamedata.map((items, ind) => (
          <div
            key={ind}
            className=" flex flex-col items-center justify-center text-white p-4 shadow-2xl rounded-lg ">
            <div className="image w-46 h-full mb-4 flex justify-center items-center">
              <img
                src={items.prod_img}
                alt="prod_img"
                onClick={() => handleToggleModal(items)}
                className="object-cover rounded-lg"></img>
            </div>
            <div
              style={{ backgroundColor: "#212233" }}
              className="details w-full h-full flex flex-col justify-center items-center text-center p-4 rounded-lg">
              <h3 className="text-2xl font-semibold text-center ">
                {items.prod_name}
              </h3>
              <div className="flex flex-col ">
                <p className="text-red-700 line-through">
                  ราคาเดิม {items.prod_price + items.prod_price * (50 / 100)}{" "}
                  บาท
                </p>
                <p className="text-green-400 text-xl">
                  ลดเหลือ {items.prod_price} บาท
                </p>
              </div>
              <button
                onClick={() => handleToggleModal(items)}
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
