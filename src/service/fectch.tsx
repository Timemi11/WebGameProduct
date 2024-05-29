import { ngrokDomain } from "./ngrokdomain";

export const getGameProduct = () => {
  const myHeaders = new Headers();
  myHeaders.append("Content-Type", "application/json");

  const requestOptions: RequestInit = {
    method: "GET",
    headers: myHeaders,
    redirect: "follow",
  };

  fetch(ngrokDomain + "/products", requestOptions)
    .then((response: Response) => response.json())
    .then((result) => {
      return console.log(result);
    })
    .catch((error: Error) => console.error(error));
};
