import type { Product, ProductCategory, ProductFilters } from '@/types/product';

export const mockProducts: Product[] = [
  {
    id: 1,
    name: 'Elf Bar BC5000',
    brand: 'Elf Bar',
    category: 'desechables',
    price: 75,
    flavor: 'Mango Peach',
    nicotine: 50,
    stock: 24,
    featured: true,
    image: '/images/product-1.jpg',
    description: 'El Elf Bar BC5000 ofrece una experiencia de vapeo premium con su diseño compacto y sabores intensos. Hasta 5000 puffs de puro disfrute con cada dispositivo.',
    specs: { 'Puff Count': '5000', Capacidad: '13ml', Bateria: '650mAh', Resistencia: 'Dual Mesh' },
    images: ['/images/product-1.jpg'],
  },
  {
    id: 2,
    name: 'Geek Bar Pulse',
    brand: 'Geek Bar',
    category: 'desechables',
    price: 85,
    flavor: 'Strawberry Banana',
    nicotine: 50,
    stock: 18,
    featured: true,
    image: '/images/product-2.jpg',
    description: 'Geek Bar Pulse revoluciona los vapes desechables con su modo Pulse que potencia el sabor. Pantalla LED y hasta 7500 puffs en modo regular.',
    specs: { 'Puff Count': '7500', Capacidad: '16ml', Bateria: '650mAh', Resistencia: 'Dual Mesh' },
    images: ['/images/product-2.jpg'],
  },
  {
    id: 3,
    name: 'Vaporesso XROS 3',
    brand: 'Vaporesso',
    category: 'recargables',
    price: 120,
    flavor: 'Pod System',
    stock: 12,
    featured: true,
    image: '/images/product-3.jpg',
    description: 'El Vaporesso XROS 3 es un kit de pod recargable con tecnologia AXON CHIP. Diseno elegante, bateria de 1000mAh y pods de 2ml recargables.',
    specs: { Bateria: '1000mAh', Capacidad: '2ml', Resistencia: '0.6 / 1.0 ohm', Potencia: '11-16W' },
    images: ['/images/product-3.jpg'],
  },
  {
    id: 4,
    name: 'Lost Mary OS5000',
    brand: 'Lost Mary',
    category: 'desechables',
    price: 80,
    flavor: 'Blueberry Ice',
    nicotine: 50,
    stock: 31,
    featured: true,
    image: '/images/product-4.jpg',
    description: 'Lost Mary OS5000 combina estilo y sabor en un dispositivo desechable de alta gama. Hasta 5000 puffs con sabores refrescantes y un diseno unico.',
    specs: { 'Puff Count': '5000', Capacidad: '13ml', Bateria: '650mAh', Resistencia: 'Mesh' },
    images: ['/images/product-4.jpg'],
  },
  {
    id: 5,
    name: 'Nasty Juice 60ml',
    brand: 'Nasty Juice',
    category: 'liquidos',
    price: 45,
    flavor: 'Cush Man Mango',
    nicotine: 3,
    stock: 45,
    featured: true,
    image: '/images/product-5.jpg',
    description: 'Nasty Juice Cush Man Mango es un e-liquid premium con el sabor tropical del mango maduro. Formula de alta calidad para un vapeo suave y lleno de sabor.',
    specs: { Tamano: '60ml', 'VG/PG': '70/30', Nicotina: '3mg', Tipo: 'Freebase' },
    images: ['/images/product-5.jpg'],
  },
  {
    id: 6,
    name: 'SMOK Nord 5',
    brand: 'SMOK',
    category: 'recargables',
    price: 150,
    flavor: 'Pod System',
    stock: 8,
    featured: true,
    image: '/images/product-6.jpg',
    description: 'SMOK Nord 5 es un pod mod potente con bateria integrada de 2000mAh y potencia de hasta 80W. Compatible con las resistencias RPM 3 para un sabor excepcional.',
    specs: { Bateria: '2000mAh', Capacidad: '5ml', Potencia: '5-80W', Resistencia: '0.15 / 0.23 ohm' },
    images: ['/images/product-6.jpg'],
  },
  {
    id: 7,
    name: 'HQD Cuvie Plus',
    brand: 'HQD',
    category: 'desechables',
    price: 55,
    flavor: 'Grapey',
    nicotine: 50,
    stock: 56,
    featured: true,
    image: '/images/product-7.jpg',
    description: 'HQD Cuvie Plus es un vape desechable accesible y confiable. Hasta 1200 puffs de sabor intenso en un dispositivo compacto y facil de usar.',
    specs: { 'Puff Count': '1200', Capacidad: '5ml', Bateria: '950mAh', Resistencia: '1.8 ohm' },
    images: ['/images/product-7.jpg'],
  },
  {
    id: 8,
    name: 'Just Juice 60ml',
    brand: 'Just Juice',
    category: 'liquidos',
    price: 50,
    flavor: 'Berry Burst',
    nicotine: 6,
    stock: 33,
    featured: true,
    image: '/images/product-8.jpg',
    description: 'Just Juice Berry Burst ofrece una explosion de bayas en cada vapeada. Mezcla de frutos rojos con un toque de dulzura perfectamente balanceado.',
    specs: { Tamano: '60ml', 'VG/PG': '70/30', Nicotina: '6mg', Tipo: 'Freebase' },
    images: ['/images/product-8.jpg'],
  },
  {
    id: 9,
    name: 'Hyppe Max Flow',
    brand: 'Hyppe',
    category: 'desechables',
    price: 65,
    flavor: 'Lush Ice',
    nicotine: 50,
    stock: 22,
    featured: false,
    image: '/images/product-9.jpg',
    description: 'Hyppe Max Flow trae un aire flow control ajustable para personalizar tu experiencia. Hasta 2000 puffs de sabor refrescante de sandia y menta.',
    specs: { 'Puff Count': '2000', Capacidad: '6ml', Bateria: '900mAh', Resistencia: '1.6 ohm' },
    images: ['/images/product-9.jpg'],
  },
  {
    id: 10,
    name: 'Voopoo Drag X Plus',
    brand: 'Voopoo',
    category: 'recargables',
    price: 180,
    flavor: 'Kit Completo',
    stock: 6,
    featured: false,
    image: '/images/product-10.jpg',
    description: 'Voopoo Drag X Plus es un kit profesional con potencia de hasta 100W. Bateria 18650/21700 intercambiable y el chip GENE.FAN 2.0 para respuesta instantanea.',
    specs: { Bateria: '18650/21750', Capacidad: '5.5ml', Potencia: '5-100W', Resistencia: '0.2 / 0.3 ohm' },
    images: ['/images/product-10.jpg'],
  },
  {
    id: 11,
    name: 'Caliburn G2',
    brand: 'Uwell',
    category: 'recargables',
    price: 95,
    flavor: 'Pod System',
    stock: 15,
    featured: false,
    image: '/images/product-11.jpg',
    description: 'Uwell Caliburn G2 mejora lo mejor del Caliburn original con rueda de ajuste de airflow y vibracion haptica. Pods recargables de 2ml con sabor excepcional.',
    specs: { Bateria: '750mAh', Capacidad: '2ml', Potencia: '18W', Resistencia: '0.8 / 1.2 ohm' },
    images: ['/images/product-11.jpg'],
  },
  {
    id: 12,
    name: 'Dinner Lady 60ml',
    brand: 'Dinner Lady',
    category: 'liquidos',
    price: 55,
    flavor: 'Lemon Tart',
    nicotine: 3,
    stock: 28,
    featured: false,
    image: '/images/product-12.jpg',
    description: 'Dinner Lady Lemon Tart es un clasico atemporal. La mezcla perfecta de limon merengue y base de pastry que te transporta a una pasteleria britanica.',
    specs: { Tamano: '60ml', 'VG/PG': '70/30', Nicotina: '3mg', Tipo: 'Freebase' },
    images: ['/images/product-12.jpg'],
  },
  {
    id: 13,
    name: 'Voopoo Vinci Q',
    brand: 'Voopoo',
    category: 'pods',
    price: 70,
    flavor: 'Pod System',
    stock: 19,
    featured: false,
    image: '/images/product-13.jpg',
    description: 'Voopoo Vinci Q es un pod system ultra compacto con bateria de 900mAh. Diseno transparente que muestra el nivel de liquido. Ideal para principiantes.',
    specs: { Bateria: '900mAh', Capacidad: '2ml', Potencia: '15W', Resistencia: '1.0 ohm' },
    images: ['/images/product-13.jpg'],
  },
  {
    id: 14,
    name: 'Pacha Mama 60ml',
    brand: 'Pacha Mama',
    category: 'liquidos',
    price: 48,
    flavor: 'Fuji Apple',
    nicotine: 3,
    stock: 37,
    featured: false,
    image: '/images/product-14.jpg',
    description: 'Pacha Mama Fuji Apple mezcla manzana Fuji, fresa y nectarina. Un e-liquid refrescante y frutal de Charlie\'s Chalk Dust con calidad premium.',
    specs: { Tamano: '60ml', 'VG/PG': '80/20', Nicotina: '3mg', Tipo: 'Freebase' },
    images: ['/images/product-14.jpg'],
  },
  {
    id: 15,
    name: 'SMOK RPM 4',
    brand: 'SMOK',
    category: 'recargables',
    price: 140,
    flavor: 'Kit',
    stock: 9,
    featured: false,
    image: '/images/product-15.jpg',
    description: 'SMOK RPM 4 es un pod mod con potencia de hasta 60W y bateria de 1650mAh. Compatible con las series RPM y LP2 para maxima versatilidad.',
    specs: { Bateria: '1650mAh', Capacidad: '5ml', Potencia: '5-60W', Resistencia: '0.23 / 0.4 ohm' },
    images: ['/images/product-15.jpg'],
  },
  {
    id: 16,
    name: 'Fume Infinity',
    brand: 'Fume',
    category: 'desechables',
    price: 90,
    flavor: 'Strawberry Mango',
    nicotine: 50,
    stock: 14,
    featured: false,
    image: '/images/product-16.jpg',
    description: 'Fume Infinity ofrece hasta 3500 puffs con su tecnologia de doble chip. Sabores intensos y consistentes de principio a fin en un diseno ergononico.',
    specs: { 'Puff Count': '3500', Capacidad: '12ml', Bateria: '1500mAh', Resistencia: 'Mesh' },
    images: ['/images/product-16.jpg'],
  },
  {
    id: 17,
    name: 'Coil Master Kit',
    brand: 'Coil Master',
    category: 'accesorios',
    price: 60,
    flavor: 'Toolkit',
    stock: 8,
    featured: false,
    image: '/images/product-17.jpg',
    description: 'Coil Master Kit es el set de herramientas esencial para builders. Incluye alicates ceramicos, cortadores, pinzas, medidor de ohmios y estuche organizador.',
    specs: { Contenido: '10 herramientas', Material: 'Acero inoxidable', Estuche: 'EVA zippered', Peso: '380g' },
    images: ['/images/product-17.jpg'],
  },
  {
    id: 18,
    name: 'Nasty Juice Bad Blood',
    brand: 'Nasty Juice',
    category: 'liquidos',
    price: 45,
    flavor: 'Bad Blood',
    nicotine: 6,
    stock: 42,
    featured: false,
    image: '/images/product-18.jpg',
    description: 'Nasty Juice Bad Blood trae el intenso sabor de la uva negra con un toque mentolado. Una experiencia oscura y refrescante en cada vapeada.',
    specs: { Tamano: '60ml', 'VG/PG': '70/30', Nicotina: '6mg', Tipo: 'Freebase' },
    images: ['/images/product-18.jpg'],
  },
  {
    id: 19,
    name: 'Geek Bar Meloso',
    brand: 'Geek Bar',
    category: 'desechables',
    price: 80,
    flavor: 'Tropical Rainbow Blast',
    nicotine: 50,
    stock: 20,
    featured: false,
    image: '/images/product-19.jpg',
    description: 'Geek Bar Meloso es un vape desechable con sabor tropical explosivo. Hasta 5000 puffs con tecnologia de doble malla para sabor consistente.',
    specs: { 'Puff Count': '5000', Capacidad: '14ml', Bateria: '500mAh', Resistencia: 'Dual Mesh' },
    images: ['/images/product-19.jpg'],
  },
  {
    id: 20,
    name: 'Uwell Caliburn A2',
    brand: 'Uwell',
    category: 'recargables',
    price: 85,
    flavor: 'Pod System',
    stock: 11,
    featured: false,
    image: '/images/product-20.jpg',
    description: 'Uwell Caliburn A2 es la evolucion del legendario Caliburn. Sistema de activacion por inhalacion o boton, pods de 2ml con relleno superior y sabor PRO-FOCS.',
    specs: { Bateria: '520mAh', Capacidad: '2ml', Potencia: '15W', Resistencia: '0.9 ohm' },
    images: ['/images/product-20.jpg'],
  },
];

