import React, { useContext, useEffect, useState } from "react";
import { GameProduct } from "./Model/GameProduct";
import liff from "@line/liff";
import { ngrokDomain } from "./pathngrok/ngrokdomain";
import { User } from "./Model/User";
import { GetProfile } from "../App";
import "./custom.css";

type ModalProps = {
  handleToggleModal: () => void;
  product: GameProduct;
};

// * userId Uee534050cb274b81e66a9f0333932612

export default function Modal({ handleToggleModal, product }: ModalProps) {
  const liffId = "2005244347-lY246dm4";
  const liffurl = "https://liff.line.me/2005244347-lY246dm4";
  const dataLine = useContext<User | undefined>(GetProfile);
  const [isLoading, setisLoading] = useState(false);

  // !  ใช้เครื่องหมาย ? เพื่อเริ่มต้น query string และเราใช้ & เพื่อเชื่อมต่อแต่ละพารามิเตอร์
  //  * ตัวอย่าง  `http://localhost:8080/webhook/${dataLine?.userId}?_id=${product._id}&param1=value1&param2=value2`

  const sendMessageToLine = async () => {
    try {
      const response = await fetch(
        ngrokDomain + `/sent-gameproduct/${dataLine?.userId}`,
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
            // ! Bearer ต่อด้วย  [Channel access token] ของ messagesing api
            Authorization:
              "Bearer eCR3NwXUmzIqOq8HMYtuXooaWPDEBlszMMeF6BGoyRk4XpK2Ho89HV+hF0IUBuhsTRZYhWxLzRPFV6GyywHaaY7EL4t6uH8KgWUDTh4crPqW560gTHNJC98g+eStkQXgxKUO5StidnjRdPDxScYUHAdB04t89/1O/w1cDnyilFU=",
          },
          body: JSON.stringify({
            prod_id: product._id,
            prod_img: product.prod_img,
            prod_name: product.prod_name,
            prod_desc: product.prod_desc,
            prod_price: product.prod_price,
            url: liffurl,
          }),
        }
      );
      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }
      return await response.json();
    } catch (error) {
      throw error;
    }
  };

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
          sendMessageToLine();
          setInterval(() => {
            setisLoading(false);
            if (liff.getContext()?.type === "external")
              window.location.href = "user";
            else liff.closeWindow();
          }, 2000);
        }
      });
  };

  return (
    <div className="higher-bg">
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
                src={product.prod_img}
                alt="prod_img"
                className="w-full h-full object-cover mb-4 rounded-lg "></img>
            </div>
            <div className="detail md:w-7/12 lg:w-1/2   ">
              <h2 className="text-4xl text-center font-extarbold mb-4">
                {product.prod_name}
              </h2>
              <p>รายละเอียด</p>
              <p className="text-white mb-4">{product.prod_desc}</p>
              <p className="mb-4 text-red-800 text-lg font-extrabold line-through">
                ราคาเดิม {product.prod_price + product.prod_price * (50 / 100)}{" "}
                บาท
              </p>
              <p className="mb-4 text-green-400 text-2xl font-extrabold">
                ลดเหลือ {product.prod_price} บาท
              </p>
              <div className="buttonGroup flex md:flex-col-reverse md:text-start gap-x-6 justify-between w-full">
                <button
                  onClick={handleToggleModal}
                  className="w-1/2 md:w-full mt-4  text-lg md:text-2xl font-extrabold bg-red-500 hover:bg-red-600 text-white px-8 py-4 rounded-md">
                  ปิด
                </button>
                <button
                  onClick={logInBeforeBuy}
                  className="w-1/2 md:w-full mt-4 text-lg md:text-2xl font-extrabold bg-green-500 hover:bg-green-600 text-white px-8 py-4 rounded-md">
                  สั่งซื้อ
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
