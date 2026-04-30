import { create } from 'zustand';
import { persist } from 'zustand/middleware';

export interface CartItem {
  productId: number;
  name: string;
  brand: string;
  price: number;
  image: string;
  flavor: string;
  nicotine?: string;
  quantity: number;
}

interface CartStore {
  items: CartItem[];
  deliveryCity: 'Lima' | 'Canete' | 'Chincha' | 'Ica';
  addItem: (item: Omit<CartItem, 'quantity'>) => void;
  removeItem: (productId: number) => void;
  updateQuantity: (productId: number, quantity: number) => void;
  clearCart: () => void;
  setDeliveryCity: (city: 'Lima' | 'Canete' | 'Chincha' | 'Ica') => void;
  getSubtotal: () => number;
  getDeliveryCost: () => number;
  getTotal: () => number;
  getItemCount: () => number;
}

const deliveryCosts: Record<string, number> = {
  Lima: 10,
  Canete: 15,
  Chincha: 18,
  Ica: 20,
};

export const useCartStore = create<CartStore>()(
  persist(
    (set, get) => ({
      items: [],
      deliveryCity: 'Lima',

      addItem: (item) => {
        const { items } = get();
        const existing = items.find((i) => i.productId === item.productId);
        if (existing) {
          set({
            items: items.map((i) =>
              i.productId === item.productId
                ? { ...i, quantity: i.quantity + 1 }
                : i
            ),
          });
        } else {
          set({ items: [...items, { ...item, quantity: 1 }] });
        }
      },

      removeItem: (productId) => {
        set({ items: get().items.filter((i) => i.productId !== productId) });
      },

      updateQuantity: (productId, quantity) => {
        if (quantity <= 0) {
          get().removeItem(productId);
          return;
        }
        set({
          items: get().items.map((i) =>
            i.productId === productId ? { ...i, quantity } : i
          ),
        });
      },

      clearCart: () => set({ items: [] }),

      setDeliveryCity: (city) => set({ deliveryCity: city }),

      getSubtotal: () =>
        get().items.reduce((sum, item) => sum + item.price * item.quantity, 0),

      getDeliveryCost: () => {
        const { items, deliveryCity } = get();
        if (items.length === 0) return 0;
        return deliveryCosts[deliveryCity] || 10;
      },

      getTotal: () => {
        const store = get();
        return store.getSubtotal() + store.getDeliveryCost();
      },

      getItemCount: () =>
        get().items.reduce((sum, item) => sum + item.quantity, 0),
    }),
    {
      name: 'vapequest-cart',
      partialize: (state) => ({
        items: state.items,
        deliveryCity: state.deliveryCity,
      }),
    }
  )
);
