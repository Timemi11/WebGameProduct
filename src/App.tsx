import React, { useEffect, useState, createContext } from "react";
import { Routes, Route } from "react-router-dom";
import "./App.css";
import Navbar from "./components/Navbar";
import ShowGameProduct from "./components/BrowsePage";
import liff from "@line/liff";
import { Profile } from "./type/Items";
import Home from "./components/Home";
import FavPage from "./components/FavoritePage";

export const GetProfile = createContext<Profile | null>(null);

const App: React.FC = () => {
  const liffId = "2005244347-lY246dm4";
  const [dataLine, setDataLine] = useState<Profile | null>(null);

  const getProfile = async (): Promise<void> => {
    const profile = await liff.getProfile();
    const { pictureUrl, userId, displayName, statusMessage } = profile as {
      pictureUrl: string | "";
      userId: string | "";
      displayName: string | "";
      statusMessage: string | "";
    };
    setDataLine({
      pictureUrl,
      userId,
      displayName,
      statusMessage,
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
        <Route path="/user" element={<ShowGameProduct />} />
        <Route path="/fav" element={<FavPage />}/>
        <Route />
      </Routes>
    </GetProfile.Provider>
  );
};

export default App;
