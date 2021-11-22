import {Product} from "./product";

export interface OrderLine {
  id: number;
  quantity: number;
  date: Date;
  /*product: {
    id: number
  };*/
  product: Product;
  userOrder: {
    id: number
  };
  orderLinePrice: number;
}
