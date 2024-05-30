import React, { useEffect, useState, createContext } from "react";
import { Routes, Route } from "react-router-dom";
import "./App.css";
import Navbar from "./components/Navbar";
import Product from "./components/AdminPage";
import ProductCreate from "./components/AdminCreate";
import ProductUpdate from "./components/AdminEdit";
import ShowGameProduct from "./components/BrowsePage";
import liff from "@line/liff";
import { GameProduct } from "./type/items";
import Home from "./components/Home";

export const GetProfile = createContext<GameProduct | null>(null);

const App: React.FC = () => {
  const liffId = "2005244347-lY246dm4";
  const [dataLine, setDataLine] = useState<GameProduct | null>(null);

  const getProfile = async (): Promise<void> => {
    const profile = await liff.getProfile();
    const { pictureUrl, userId, displayName, statusMessage } = profile as {
      pictureUrl: string | "";
      userId: string | "";
      displayName: string | "";
      statusMessage: string | "";
    };
    setDataLine({
      id: "",
      pictureUrl,
      userId,
      displayName,
      statusMessage,
      prod_img: "",
      prod_name: "",
      prod_desc: "",
      prod_price: 0,
      update_at: "",
    });
  };

  useEffect(() => {
    // Initialize LIFF SDK
    const initLiff = async (): Promise<void> => {
      try {
        await liff.init({
          liffId: liffId,
          // withLoginOnExternalBrowser: true,
        });
        if (!liff.isLoggedIn()) {
        } else {
          getProfile();
        }
      } catch (error) {
        console.error("LIFF initialization failed", error);
      }
    };
    initLiff();
  }, []);

  return (
    <GetProfile.Provider value={dataLine}>
      <Navbar />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="user" element={<ShowGameProduct />} />
        <Route path="admin" element={<Product />} />
        <Route path="create" element={<ProductCreate />} />
        <Route path="update/:id" element={<ProductUpdate />} />
        <Route />
      </Routes>
    </GetProfile.Provider>
  );
};

export default App;
