import { GameProduct } from "../type/items";
import { endpoint } from "./apiEndpoint";

export const getGameProduct = () => {
  const myHeaders = new Headers();
  myHeaders.append("Content-Type", "application/json");

  const requestOptions: RequestInit = {
    method: "GET",
    headers: myHeaders,
    redirect: "follow",
  };

  return fetch(endpoint + "/products", requestOptions)
    .then((response: Response) => response.json())
    .then((result) => {
      const GameProduct = result.map(
        (items: {
          _id: string;
          pictureUrl: string;
          userId: string;
          displayName: string;
          statusMessage: string;
          prod_img: string;
          prod_name: number;
          prod_desc: string;
          prod_price: string;
          update_at: string;
        }) => ({
          id: items._id,
          pictureUrl: items.pictureUrl,
          userId: items.userId,
          displayName: items.displayName,
          statusMessage: items.statusMessage,
          prod_img: items.prod_img,
          prod_name: items.prod_name,
          prod_desc: items.prod_desc,
          prod_price: items.prod_price,
          update_at: items.update_at,
        })
      );
      return GameProduct;
    })
    .catch((error: Error) => console.error(error));
};
export const getGameProductId = (id: string | undefined) => {
  const myHeaders = new Headers();
  myHeaders.append("Content-Type", "application/json");

  const requestOptions: RequestInit = {
    method: "GET",
    headers: myHeaders,
    redirect: "follow",
  };

  return fetch(endpoint + "/products/" + id, requestOptions)
    .then((response: Response) => response.json())
    .then((result) => result)
    .catch((error: Error) => console.error(error));
};

export const putGameProduct = (
  data: any,
  prod_img: string,
  prod_name: string,
  prod_desc: string,
  prod_price: number,
  paramId: string | undefined
) => {
  const myHeaders = new Headers();
  myHeaders.append("Content-Type", "application/json");

  const raw = JSON.stringify({
    pictureUrl: data?.pictureUrl,
    userId: data?.userId,
    displayName: data?.displayName,
    statusMessage: data?.statusMessage,
    prod_img: prod_img,
    prod_name: prod_name,
    prod_desc: prod_desc,
    prod_price: prod_price,
  });

  const requestOptions: RequestInit = {
    method: "PUT",
    headers: myHeaders,
    body: raw,
    redirect: "follow",
  };

  fetch(endpoint + "/products/" + paramId, requestOptions)
    .then((response: Response) => response.json())
    .then(() => {
      alert("แก้ไขข้อมูล Product แล้ว T0T");
      window.location.href = "/admin";
    })
    .catch((error: Error) => console.error(error));
};

export const postGameProduct = (
  data: any,
  prod_img: string,
  prod_name: string,
  prod_desc: string,
  prod_price: number
) => {
  const myHeaders = new Headers();
  myHeaders.append("Content-Type", "application/json");

  const raw = JSON.stringify({
    pictureUrl: data?.pictureUrl,
    userId: data?.userId,
    displayName: data?.displayName,
    statusMessage: data?.statusMessage,
    prod_img: prod_img,
    prod_name: prod_name,
    prod_desc: prod_desc,
    prod_price: prod_price,
  });

  const requestOptions: RequestInit = {
    method: "POST",
    headers: myHeaders,
    body: raw,
    redirect: "follow",
  };

  fetch(endpoint + "/products", requestOptions)
    .then((response: Response) => {
      return response.json();
    })
    .then(() => {
      alert("เพิ่มข้อมูล Product แล้ว T0T");
      window.location.href = "/admin";
    })
    .catch((error) => console.error(error));
};

export const deleteProduct = (id: string) => {
  const myHeaders = new Headers();
  myHeaders.append("Content-Type", "application/json");

  const requestOptions: RequestInit = {
    method: "DELETE",
    headers: myHeaders,
    redirect: "follow",
  };

  fetch(endpoint + "/products/" + id, requestOptions)
    .then((response) => response.json())
    .then(() => getGameProduct())
    .catch((error) => console.error(error));
};

export const sendMessageToLine = async (
  product: GameProduct,
  liffurl: string
) => {
  try {
    const response = await fetch(
      endpoint + `/sent-gameproduct/${product?.userId}`,
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          // ! Bearer ต่อด้วย  [Channel access token] ของ messagesing api
          Authorization:
            "Bearer eCR3NwXUmzIqOq8HMYtuXooaWPDEBlszMMeF6BGoyRk4XpK2Ho89HV+hF0IUBuhsTRZYhWxLzRPFV6GyywHaaY7EL4t6uH8KgWUDTh4crPqW560gTHNJC98g+eStkQXgxKUO5StidnjRdPDxScYUHAdB04t89/1O/w1cDnyilFU=",
        },
        body: JSON.stringify({
          prod_id: product.id,
          prod_img: product.prod_img,
          prod_name: product.prod_name,
          prod_desc: product.prod_desc,
          prod_price: product.prod_price,
          url: liffurl,
        }),
      }
    );
    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`);
    }
    return await response.json();
  } catch (error) {
    throw error;
  }
};
