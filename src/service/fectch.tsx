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
export const getGameProductId = (id: string | undefined) => {
  const myHeaders = new Headers();
  myHeaders.append("Content-Type", "application/json");

  const requestOptions: RequestInit = {
    method: "GET",
    headers: myHeaders,
    redirect: "follow",
  };

  return fetch(ngrokDomain + "/products/" + id, requestOptions)
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

  fetch(ngrokDomain + "/products/" + paramId, requestOptions)
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

  fetch(ngrokDomain + "/products", requestOptions)
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

    fetch(ngrokDomain + "/products/" + id, requestOptions)
      .then((response) => response.json())
      .then(() => getGameProduct())
      .catch((error) => console.error(error));
  };