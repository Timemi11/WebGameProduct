import axios from "axios";
import { GameInfo, Wishlist } from "../type/Items";
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
          Authorization:
            "eCR3NwXUmzIqOq8HMYtuXooaWPDEBlszMMeF6BGoyRk4XpK2Ho89HV+hF0IUBuhsTRZYhWxLzRPFV6GyywHaaY7EL4t6uH8KgWUDTh4crPqW560gTHNJC98g+eStkQXgxKUO5StidnjRdPDxScYUHAdB04t89/1O/w1cDnyilFU=",
        },
      }
    );
    return response;
  } catch (error) {
    throw error;
  }
};
// route.get("/usermember", userMemberController.getUserMember);
// route.get("/usermember/:id", userMemberController.findUserMemberById);
// route.get("/usermember/userid/:id", userMemberController.findUserMemberByUserId);
// route.post("/usermember", userMemberController.createProduct);
// route.put("/usermember/userid/:id",userMemberController.updateUserMember);
// route.delete("/usermember/userid/:id",userMemberController.deleteUserMember);

export const getMember = async () => {
  try {
    const response = await axios.get(`${endpoint}/usermember`, {
      headers: {
        "Content-Type": "application/json",
      },
    });
    return response.data;
  } catch (err) {}
};

export const getMemberById = async (userId: string) => {
  try {
    const response = await axios.get(
      `${endpoint}/usermember/userid/${userId}`,
      {
        headers: {
          "Content-Type": "application/json",
        },
      }
    );
    return response.data;
  } catch (err) {
    // console.log(err);
  }
};

export const createMember = async (
  userId: string | "",
  dpName: string | ""
) => {
  try {
    const response = await axios.post(
      `${endpoint}/usermember`,
      {
        userId: userId,
        displayName: dpName,
      },
      {
        headers: {
          "Content-Type": "application/json",
        },
      }
    );
    return response;
  } catch (err) {}
};

export const updateUserWishlist = async (
  wishList: Wishlist,
  userId: string
) => {
  try {
    const response = await axios.put(
      `${endpoint}/usermember/userid/${userId}`,
      {
        wishList,
      },
      {
        headers: {
          "Content-Type": "application/json",
        },
      }
    );
    return response.data;
  } catch (err) {}
};

export const getGameSteamById = async (appId: number) => {
  try {
    const response = await axios.get(`${endpointSteam}/${appId}`, {
      headers: {
        "Content-Type": "application/json",
      },
    });

    return response.data;
  } catch (error) {
    console.error(error);
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
    const { large_capsules, featured_win, featured_linux, featured_mac } =
      response.data;
    const mappedLargeCapsules = mapItems(large_capsules);
    const mappedFeaturedWin = mapItems(featured_win);
    const mappedFeaturedLinux = mapItems(featured_linux);
    const mappedFeaturedMac = mapItems(featured_mac);

    return {
      large_capsules: mappedLargeCapsules,
      featured_win: mappedFeaturedWin,
      featured_linux: mappedFeaturedLinux,
      featured_mac: mappedFeaturedMac,
    };
  } catch (error) {
    console.error(error);
    throw error;
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