const USE_API = import.meta.env.VITE_USE_API === 'true';
const API_URL = import.meta.env.VITE_API_URL || 'http://localhost:4000';

const getAllProducts = async (): Promise<Product[]> => {
  if (USE_API) {
    try {
      const res = await fetch(`${API_URL}/api/products`);
      if (res.ok) {
        return await res.json();
      }
    } catch (e) {
      console.warn('API fetch failed, falling back to mock data', e);
    }
  }
  return [...mockProducts];
};

export const productRepository = {
  getProducts: async (filters?: ProductFilters): Promise<Product[]> => {
    let result = await getAllProducts();

    if (filters?.categories?.length) {
      result = result.filter((p) => filters.categories!.includes(p.category));
    }

    if (filters?.minPrice !== undefined) {
      result = result.filter((p) => p.price >= filters.minPrice!);
    }

    if (filters?.maxPrice !== undefined) {
      result = result.filter((p) => p.price <= filters.maxPrice!);
    }

    if (filters?.inStock) {
      result = result.filter((p) => p.stock > 0);
    }

    if (filters?.search) {
      const q = filters.search.toLowerCase();
      result = result.filter(
        (p) =>
          p.name.toLowerCase().includes(q) ||
          p.brand.toLowerCase().includes(q) ||
          p.flavor.toLowerCase().includes(q)
      );
    }

    if (filters?.sort) {
      switch (filters.sort) {
        case 'price_asc':
          result.sort((a, b) => a.price - b.price);
          break;
        case 'price_desc':
          result.sort((a, b) => b.price - a.price);
          break;
        case 'newest':
          result.sort((a, b) => b.id - a.id);
          break;
        case 'bestseller':
          result.sort((a, b) => b.stock - a.stock);
          break;
      }
    }

    return result;
  },

  getProductById: async (id: number): Promise<Product | undefined> => {
    if (USE_API) {
      try {
        const res = await fetch(`${API_URL}/api/products/${id}`);
        if (res.ok) {
          return await res.json();
        }
      } catch (e) {
        console.warn(`Failed to fetch product ${id}, falling back to mock`, e);
      }
    }
    return mockProducts.find((p) => p.id === id);
  },

  getFeaturedProducts: async (): Promise<Product[]> => {
    const products = await getAllProducts();
    return products.filter((p) => p.featured);
  },

  getProductsByCategory: async (category: ProductCategory): Promise<Product[]> => {
    const products = await getAllProducts();
    return products.filter((p) => p.category === category);
  },

  searchProducts: async (query: string): Promise<Product[]> => {
    const q = query.toLowerCase();
    const products = await getAllProducts();
    return products.filter(
      (p) =>
        p.name.toLowerCase().includes(q) ||
        p.brand.toLowerCase().includes(q) ||
        p.flavor.toLowerCase().includes(q)
    );
  },
};
