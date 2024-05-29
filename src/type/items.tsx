export type GameProduct = {
  _id: string;
  pictureUrl: string;
  userId: string;
  displayName: string;
  statusMessage: string;
  prod_img: string;
  prod_name: string;
  prod_desc: string;
  prod_price: number;
  update_at: string;
};
// ! ข้อดีของมันคือ เวลาเราดึงพวก api มามันจะเป็น json ดังนั่น หากเรามี interface object class มารอเก็บเอาไว้มาจะช่วยให้เราเก็บข้อมูลได้ง่ายขึ้น

export type User = {
  pictureUrl: string;
  userId: string;
  displayName: string;
  statusMessage: string;
};
