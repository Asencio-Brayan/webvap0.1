import { create } from 'zustand';
import type { Product } from '@/types/product';
import type { Order, OrderStatus } from '@/types/order';
import { mockProducts } from '@/repositories/productRepository';
import { mockOrders } from '@/repositories/orderRepository';

interface AdminStore {
  isLoggedIn: boolean;
  products: Product[];
  orders: Order[];
  login: () => void;
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

  login: () => set({ isLoggedIn: true }),
  logout: () => set({ isLoggedIn: false }),

  addProduct: (product) =>
    set((state) => ({
      products: [
        ...state.products,
        { ...product, id: Math.max(...state.products.map((p) => p.id), 0) + 1 },
      ],
    })),

  updateProduct: (id, data) =>
    set((state) => ({
      products: state.products.map((p) =>
        p.id === id ? { ...p, ...data } : p
      ),
    })),

  deleteProduct: (id) =>
    set((state) => ({
      products: state.products.filter((p) => p.id !== id),
    })),

  toggleProductActive: (id) =>
    set((state) => ({
      products: state.products.map((p) =>
        p.id === id ? { ...p, stock: p.stock > 0 ? 0 : 10 } : p
      ),
    })),

  toggleProductFeatured: (id) =>
    set((state) => ({
      products: state.products.map((p) =>
        p.id === id ? { ...p, featured: !p.featured } : p
      ),
    })),

  updateOrderStatus: (id, status) =>
    set((state) => ({
      orders: state.orders.map((o) =>
        o.id === id ? { ...o, status } : o
      ),
    })),

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
