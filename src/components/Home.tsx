import React, { useContext, useEffect } from "react";
import videobg from "../assets/v1.mp4";
import "../assets/Home.css";
import "../assets/Loading.css";
import { GetProfile } from "../App";
import { Profile } from "../type/Items";
import { createMember, getMemberById } from "../services/HttpMethod";

export default function Home() {
  const dataLine = useContext<Profile | null>(GetProfile);

  // check userId wishlist
  // async function get() {
  //   const info = await getMember(); //ข้อมูลของ user ใน userMember
  //   setMember(info);
  // }
  async function create(userId: string, displayName: string) {
    await createMember(userId || "", displayName || "");
  }

  async function getMemberId(userId: string) {
    const info = await getMemberById(userId); //ข้อมูลของ user ใน userMember
    return info;
  }

  useEffect(() => {
    // เช็ค member ตรงนี้หลังเข้าหน้า home ถ้ามีแล้วก็จะขึ้นมาแสดง ถ้าไม่มีก็จะเก็บไว้ก่อน
    if (dataLine) {
      getMemberId(dataLine?.userId).then((r) => {
        if (!r) {
          //ไม่มีเก็บ
          alert("ยินดีต้อนรับเราทำการเพิ่มคุณเป็นสมาชิกแล้วเรียบร้อย");
          create(dataLine?.userId || "", dataLine?.displayName || "");
        } else {
          //มีแล้ว แสดงข้อมูลออกมา
          console.log("Found userMember ");
          console.log(r);
        }
      });
    }
  }, [dataLine]);

  return (
    <div className="container w-full">
      <div className="overlay"></div>
      <div className="clip flex w-dvw h-dvh gap-y-16 items-center justify-center ">
        <video
          style={{ width: "100%", height: "100%", objectFit: "cover" }}
          src={videobg}
          autoPlay
          playsInline
          muted
          loop></video>
        <div className="content">
          <div className="wrapper w-full">
            <svg>
              <text
                className="text-5xl md:text-9xl"
                x="50%"
                y="50%"
                dy=".35em"
                text-anchor="middle">
                GameProduct
              </text>
            </svg>
          </div>
          <button
            className="font-extrabold text-2xl md:text-3xl p-4 rounded-lg border-8 border-orange-500 hover:border-orange-300 "
            onClick={() => (window.location.href = "user")}>
            Next!
          </button>
        </div>
      </div>
    </div>
  );
}
