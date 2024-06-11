import React, { useContext, useEffect, useState } from "react";
import videobg from "../assets/v1.mp4";
import "../assets/Home.css";
import "../assets/Loading.css";
import { GetProfile } from "../App";
import { Profile } from "../type/Items";
import { createMember, getMember } from "../services/HttpMethod";

export default function Home() {
  const dataLine = useContext<Profile | null>(GetProfile);
  const [member, setMember] = useState();

  // check userId wishlist
  async function get() {
    const info = await getMember();
    setMember(info);
  }
  async function create() {
    await createMember(dataLine?.userId || "", dataLine?.displayName || "");
  }
  console.log(dataLine?.userId);

  useEffect(() => {
    get();
    create();
  }, []);

  return (
    <div className="container w-full">
      <div className="overlay"></div>
      <div className="clip flex w-dvw h-dvh gap-y-16 items-center justify-center ">
        <video
          style={{ width: "100%", height: "100%", objectFit: "cover" }}
          src={videobg}
          autoPlay
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
