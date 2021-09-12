export interface OrderLine {
  id: number;
  quantity: number;
  date: Date;
  product: {
    id: number
  };
  userOrder: {
    id: number
  };
}
