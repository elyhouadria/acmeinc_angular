export interface Userorder {
  userOrderId: number
  userOrderDate: Date;
  userOrderShippingDate: Date;
  userOrderOrderStatus: string;
  userOrderTotalPrice: number;
  userOrderOrderId: number;
  userOrderShippingAddressId: number;
  userOrderBillingAddressId: number;
  userOrderPaymentId: number
}
