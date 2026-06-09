import { create } from 'zustand';
import type { Product } from '@/types/product';
import type { Order, OrderStatus } from '@/types/order';
import { supabase } from '@/lib/supabase';

interface AdminStore {
  isLoggedIn: boolean;
  products: Product[];
  orders: Order[];
  login: (email?: string, password?: string) => Promise<{success: boolean; error?: string}> | void;
  logout: () => Promise<void>;
  loadProducts: () => Promise<void>;
  loadOrders: () => Promise<void>;
  addProduct: (product: Omit<Product, 'id'>) => Promise<void>;
  updateProduct: (id: number, data: Partial<Product>) => Promise<void>;
  deleteProduct: (id: number) => Promise<void>;
  toggleProductActive: (id: number) => Promise<void>;
  toggleProductFeatured: (id: number) => Promise<void>;
  updateOrderStatus: (id: string, status: OrderStatus) => Promise<void>;
  createOrder: (data: any) => Promise<boolean>;
  getProductStats: () => { total: number; active: number; outOfStock: number };
  getOrdersByStatus: (status: OrderStatus | 'all') => Order[];
  checkSession: () => Promise<void>;
}

export const useAdminStore = create<AdminStore>((set, get) => ({
  isLoggedIn: false,
  products: [],
  orders: [],

  checkSession: async () => {
    const { data: { session } } = await supabase.auth.getSession();
    set({ isLoggedIn: !!session });
  },

  login: async (email?: string, password?: string) => {
    if (!email || !password) return { success: false, error: 'Credenciales requeridas' };
    
    const { error } = await supabase.auth.signInWithPassword({
      email,
      password,
    });

    if (error) {
      return { success: false, error: 'Credenciales inválidas' };
    }
    
    set({ isLoggedIn: true });
    return { success: true };
  },
  
  logout: async () => {
    await supabase.auth.signOut();
    set({ isLoggedIn: false, products: [], orders: [] });
  },

  loadProducts: async () => {
    const { data, error } = await supabase
      .from('Product')
      .select('*')
      .order('id', { ascending: false });

    if (error) {
      console.error('Error loading products:', error);
      return;
    }
    if (data) {
      set({ products: data });
    }
  },

  loadOrders: async () => {
    const { data, error } = await supabase
      .from('Order')
      .select('*, items:OrderItem(*)')
      .order('createdAt', { ascending: false });

    if (error) {
      console.error('Error loading orders:', error);
      return;
    }
    if (data) {
      const parsedOrders = data.map((o: any) => ({
        ...o,
        createdAt: new Date(o.createdAt)
      }));
      set({ orders: parsedOrders });
    }
  },

  addProduct: async (product) => {
    // Remove empty id if present to let DB autoincrement
    const { id, ...productData } = product as any;
    
    const { data, error } = await supabase
      .from('Product')
      .insert([productData])
      .select()
      .single();

    if (error) {
      console.error('Error adding product:', error);
      return;
    }

    if (data) {
      set((state) => ({ products: [data, ...state.products] }));
    }
  },

  updateProduct: async (id, data) => {
    const { data: updated, error } = await supabase
      .from('Product')
      .update(data)
      .eq('id', id)
      .select()
      .single();

    if (error) {
      console.error('Error updating product:', error);
      return;
    }

    if (updated) {
      set((state) => ({
        products: state.products.map((p) => (p.id === id ? updated : p)),
      }));
    }
  },

  deleteProduct: async (id) => {
    const { error } = await supabase
      .from('Product')
      .delete()
      .eq('id', id);

    if (error) {
      console.error('Error deleting product:', error);
      return;
    }

    set((state) => ({
      products: state.products.filter((p) => p.id !== id),
    }));
  },

  toggleProductActive: async (id) => {
    const p = get().products.find(p => p.id === id);
    if (!p) return;
    
    const newStock = p.stock > 0 ? 0 : 10;
    
    const { data: updated, error } = await supabase
      .from('Product')
      .update({ stock: newStock })
      .eq('id', id)
      .select()
      .single();

    if (error) {
      console.error('Error toggling active:', error);
      return;
    }

    if (updated) {
      set((state) => ({
        products: state.products.map((p) => (p.id === id ? updated : p)),
      }));
    }
  },

  toggleProductFeatured: async (id) => {
    const p = get().products.find(p => p.id === id);
    if (!p) return;

    const { data: updated, error } = await supabase
      .from('Product')
      .update({ featured: !p.featured })
      .eq('id', id)
      .select()
      .single();

    if (error) {
      console.error('Error toggling featured:', error);
      return;
    }

    if (updated) {
      set((state) => ({
        products: state.products.map((p) => (p.id === id ? updated : p)),
      }));
    }
  },

  updateOrderStatus: async (id, status) => {
    const { data: updated, error } = await supabase
      .from('Order')
      .update({ status })
      .eq('id', id)
      .select('*, items:OrderItem(*)')
      .single();

    if (error) {
      console.error('Error updating order status:', error);
      return;
    }

    if (updated) {
      updated.createdAt = new Date(updated.createdAt);
      set((state) => ({
        orders: state.orders.map((o) => (o.id === id ? updated : o)),
      }));
    }
  },

  createOrder: async (data) => {
    // Separate order data from items
    const { items, ...orderData } = data;
    
    // 1. Insert Order
    const { data: orderResult, error: orderError } = await supabase
      .from('Order')
      .insert([orderData])
      .select()
      .single();

    if (orderError) {
      console.error('Error creating order:', orderError);
      return false;
    }

    // 2. Insert Items
    if (items && items.length > 0) {
      const itemsToInsert = items.map((item: any) => ({
        ...item,
        orderId: orderResult.id
      }));

      const { error: itemsError } = await supabase
        .from('OrderItem')
        .insert(itemsToInsert);

      if (itemsError) {
        console.error('Error creating order items:', itemsError);
        // Should ideally rollback, but for simplicity returning false
        return false;
      }
    }

    // Refresh orders to get the complete related order
    await get().loadOrders();
    return true;
  },

  getProductStats: () => {
    const { products } = get();
    return {
      total: products.length,
      active: products.filter((p) => p.stock > 0).length,
      outOfStock: products.filter((p) => p.stock === 0).length,
    };
  },

  getOrdersByStatus: (status) => {
    const { orders } = get();
    if (status === 'all') return orders;
    return orders.filter((o) => o.status === status);
  },
}));
