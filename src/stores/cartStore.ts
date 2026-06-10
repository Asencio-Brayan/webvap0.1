import { create } from 'zustand';
import { persist } from 'zustand/middleware';

export interface CartItem {
  id: string;
  productId: number;
  name: string;
  brand: string;
  price: number;
  image: string;
  flavor: string;
  nicotine?: string;
  quantity: number;
}

export type DeliveryCity = 'Lima' | 'Canete' | 'Chincha' | 'Ica' | 'Otras ciudades';

interface CartStore {
  items: CartItem[];
  deliveryCity: DeliveryCity;
  addItem: (item: Omit<CartItem, 'quantity' | 'id'>) => void;
  removeItem: (id: string) => void;
  updateQuantity: (id: string, quantity: number) => void;
  clearCart: () => void;
  setDeliveryCity: (city: DeliveryCity) => void;
  getSubtotal: () => number;
  getDeliveryCost: () => number;
  getTotal: () => number;
  getItemCount: () => number;
}

export const useCartStore = create<CartStore>()(
  persist(
    (set, get) => ({
      items: [],
      deliveryCity: 'Lima',

      addItem: (item) => {
        const { items } = get();
        const cartItemId = `${item.productId}-${item.flavor}`;
        const existing = items.find((i) => i.id === cartItemId);
        if (existing) {
          set({
            items: items.map((i) =>
              i.id === cartItemId
                ? { ...i, quantity: i.quantity + 1 }
                : i
            ),
          });
        } else {
          set({ items: [...items, { ...item, id: cartItemId, quantity: 1 }] });
        }
      },

      removeItem: (id) => {
        set({ items: get().items.filter((i) => i.id !== id) });
      },

      updateQuantity: (id, quantity) => {
        if (quantity <= 0) {
          get().removeItem(id);
          return;
        }
        set({
          items: get().items.map((i) =>
            i.id === id ? { ...i, quantity } : i
          ),
        });
      },

      clearCart: () => set({ items: [] }),

      setDeliveryCity: (city) => set({ deliveryCity: city }),

      getSubtotal: () =>
        get().items.reduce((sum, item) => sum + item.price * item.quantity, 0),

      getDeliveryCost: () => {
        return 0;
      },

      getTotal: () => {
        const store = get();
        return store.getSubtotal() + store.getDeliveryCost();
      },

      getItemCount: () =>
        get().items.reduce((sum, item) => sum + item.quantity, 0),
    }),
    {
      name: 'auravapes-cart',
      partialize: (state) => ({
        items: state.items,
        deliveryCity: state.deliveryCity,
      }),
    }
  )
);
