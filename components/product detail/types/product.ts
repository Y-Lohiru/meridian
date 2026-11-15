export interface ProductVariant {
  label: string;       // e.g., "Small", "Large"
  dimensions?: string; // e.g., "H 38 cm · Ø 24 cm"
  price: number;       // Variant-specific price
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
  details?: string;   
}

export interface ProductReview {
  id: string;
  created_at: string;
  product_id: string;
  author_name: string;
  rating: number;
  title: string;
  comment: string;
  verified: boolean;
}

export interface ProductFilters {
  search?: string;
  category?: string;
  color?: string;
  material?: string;
  maxPrice?: number;
  sort?: string;
}