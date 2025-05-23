export interface IProduct {
  productID: string;
  sellerID: string;
  sellerName: string;
  categoryID: string;
  categoryName: string;
  title: string;
  description: string;
  price: number;
  sizes: ISize[];
  imageUrl: string;
}

export interface ISize {
  stock: number;
  size: string;
}
