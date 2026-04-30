export type OrderStatus = 'pendiente' | 'confirmado' | 'en_camino' | 'entregado' | 'cancelado';

export interface OrderItem {
  productId: number;
  name: string;
  brand: string;
  price: number;
  quantity: number;
  flavor: string;
  nicotine?: string;
  image: string;
}

export interface Order {
  id: string;
  customerName: string;
  dni: string;
  phone: string;
  city: string;
  district: string;
  address: string;
  reference?: string;
  items: OrderItem[];
  subtotal: number;
  deliveryCost: number;
  total: number;
  paymentMethod: string;
  status: OrderStatus;
  createdAt: Date;
  ageConfirmed: boolean;
  comments?: string;
}

export interface CreateOrderInput {
  fullName: string;
  dni: string;
  phone: string;
  city: string;
  district: string;
  address: string;
  reference?: string;
  paymentMethod: string;
  ageConfirmed: boolean;
  comments?: string;
  items: OrderItem[];
  subtotal: number;
  deliveryCost: number;
  total: number;
}
