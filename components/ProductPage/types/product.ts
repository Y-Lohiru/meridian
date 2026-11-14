export interface ProductVariant {
  label: string;       
  dimensions?: string; 
  price: number;       
}

export interface Product {
  id: string;
  created_at?: string;
  productName: string;
  price: number;
  category: string;
  material?: string;
  color?: string;
  quantity?: number;
  image_url: string;
  images?: string[];             
  variants?: ProductVariant[];   
}

export interface ProductFilters {
  search?: string;
  category?: string;
  color?: string;
  material?: string;
  maxPrice?: number;
  sort?: string;
}