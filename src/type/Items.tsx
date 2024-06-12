export type Profile = {
  pictureUrl: string;
  userId: string;
  displayName: string;
  statusMessage: string;
};
// ! ข้อดีของมันคือ เวลาเราดึงพวก api มามันจะเป็น json ดังนั่น หากเรามี interface object class มารอเก็บเอาไว้มาจะช่วยให้เราเก็บข้อมูลได้ง่ายขึ้นและเห็นภาพมากขึ้น

export type beforeTypeGameProduct = {
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
};

type DatainWishlists = {
  appId: number;
  image: string;
  name: string;
  price: { formattedPrice: string };
};

export type Wishlist = {
  wishList: DatainWishlists[];
};

export type SteamGame = {
  large_capsules: GameInfo[];
  featured_win: GameInfo[];
  featured_mac: GameInfo[];
  featured_linux: GameInfo[];
};

export type GameInfo = {
  id: number;
  large_capsule_image: string;
  name: string;
  discount_percent: number;
  original_price: number;
  final_price: number;
};
