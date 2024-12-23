export interface StockItem {
  size: string;
  color: string;
  quantity: number;
}

export interface Product {
  id: number;
  name: string;
  description: string;
  price: number;
  image: string;
  category: string;
  stock: StockItem[];
}

