import {Shipping} from "./shipping";
import {Payment} from "./payment";
import {OrderLine} from "./orderLine";

export interface OrderHistoryItem {
  id: number,
  orderDate: Date,
  orderStatus: string,
  totalPrice: number,
  shipping: Shipping,
  payment: Payment,
  productOrderList: OrderLine[],
}
