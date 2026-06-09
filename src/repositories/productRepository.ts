import { supabase } from '@/lib/supabase';
import type { Product, ProductCategory, ProductFilters } from '@/types/product';

export const productRepository = {
  getProducts: async (filters?: ProductFilters): Promise<Product[]> => {
    let query = supabase.from('Product').select('*');

    if (filters?.categories?.length) {
      query = query.in('category', filters.categories);
    }

    if (filters?.minPrice !== undefined) {
      query = query.gte('price', filters.minPrice);
    }

    if (filters?.maxPrice !== undefined) {
      query = query.lte('price', filters.maxPrice);
    }

    if (filters?.inStock) {
      query = query.gt('stock', 0);
    }

    if (filters?.search) {
      const q = `%${filters.search}%`;
      query = query.or(`name.ilike.${q},brand.ilike.${q},flavor.ilike.${q}`);
    }

    if (filters?.sort) {
      switch (filters.sort) {
        case 'price_asc':
          query = query.order('price', { ascending: true });
          break;
        case 'price_desc':
          query = query.order('price', { ascending: false });
          break;
        case 'newest':
          query = query.order('id', { ascending: false });
          break;
        case 'bestseller':
          query = query.order('stock', { ascending: false });
          break;
      }
    } else {
      query = query.order('id', { ascending: false });
    }

    const { data, error } = await query;

    if (error) {
      console.error('Error fetching products:', error);
      return [];
    }

    return data as Product[];
  },

  getProductById: async (id: number): Promise<Product | undefined> => {
    const { data, error } = await supabase
      .from('Product')
      .select('*')
      .eq('id', id)
      .single();

    if (error) {
      console.error(`Error fetching product ${id}:`, error);
      return undefined;
    }

    return data as Product;
  },

  getFeaturedProducts: async (): Promise<Product[]> => {
    const { data, error } = await supabase
      .from('Product')
      .select('*')
      .eq('featured', true)
      .order('id', { ascending: false });

    if (error) {
      console.error('Error fetching featured products:', error);
      return [];
    }

    return data as Product[];
  },

  getProductsByCategory: async (category: ProductCategory): Promise<Product[]> => {
    const { data, error } = await supabase
      .from('Product')
      .select('*')
      .eq('category', category)
      .order('id', { ascending: false });

    if (error) {
      console.error(`Error fetching products for category ${category}:`, error);
      return [];
    }

    return data as Product[];
  },

  searchProducts: async (queryStr: string): Promise<Product[]> => {
    const q = `%${queryStr}%`;
    const { data, error } = await supabase
      .from('Product')
      .select('*')
      .or(`name.ilike.${q},brand.ilike.${q},flavor.ilike.${q}`)
      .order('id', { ascending: false });

    if (error) {
      console.error('Error searching products:', error);
      return [];
    }

    return data as Product[];
  },
};
