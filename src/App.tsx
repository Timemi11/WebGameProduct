import React, { useEffect, useState, createContext } from "react";
import { Routes, Route } from "react-router-dom";
import "./App.css";
import Navbar from "./components/Navbar";
import ShowGameProduct from "./views/BrowsePage";
import liff from "@line/liff";
import { Profile } from "./type/Items";
import Home from "./views/Home";
import FavPage from "./views/FavoritePage";
import { getProfileByAccessToken } from "./services/HttpMethod";

export const GetProfile = createContext<Profile | null>(null);

const App: React.FC = () => {
  const liffId = "2005244347-lY246dm4";
  const [dataLine, setDataLine] = useState<Profile | null>(null);

  const getProfile = async (): Promise<void> => {
    const accesssToken = `Bearer ${liff.getAccessToken()}`;
    const profile = await getProfileByAccessToken(accesssToken)
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
