import React from "react";
import videobg from "../assets/v4.mp4";
import "./customarrow.css";
import "../custom.d.ts";
export default function Home() {
  return (
    <div className="container mx-auto">
      <div className="overlay"></div>
      <div
        style={{ width: "100%", height: "100vh" }}
        className="youtube-clip flex gap-y-16 items-center justify-center">
        <video
          style={{ width: "100%", height: "100%", objectFit: "cover" }}
          src={videobg}
          autoPlay
          muted
          loop></video>
        <div className="content">
          <div className="wrapper w-full">
            <svg>
              <text x="50%" y="50%" dy=".35em" text-anchor="middle">
                GameProduct1
              </text>
            </svg>
          </div>
          <button
            className="font-extrabold text-3xl p-4 rounded-lg border-8 border-orange-500 hover:border-orange-300 "
            onClick={() => (window.location.href = "user")}>
            Next!
          </button>
        </div>
      </div>
    </div>
  );
}
