export interface Product {
  id: string;
  created_at?: string;
  productName: string; // Mapped to productName column in DB
  price: number; // float8
  category: string;
  material?: string;
  color?: string; // Mapped to color column in DB
  quantity?: number; // int8
  image_url: string; // Mapped to image_url column in DB
}

export interface ProductFilters {
  category?: string;
  color?: string;
  material?: string;
  maxPrice?: number;
  sort?: string;
}