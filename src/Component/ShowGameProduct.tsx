import React, { useState, useEffect } from 'react';

import Modal from './Modal';

import { GameProduct } from './Model/GameProduct';
import { ngrokDomain } from '../Component/pathngrok/ngrokdomain';

export default function ShowGameProduct() {
  const [gamedata, setGameData] = useState<GameProduct[]>([]);
  const [isDetail, setIsDetail] = useState<boolean>(false);
  const [selectedProduct, setSelectedProduct] = useState<GameProduct>();

  const handleToggleModal = (product?: GameProduct) => {
    setSelectedProduct(product);
    setIsDetail(!isDetail);
  };

  useEffect(() => {
    getGameProduct();
  }, []);

  const getGameProduct = () => {
    const myHeaders = new Headers();
    myHeaders.append('Content-Type', 'application/json');

    const requestOptions: RequestInit = {
      method: 'GET',
      headers: myHeaders,
      redirect: 'follow',
    };

    fetch(ngrokDomain + '/products/', requestOptions)
      .then((response: Response) => response.json())
      .then((result) => setGameData(result))
      .catch((error: Error) => console.error(error));
  };

  return (
    <div className="container  mx-auto p-4">
      <h1 
                   style={{
                    backgroundColor: 'rgb(104, 66, 255)',
                  }}
      className="text-3xl text-white text-center shadow-md p-4 rounded-lg  font-semibold mb-8 ">
        ยินดีต้อนรับสู่ GameProductShop
      </h1>
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">
        {/* GameProduct */}

        {gamedata.map((items, ind) => (
          <div
            key={ind}
            style={{backgroundColor:'#212233'}}
            className=" flex flex-col items-center justify-center text-white p-8 shadow-2xl border border-gray-200 rounded-lg w-11/12"
          >
            <img
              src={items.prod_img}
              alt="prod_img"
              className="h-48 w-48 object-cover mb-4 rounded-lg"
            ></img>
            <h3 className="text-lg font-semibold">{items.prod_name}</h3>
            <p>รายละเอียด</p>
            <p className="text-gray-500 truncate w-60 ">{items.prod_desc}</p>
            <p className="text-green-500">ราคา {items.prod_price} บาท</p>
            <button
              onClick={() => handleToggleModal(items)}
              className="mt-4 font-extrabold bg-violet-800 hover:bg-violet-700 text-white px-4 py-2 rounded-md"
            >
              รายละเอียดเพิ่มเติม
            </button>
          </div>
        ))}
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
