import {UserOrder} from "./user-order";
import {ShoppingCartItem} from "./shopping-cart-item";

export interface OrderDetails {
  id : number,
  userOrder: UserOrder,
  cartContent: ShoppingCartItem[],
  totalPrice: number,
  paymentType: string
}
