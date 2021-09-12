

export interface ProductPagination{
  content: Product[];
  totalElements: number;
}

export interface Product{
  id: number;
  productName: string;
  productDescription : string;
  productPrice: number;
  imageURL: string;
  category: number;
}
