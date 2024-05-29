import { GameProduct } from "../type/items";
import { ngrokDomain } from "./ngrokdomain";

export const getGameProduct = () => {
  const myHeaders = new Headers();
  myHeaders.append("Content-Type", "application/json");

  const requestOptions: RequestInit = {
    method: "GET",
    headers: myHeaders,
    redirect: "follow",
  };

  return fetch(ngrokDomain + "/products", requestOptions)
    .then((response: Response) => response.json())
    .then((result) => result)
    .catch((error: Error) => console.error(error));
};

export const putGameProduct = (data: any, paramId: any) => {
  const myHeaders = new Headers();
  myHeaders.append("Content-Type", "application/json");

  const raw = JSON.stringify(
    data
    // pictureUrl: dataLine?.pictureUrl,
    // userId: dataLine?.userId,
    // displayName: dataLine?.displayName,
    // statusMessage: dataLine?.statusMessage,
    // prod_img: prod_img,
    // prod_name: prod_name,
    // prod_desc: prod_desc,
    // prod_price: prod_price,
  );

  const requestOptions: RequestInit = {
    method: "PUT",
    headers: myHeaders,
    body: raw,
    redirect: "follow",
  };

  fetch(ngrokDomain + "/products/" + paramId, requestOptions)
    .then((response: Response) => response.json())
    .then(() => {
      alert("แก้ไขข้อมูล Product แล้ว T0T");
      window.location.href = "/admin";
    })
    .catch((error: Error) => console.error(error));
};
