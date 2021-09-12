import {Product} from "./product";
import {OrderLine} from "./orderLine";

export interface ShoppingCartItem {
  id: number,
  product: Product;
  orderLine: OrderLine;
}
