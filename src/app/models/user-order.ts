export interface UserOrder {
  id: number
  orderDate: Date;
  orderStatus: string;
  totalPrice: number;
  acmeUser: {
    id: number
  };
  shippingAddress: {
    id: number
  };
  billingAddress: {
    id: number
  };
  shipping: {
    id: number
  };
  payment: {
    id: number
  };
}
