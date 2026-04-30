import { create } from 'zustand';
import type { Product } from '@/types/product';
import type { Order, OrderStatus } from '@/types/order';
import { mockProducts } from '@/repositories/productRepository';
import { mockOrders } from '@/repositories/orderRepository';

interface AdminStore {
  isLoggedIn: boolean;
  products: Product[];
  orders: Order[];
  login: (email?: string, password?: string) => Promise<{success: boolean; error?: string}> | void;
  logout: () => void;
  addProduct: (product: Omit<Product, 'id'>) => void;
  updateProduct: (id: number, data: Partial<Product>) => void;
  deleteProduct: (id: number) => void;
  toggleProductActive: (id: number) => void;
  toggleProductFeatured: (id: number) => void;
  updateOrderStatus: (id: string, status: OrderStatus) => void;
  getProductStats: () => { total: number; active: number; outOfStock: number };
  getOrdersByStatus: (status: OrderStatus | 'all') => Order[];
}

export const useAdminStore = create<AdminStore>((set, get) => ({
  isLoggedIn: false,
  products: [...mockProducts],
  orders: [...mockOrders],

  login: async (email?: string, password?: string) => {
    const USE_API = import.meta.env.VITE_USE_API === 'true';
    const API_URL = import.meta.env.VITE_API_URL || 'http://localhost:4000';

    if (USE_API && email && password) {
      try {
        const res = await fetch(`${API_URL}/api/admin/login`, {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({ email, password }),
        });
        
        if (res.ok) {
          const data = await res.json();
          localStorage.setItem('admin_token', data.token);
          set({ isLoggedIn: true });
          return { success: true };
        } else {
          return { success: false, error: 'Invalid credentials' };
        }
      } catch (e) {
        console.warn('API login failed, falling back to mock login', e);
      }
    }
    
    // Mock fallback
    set({ isLoggedIn: true });
    return { success: true };
  },
  
  logout: () => {
    localStorage.removeItem('admin_token');
    set({ isLoggedIn: false });
  },

  addProduct: async (product) => {
    const USE_API = import.meta.env.VITE_USE_API === 'true';
    const API_URL = import.meta.env.VITE_API_URL || 'http://localhost:4000';
    const token = localStorage.getItem('admin_token');
    
    if (USE_API) {
      try {
        const res = await fetch(`${API_URL}/api/admin/products`, {
          method: 'POST',
          headers: { 
            'Content-Type': 'application/json',
            ...(token ? { Authorization: `Bearer ${token}` } : {})
          } as Record<string, string>,
          body: JSON.stringify(product)
        });
        if (res.ok) {
          const createdProduct = await res.json();
          set((state) => ({ products: [...state.products, createdProduct] }));
          return;
        }
      } catch (e) {
        console.warn('API addProduct failed, falling back to mock', e);
      }
    }

    set((state) => ({
      products: [
        ...state.products,
        { ...product, id: Math.max(...state.products.map((p) => p.id), 0) + 1 },
      ],
    }));
  },

  updateProduct: async (id, data) => {
    const USE_API = import.meta.env.VITE_USE_API === 'true';
    const API_URL = import.meta.env.VITE_API_URL || 'http://localhost:4000';
    const token = localStorage.getItem('admin_token');

    if (USE_API) {
      try {
        const res = await fetch(`${API_URL}/api/admin/products/${id}`, {
          method: 'PUT',
          headers: { 
            'Content-Type': 'application/json',
            ...(token ? { Authorization: `Bearer ${token}` } : {})
          } as Record<string, string>,
          body: JSON.stringify(data)
        });
        if (res.ok) {
          const updatedProduct = await res.json();
          set((state) => ({
            products: state.products.map((p) => (p.id === id ? updatedProduct : p)),
          }));
          return;
        }
      } catch(e) {
        console.warn('API updateProduct failed, falling back to mock', e);
      }
    }

    set((state) => ({
      products: state.products.map((p) =>
        p.id === id ? { ...p, ...data } : p
      ),
    }));
  },

  deleteProduct: async (id) => {
    const USE_API = import.meta.env.VITE_USE_API === 'true';
    const API_URL = import.meta.env.VITE_API_URL || 'http://localhost:4000';
    const token = localStorage.getItem('admin_token');

    if (USE_API) {
      try {
        const res = await fetch(`${API_URL}/api/admin/products/${id}`, {
          method: 'DELETE',
          headers: { ...(token ? { Authorization: `Bearer ${token}` } : {}) } as Record<string, string>
        });
        if (res.ok) {
          set((state) => ({
            products: state.products.filter((p) => p.id !== id),
          }));
          return;
        }
      } catch(e) {
        console.warn('API deleteProduct failed, falling back to mock', e);
      }
    }

    set((state) => ({
      products: state.products.filter((p) => p.id !== id),
    }));
  },

  toggleProductActive: async (id) => {
    const USE_API = import.meta.env.VITE_USE_API === 'true';
    const API_URL = import.meta.env.VITE_API_URL || 'http://localhost:4000';
    const token = localStorage.getItem('admin_token');

    if (USE_API) {
      try {
        const res = await fetch(`${API_URL}/api/admin/products/${id}/status`, {
          method: 'PATCH',
          headers: { ...(token ? { Authorization: `Bearer ${token}` } : {}) } as Record<string, string>
        });
        if (res.ok) {
          const updatedProduct = await res.json();
          set((state) => ({
            products: state.products.map((p) => (p.id === id ? updatedProduct : p)),
          }));
          return;
        }
      } catch(e) {
        console.warn('API toggleProductActive failed, falling back to mock', e);
      }
    }

    set((state) => ({
      products: state.products.map((p) =>
        p.id === id ? { ...p, stock: p.stock > 0 ? 0 : 10 } : p
      ),
    }));
  },

  toggleProductFeatured: (id) =>
    set((state) => ({
      products: state.products.map((p) =>
        p.id === id ? { ...p, featured: !p.featured } : p
      ),
    })),

  updateOrderStatus: async (id, status) => {
    const USE_API = import.meta.env.VITE_USE_API === 'true';
    const API_URL = import.meta.env.VITE_API_URL || 'http://localhost:4000';
    const token = localStorage.getItem('admin_token');

    if (USE_API) {
      try {
        const res = await fetch(`${API_URL}/api/admin/orders/${id}/status`, {
          method: 'PATCH',
          headers: { 
            'Content-Type': 'application/json',
            ...(token ? { Authorization: `Bearer ${token}` } : {})
          } as Record<string, string>,
          body: JSON.stringify({ status })
        });
        if (res.ok) {
          const updatedOrder = await res.json();
          set((state) => ({
            orders: state.orders.map((o) => (o.id === id ? updatedOrder : o)),
          }));
          return;
        }
      } catch(e) {
        console.warn('API updateOrderStatus failed, falling back to mock', e);
      }
    }

    set((state) => ({
      orders: state.orders.map((o) =>
        o.id === id ? { ...o, status } : o
      ),
    }));
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
