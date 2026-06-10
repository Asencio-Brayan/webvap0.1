export type ProductCategory = 'desechables' | 'recargables' | 'pods' | 'liquidos' | 'accesorios';

export interface Product {
  id: number;
  name: string;
  brand: string;
  category: ProductCategory;
  price: number;
  flavor: string;
  flavors?: string[];
  nicotine?: number;
  stock: number;
  featured: boolean;
  image: string;
  description: string;
  specs: Record<string, string>;
  images: string[];
}

export interface ProductFilters {
  categories?: ProductCategory[];
  minPrice?: number;
  maxPrice?: number;
  inStock?: boolean;
  search?: string;
  sort?: 'bestseller' | 'newest' | 'price_asc' | 'price_desc';
}
