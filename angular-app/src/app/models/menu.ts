export interface menu {
  _id: string;
  name: string;
  price: number;
  type: string;
  MID: string;
  category: string;
  quantity: number;
  detail: string;
  img: string;
}

export type menuModel = menu[];
