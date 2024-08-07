import React, { useContext, useState } from "react";
import liff from "@line/liff";
import { GameInfo, Profile, DatainWishlists } from "../type/Items";
import "../assets/Home.css";
import "../assets/Loading.css";
import { sendMessageToLine } from "../services/HttpMethod";
import { GetProfile } from "../App";

// !  ใช้เครื่องหมาย ? เพื่อเริ่มต้น query string และเราใช้ & เพื่อเชื่อมต่อแต่ละพารามิเตอร์
//  * ตัวอย่าง  `http://localhost:8080/webhook/${dataLine?.userId}?_id=${product._id}&param1=value1&param2=value2`

// * userId Uee534050cb274b81e66a9f0333932612

export default function Modal({
  handleToggleModal,
  product,
}: {
  handleToggleModal: () => void;
  product: GameInfo;
}) {
  const liffId = "2005244347-lY246dm4";
  const liffurl = "https://liff.line.me/2005244347-lY246dm4";
  const [isLoading, setisLoading] = useState(false);
  const proflie = useContext<Profile | null>(GetProfile);

  const logInBeforeBuy = () => {
    liff
      .init({
        liffId: liffId,
      })
      .then(() => {
        if (!liff.isLoggedIn()) {
          liff.login();
        } else {
          setisLoading(true); //ตั้งเวลา loading เมื่อกดสั่งซื้อ
          sendMessageToLine(product, liffurl, proflie?.userId);
          setInterval(() => {
            //loadingเสร็จ ประมาณ 2 วินาที
            setisLoading(false);
            if (liff.getContext()?.type === "external") {
              window.location.reload();
            } else liff.closeWindow();
          }, 2000);
        }
      });
  };

  return (
    <div className="higher-bg " style={{ zIndex: 999 }}>
      {!isLoading ? (
        <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50">
          <div
            className="overflow-y-auto text-white flex flex-col md:flex-row items-center p-8 rounded-lg  max-w-lg gap-8 md:max-w-4xl w-full "
            style={{
              maxHeight: "-webkit-fill-available",
              backgroundColor: "#212233",
              scrollbarWidth: "thin",
              scrollbarColor: "#AAADBE #6842ff",
            }}>
            <div className="imageModal md:w-5/12 lg:w-1/2 ">
              <img
                src={product.large_capsule_image}
                alt="prod_img"
                className="w-full h-full object-cover mb-4 rounded-lg "></img>
            </div>
            <div className="detail md:w-7/12 lg:w-1/2   ">
              <h2 className="text-4xl text-center font-extarbold mb-4">
                {product.name}
              </h2>
              {product.discount_percent === 0 ? (
                <p className="mb-4 text-green-400 text-2xl font-extrabold">
                  {product.original_price === 0 ||
                  product.original_price === null
                    ? "ฟรี"
                    : "ราคา " + product.original_price / 100}
                </p>
              ) : (
                <>
                  <p className="mb-4 text-red-800 text-lg font-extrabold line-through">
                    ราคาเดิม {product.original_price / 100} บาท
                  </p>
                  <p className="mb-4 text-green-400 text-2xl font-extrabold">
                    ลดเหลือ {(product.final_price / 100).toFixed(0)} บาท
                  </p>
                </>
              )}
              <div className="buttonGroup flex md:flex-col-reverse md:text-start gap-x-6 justify-between w-full">
                <button
                  onClick={handleToggleModal}
                  className="w-1/2 md:w-full mt-4  text-lg md:text-2xl font-extrabold bg-red-500 hover:bg-red-600 text-white px-8 py-4 rounded-md">
                  ปิด
                </button>
                <button
                  onClick={logInBeforeBuy}
                  className="w-1/2 md:w-full mt-4 text-lg md:text-2xl font-extrabold bg-green-500 hover:bg-green-600 text-white px-8 py-4 rounded-md">
                  เลือกดู
                </button>
              </div>
            </div>
          </div>
        </div>
      ) : (
        <div
          style={{ backgroundColor: "#212233" }}
          className="text-white font-extrabold fixed inset-0 flex flex-col gap-y-8 items-center justify-center">
          <div className="custom-loader"></div>
          <h1>LOADING...</h1>
        </div>
      )}
    </div>
  );
}
