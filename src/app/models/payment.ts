export interface Payment{
  paymentId: number;
  paymentAmount: number;
  paymentCurrency: string;
  paymentStatus: string;
  paymentType: string;
  userOrderId: number
}
