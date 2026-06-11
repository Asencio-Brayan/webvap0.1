import { supabase } from '@/lib/supabase';
import type { Order, OrderStatus, CreateOrderInput } from '@/types/order';

export const orderRepository = {
  createOrder: async (data: CreateOrderInput): Promise<Order | null> => {
    // 1. Insert Order
    const { items, ...orderData } = data;
    
    // Convert undefined to null for Supabase if needed, or just insert
    const { fullName, ...restOrderData } = orderData as any;
    const now = new Date().toISOString();

    const orderToInsert = {
      ...restOrderData,
      id: `ORD-${Date.now()}-${Math.floor(Math.random() * 1000)}`,
      customerName: fullName,
      status: 'pendiente' as OrderStatus,
      createdAt: now,
      updatedAt: now,
    };

    console.log('ORDER PAYLOAD', orderToInsert);

    const { data: orderResult, error: orderError } = await supabase
      .from('Order')
      .insert([orderToInsert])
      .select()
      .single();

    if (orderError) {
      console.error('Error creating order:', orderError);
      return null;
    }

    // 2. Insert Items
    if (items && items.length > 0) {
      console.log('RAW CART ITEMS', items);
      
      const itemsToInsert = items.map((item: any) => {
        let rawId = item.productId || item.id || '';
        let actualFlavor = item.flavor || '';

        // If it's a composite string like "14-Sour APPLE"
        if (typeof rawId === 'string' && rawId.includes('-')) {
          const parts = rawId.split('-');
          rawId = parts[0]; // just the number part
          if (!actualFlavor && parts.length > 1) {
            actualFlavor = parts.slice(1).join('-');
          }
        }

        // Force integer
        const actualProductId = parseInt(String(rawId).replace(/\D/g, ''), 10);

        const { id, ...restItem } = item;

        const payload = {
          ...restItem,
          productId: isNaN(actualProductId) ? 0 : actualProductId,
          flavor: actualFlavor,
          orderId: orderResult.id
        };
        
        return payload;
      });

      console.log('ORDER ITEM PAYLOAD', itemsToInsert);
      console.log('Type of productId:', typeof itemsToInsert[0]?.productId);

      const { error: itemsError } = await supabase
        .from('OrderItem')
        .insert(itemsToInsert);

      if (itemsError) {
        console.error('Error creating order items:', itemsError);
      }
    }

    return { ...orderResult, items } as Order;
  },

  getOrders: async (): Promise<Order[]> => {
    const { data, error } = await supabase
      .from('Order')
      .select('*, items:OrderItem(*)')
      .order('createdAt', { ascending: false });

    if (error) {
      console.error('Error fetching orders:', error);
      return [];
    }

    return data.map((o: any) => ({ ...o, createdAt: new Date(o.createdAt) }));
  },

  getOrderById: async (id: string): Promise<Order | undefined> => {
    const { data, error } = await supabase
      .from('Order')
      .select('*, items:OrderItem(*)')
      .eq('id', id)
      .single();

    if (error) {
      console.error(`Error fetching order ${id}:`, error);
      return undefined;
    }

    return { ...data, createdAt: new Date(data.createdAt) } as Order;
  },

  updateOrderStatus: async (id: string, status: OrderStatus): Promise<Order | null> => {
    const { data, error } = await supabase
      .from('Order')
      .update({ status })
      .eq('id', id)
      .select('*, items:OrderItem(*)')
      .single();

    if (error) {
      console.error('Error updating order status:', error);
      return null;
    }

    return { ...data, createdAt: new Date(data.createdAt) } as Order;
  },
};
