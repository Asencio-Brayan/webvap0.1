import type { Order, OrderStatus, CreateOrderInput } from '@/types/order';

let orders: Order[] = [
  {
    id: 'VQ-001',
    customerName: 'Juan Perez',
    dni: '87654321',
    phone: '+51 987654321',
    city: 'Lima',
    district: 'Miraflores',
    address: 'Av. Larco 456, Dpto 301',
    reference: 'Edificio azul, timbre 301',
    items: [
      { productId: 1, name: 'Elf Bar BC5000', brand: 'Elf Bar', price: 75, quantity: 2, flavor: 'Mango Peach', nicotine: '50mg', image: '/images/product-1.jpg' },
      { productId: 5, name: 'Nasty Juice 60ml', brand: 'Nasty Juice', price: 45, quantity: 1, flavor: 'Cush Man Mango', nicotine: '3mg', image: '/images/product-5.jpg' },
    ],
    subtotal: 195,
    deliveryCost: 10,
    total: 205,
    paymentMethod: 'yape',
    status: 'pendiente',
    createdAt: new Date('2025-01-15T14:30:00'),
    ageConfirmed: true,
  },
  {
    id: 'VQ-002',
    customerName: 'Maria Garcia',
    dni: '12345678',
    phone: '+51 912345678',
    city: 'Canete',
    district: 'San Vicente',
    address: 'Calle Bolivar 123',
    reference: 'Cerca del mercado principal',
    items: [
      { productId: 3, name: 'Vaporesso XROS 3', brand: 'Vaporesso', price: 120, quantity: 1, flavor: 'Pod System', image: '/images/product-3.jpg' },
    ],
    subtotal: 120,
    deliveryCost: 15,
    total: 135,
    paymentMethod: 'plin',
    status: 'en_camino',
    createdAt: new Date('2025-01-15T11:00:00'),
    ageConfirmed: true,
  },
  {
    id: 'VQ-003',
    customerName: 'Carlos Lopez',
    dni: '45678912',
    phone: '+51 934567891',
    city: 'Ica',
    district: 'Subtanjalla',
    address: 'Av. San Martin 789',
    reference: 'Porton negro, casa de 2 pisos',
    items: [
      { productId: 2, name: 'Geek Bar Pulse', brand: 'Geek Bar', price: 85, quantity: 1, flavor: 'Strawberry Banana', nicotine: '50mg', image: '/images/product-2.jpg' },
      { productId: 6, name: 'SMOK Nord 5', brand: 'SMOK', price: 150, quantity: 1, flavor: 'Pod System', image: '/images/product-6.jpg' },
    ],
    subtotal: 235,
    deliveryCost: 20,
    total: 255,
    paymentMethod: 'transferencia',
    status: 'entregado',
    createdAt: new Date('2025-01-14T16:45:00'),
    ageConfirmed: true,
  },
];

export const mockOrders = orders;

const USE_API = import.meta.env.VITE_USE_API === 'true';
const API_URL = import.meta.env.VITE_API_URL || 'http://localhost:4000';

const getAuthHeaders = (): Record<string, string> => {
  const token = localStorage.getItem('admin_token');
  return token ? { Authorization: `Bearer ${token}` } : {};
};

export const orderRepository = {
  createOrder: async (data: CreateOrderInput): Promise<Order> => {
    if (USE_API) {
      try {
        const res = await fetch(`${API_URL}/api/orders`, {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify(data),
        });
        if (res.ok) return await res.json();
      } catch (e) {
        console.warn('API createOrder failed, falling back to mock');
      }
    }

    const newOrder: Order = {
      id: `VQ-${String(orders.length + 1).padStart(3, '0')}`,
      customerName: data.fullName,
      dni: data.dni,
      phone: data.phone,
      city: data.city,
      district: data.district,
      address: data.address,
      reference: data.reference,
      items: data.items,
      subtotal: data.subtotal,
      deliveryCost: data.deliveryCost,
      total: data.total,
      paymentMethod: data.paymentMethod,
      ageConfirmed: data.ageConfirmed,
      comments: data.comments,
      status: 'pendiente',
      createdAt: new Date(),
    };
    orders = [...orders, newOrder];
    return newOrder;
  },

  getOrders: async (): Promise<Order[]> => {
    if (USE_API) {
      try {
        const res = await fetch(`${API_URL}/api/admin/orders`, {
          headers: { ...getAuthHeaders() }
        });
        if (res.ok) return await res.json();
      } catch (e) {
        console.warn('API getOrders failed, falling back to mock');
      }
    }
    return [...orders];
  },

  getOrderById: async (id: string): Promise<Order | undefined> => {
    if (USE_API) {
      try {
        const res = await fetch(`${API_URL}/api/admin/orders`, {
          headers: { ...getAuthHeaders() }
        });
        if (res.ok) {
          const fetchedOrders = await res.json();
          return fetchedOrders.find((o: Order) => o.id === id);
        }
      } catch (e) {
        console.warn('API getOrderById failed, falling back to mock');
      }
    }
    return orders.find((o) => o.id === id);
  },

  updateOrderStatus: async (id: string, status: OrderStatus): Promise<Order> => {
    if (USE_API) {
      try {
        const res = await fetch(`${API_URL}/api/admin/orders/${id}/status`, {
          method: 'PATCH',
          headers: { 'Content-Type': 'application/json', ...getAuthHeaders() },
          body: JSON.stringify({ status })
        });
        if (res.ok) return await res.json();
      } catch(e) {
        console.warn('API updateOrderStatus failed, falling back to mock');
      }
    }

    const order = orders.find((o) => o.id === id);
    if (!order) throw new Error('Order not found');
    order.status = status;
    return order;
  },
};
