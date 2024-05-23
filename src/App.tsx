import React, { useEffect, useState, createContext } from 'react';
import { Routes, Route } from 'react-router-dom';
import './App.css';
import Navbar from './Component/Navbar';
import Product from './Component/Product';
import ProductCreate from './Component/ProductCreate';
import ProductUpdate from './Component/ProductUpdate';
import ShowGameProduct from './Component/ShowGameProduct';
import liff from '@line/liff';
import { User } from './Component/Model/User';

export const GetProfile = createContext<User | undefined>(undefined);

const App: React.FC = () => {
  const liffId = '2005244347-lY246dm4';
  const [dataLine, setDataLine] = useState<User>();

  const getProfile = async (): Promise<void> => {
    const profile = await liff.getProfile();
    const {
      pictureUrl,
      userId,
      displayName,
      statusMessage,
    }
    =  profile as { pictureUrl: string; userId: string; displayName: string; statusMessage: string };
    setDataLine({ pictureUrl, userId, displayName, statusMessage });
  };

  useEffect(() => {
    // Initialize LIFF SDK
    const initLiff = async (): Promise<void> => {
      try {
        await liff.init({
          liffId: liffId,
        });
        if (!liff.isLoggedIn()) {
        } else {
          getProfile();
        }
      } catch (error) {
        console.error('LIFF initialization failed', error);
      }
    };
    initLiff();
  }, []);

  return (
    <GetProfile.Provider value={dataLine}>
      <Navbar />
      <Routes>
        <Route path="/" element={<ShowGameProduct />} />
        <Route path="admin" element={<Product />} />
        <Route path="create" element={<ProductCreate />} />
        <Route path="update/:id" element={<ProductUpdate />} />
        <Route />
      </Routes>
    </GetProfile.Provider>
  );
};

export default App;
