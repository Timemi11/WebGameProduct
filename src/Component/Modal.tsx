import React, { useContext, useEffect } from 'react';
import { GameProduct } from './Model/GameProduct';
import liff from '@line/liff';



type ModalProps = {
  handleToggleModal: () => void;
  product: GameProduct;
};

export default function Modal({ handleToggleModal, product }: ModalProps) {
  const liffId = '2005244347-lY246dm4';

  // userId Uee534050cb274b81e66a9f0333932612

  const sendMessageToLine = async () => {
    try {
      const response = await fetch("https://api.line.me/v2/bot/message/push", {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          // Bearer ต่อด้วย  Channel access token ของ messagesing api
          Authorization:
            'Bearer eCR3NwXUmzIqOq8HMYtuXooaWPDEBlszMMeF6BGoyRk4XpK2Ho89HV+hF0IUBuhsTRZYhWxLzRPFV6GyywHaaY7EL4t6uH8KgWUDTh4crPqW560gTHNJC98g+eStkQXgxKUO5StidnjRdPDxScYUHAdB04t89/1O/w1cDnyilFU=',
        },
        body: JSON.stringify({
          // to : userId
          to: 'Uee534050cb274b81e66a9f0333932612',
          messages: [
            {
              type: 'text',
              text: 'ส่งข้อความ',
            },
          ],
        }),
      });

      if (response.ok) {
        alert('Message sent successfully');
      } else {
        alert('Failed to send message');
      }
    } catch (error) {
      console.error('Failed to send message:', error);
      alert('Failed to send message');
    }
  };

  const logInBeforeBuy = () => {
      liff
        .init({
          liffId: liffId,
        })
        .then(() => {
          if(!liff.isLoggedIn()){
            liff.login();
          }else{
            sendMessageToLine()
          }
           });
  };

  return (
    <div  
      className=" fixed inset-0 flex items-center justify-center bg-black bg-opacity-50">
      <div
        className="overflow-y-auto text-white flex flex-col items-center p-8 rounded-lg max-w-lg w-full"
        style={{
          maxHeight: '-webkit-fill-available',
          backgroundColor:'#212233',
          scrollbarWidth: 'thin',
          scrollbarColor:'#AAADBE #6842ff'
        }}
      >
        <h2 className="text-2xl font-bold mb-4">{product.prod_name}</h2>
        <img
          src={product.prod_img}
          alt="prod_img"
          className=" h-48 w-48 object-cover mb-4 rounded-lg"
        ></img>
        <p>รายละเอียด</p>
        <p className="text-white mb-4">{product.prod_desc}</p>
        <p className="text-gray-700 mb-4 text-green-500 text-xl font-extrabold">
          ราคา {product.prod_price} บาท
        </p>
        <div className="buttonGroup flex gap-x-6 justify-between w-full">
          <button
            onClick={handleToggleModal}
            className="w-1/2 mt-4 text-2xl font-extrabold bg-red-500 hover:bg-red-600 text-white px-8 py-4 rounded-md"
          >
            ปิด
          </button>
          <button
            onClick={logInBeforeBuy}
            className="w-1/2 mt-4 text-2xl font-extrabold bg-green-500 hover:bg-green-600 text-white px-8 py-4 rounded-md"
          >
            สั่งซื้อ
          </button>
        </div>
      </div>
    </div>
  );
}
