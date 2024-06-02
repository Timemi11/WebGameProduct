import axios from "axios";
import { GameInfo, SteamGame } from "../type/Items";
import { endpoint, endpointSteam, steamUrlGame } from "./ApiEndpoint";

const mapItems = (items: any) =>
  items.map((item: any) => ({
    id: item.id,
    large_capsule_image: item.large_capsule_image,
    name: item.name,
    discount_percent: item.discount_percent,
    original_price: item.original_price,
    final_price: item.final_price,
  }));

// ! Bearer ต่อด้วย  [Channel access token] ของ messagesing api

//  * Fetch With Axios

export const sendMessageToLine = async (
  product: GameInfo,
  liffurl: string,
  userId: string | undefined
) => {
  try {
    const response = await axios.post(
      `${endpoint}/sent-gameproduct/${userId}`,
      {
        prod_id: product.id,
        prod_img: product.large_capsule_image,
        prod_name: product.name,
        prod_desc: product.name,
        prod_beforeprice: product.original_price,
        prod_price: product.final_price,
        url: liffurl,
        steamurl: steamUrlGame,
      },
      {
        headers: {
          "Content-Type": "application/json",
          Authorization: process.env.AUTHEN || "",
        },
      }
    );
    return response;
  } catch (error) {
    throw error;
  }
};

export const getFeatureGameSteam = async () => {
  try {
    const response = await axios.get(`${endpointSteam}/`, {
      headers: {
        "Content-Type": "application/json",
      },
    });
    // แยกข้อมูลและแม็ปรูปแบบ
    const { large_capsules, featured_win, featured_linux, featured_mac } =
      response.data;
    const mappedLargeCapsules = mapItems(large_capsules);
    const mappedFeaturedWin = mapItems(featured_win);
    const mappedFeaturedLinux = mapItems(featured_linux);
    const mappedFeaturedMac = mapItems(featured_mac);
    // ส่งข้อมูลที่แม็ปแล้วกลับ
    return {
      large_capsules: mappedLargeCapsules,
      featured_win: mappedFeaturedWin,
      featured_linux: mappedFeaturedLinux,
      featured_mac: mappedFeaturedMac,
    };
  } catch (error) {
    console.error(error);
    throw error; // ส่งข้อผิดพลาดออกไปให้ caller จัดการ
  }
};

// ! Bearer ต่อด้วย  [Channel access token] ของ messagesing api

// * Fetch Without Axios

// export const sendMessageToLine = async (
//   product: GameInfo,
//   liffurl: string,
//   userId: string | undefined
// ) => {
//   try {
//     const response = await fetch(endpoint + `/sent-gameproduct/${userId}`, {
//       method: "POST",
//       headers: {
//         "Content-Type": "application/json",
//         Authorization: process.env.AUTHEN || '',
//       },
//       body: JSON.stringify({
//         prod_id: product.id,
//         prod_img: product.large_capsule_image,
//         prod_name: product.name,
//         prod_desc: product.name,
//         prod_beforeprice: product.original_price,
//         prod_price: product.final_price,
//         url: liffurl,
//         steamurl: steamUrlGame,
//       }),
//     });
//     if (!response.ok) {
//       throw new Error(`HTTP error! status: ${response.status}`);
//     }
//     return await response.json();
//   } catch (error) {
//     throw error;
//   }
// };

// export const getFeatureGameSteam = () => {
//   const myHeaders = new Headers();
//   myHeaders.append("Content-Type", "application/json");

//   const requestOptions: RequestInit = {
//     method: "GET",
//     headers: myHeaders,
//     redirect: "follow",
//   };

//   return fetch(endpointSteam + "/", requestOptions)
//     .then((response: Response) => response.json())
//     .then((result: SteamGame) => {
//       const large_capsules = mapItems(result.large_capsules);
//       const featured_win = mapItems(result.featured_win);
//       const featured_linux = mapItems(result.featured_linux);
//       const featured_mac = mapItems(result.featured_mac);

//       return { large_capsules, featured_win, featured_linux, featured_mac };
//     })
//     .catch((error: Error) => console.error(error));
// };
