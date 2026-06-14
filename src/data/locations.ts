export interface LocationSEO {
  slug: string;
  name: string;
  metaTitle: string;
  metaDescription: string;
  h1: string;
  introduction: string;
  localText: string;
  faqs: { question: string; answer: string }[];
}

export const locations: Record<string, LocationSEO> = {
  lima: {
    slug: 'lima',
    name: 'Lima',
    metaTitle: 'Vapes en Lima | Pods y Desechables Originales - AuraVapes',
    metaDescription: 'Compra vapes desechables y pods originales en Lima Metropolitana. Las mejores marcas con entregas coordinadas seguras en toda la ciudad.',
    h1: 'Tu Tienda de Vapes en Lima',
    introduction: 'Encuentra la mejor variedad de dispositivos de vapeo en la capital.',
    localText: 'Distribuimos productos 100% originales para los vapeadores limeños. Ya sea que te encuentres en Miraflores, San Isidro, Los Olivos o Surco, nuestro servicio de entrega te permite tener tu equipo favorito de manera rápida y discreta. Trabajamos con marcas top mundiales garantizando autenticidad.',
    faqs: [
      { question: '¿En qué zonas de Lima Metropolitana entregan?', answer: 'Realizamos entregas coordinadas en puntos céntricos, estaciones del Metropolitano y centros comerciales principales de Lima. Escríbenos al WhatsApp para confirmar.' },
      { question: '¿Venden vapes desechables al por mayor en Lima?', answer: 'Actualmente nos enfocamos en brindar el mejor servicio al detalle para clientes finales en la ciudad.' }
    ]
  },
  canete: {
    slug: 'canete',
    name: 'Cañete',
    metaTitle: 'Comprar Vapes en Cañete | Pods y Desechables - AuraVapes',
    metaDescription: '¿Buscas vapes en Cañete? Compra dispositivos desechables y pods. Marcas destacadas con entrega coordinada en el centro.',
    h1: 'Tienda Especializada en Vapes en Cañete',
    introduction: 'La alternativa líder para la comunidad de vapeo en San Vicente de Cañete y alrededores.',
    localText: 'Entendemos lo difícil que puede ser conseguir equipos sellados y originales en el sur chico. Por eso, hemos optimizado nuestra logística para atender a los residentes de Cañete, asegurando que disfruten de la mejor tecnología en pods recargables y desechables sin tener que viajar a Lima.',
    faqs: [
      { question: '¿Cuánto demora la entrega en el centro de Cañete?', answer: 'Coordinamos entregas casi inmediatas o para el mismo día en la plaza principal y zonas seguras de San Vicente de Cañete.' },
      { question: '¿Puedo pagar en efectivo al recibir en Cañete?', answer: 'Sí, previa coordinación por WhatsApp aceptamos pago contraentrega en efectivo o mediante Yape/Plin.' }
    ]
  },
  chincha: {
    slug: 'chincha',
    name: 'Chincha',
    metaTitle: 'Vapes Chincha | Cigarrillos Electrónicos Originales - AuraVapes',
    metaDescription: 'Los mejores vapes desechables y recargables en Chincha. Entregas coordinadas rápidas. Catálogo completo de Smok, RELX y Vookbar.',
    h1: 'Vapes y Pods en Chincha',
    introduction: 'Disfruta de la mejor experiencia de vapeo sin salir de la provincia de Chincha.',
    localText: 'Ofrecemos a la comunidad chinchana acceso directo a las últimas novedades del mercado internacional de vapeo. Desde dispositivos de 10,000 puffs hasta sales de nicotina premium, todo respaldado por la garantía de ser productos verificables y totalmente nuevos.',
    faqs: [
      { question: '¿Hacen entregas cerca a la Plaza de Armas de Chincha Alta?', answer: 'Sí, nuestro punto de coordinación principal suele ser cerca a la plaza o lugares muy céntricos de Chincha Alta.' },
      { question: '¿Cuáles son los equipos más vendidos en Chincha?', answer: 'Los dispositivos desechables de alta capacidad de marcas como Snowplus y Smok son muy populares aquí por su gran rendimiento.' }
    ]
  },
  pisco: {
    slug: 'pisco',
    name: 'Pisco',
    metaTitle: 'Vapes en Pisco | Pods y Desechables Originales - AuraVapes',
    metaDescription: 'Encuentra vapes originales en Pisco. Entrega rápida, segura y atención personalizada por WhatsApp. Descubre nuestra colección.',
    h1: 'Los Mejores Vapes en Pisco',
    introduction: 'Soluciones de vapeo de primera categoría para toda la provincia pisqueña.',
    localText: 'Si te encuentras en Pisco, ya no tienes que conformarte con pocas opciones. AuraVapes trae a tu ciudad una extensa variedad de marcas reconocidas globalmente. Brindamos un proceso de compra directo y transparente, protegiendo a los usuarios de falsificaciones.',
    faqs: [
      { question: '¿Llegan a Paracas o solo al centro de Pisco?', answer: 'Nuestro radio principal de entrega coordinada es Pisco cercado. Para Paracas u otros distritos, podemos enviarlo por agencia.' },
      { question: '¿Tienen stock para entrega inmediata en Pisco?', answer: 'Trabajamos con un sistema ágil. Contáctanos por WhatsApp para revisar la disponibilidad del sabor y marca que buscas para hoy mismo.' }
    ]
  },
  ica: {
    slug: 'ica',
    name: 'Ica',
    metaTitle: 'Vapes Ica | La Mejor Tienda de Vapes Originales - AuraVapes',
    metaDescription: 'Tu tienda de vapes de confianza en la región Ica. Compra vapes, líquidos y recargables. Atención rápida y entregas garantizadas.',
    h1: 'Tienda de Vapes y Pods en Ica',
    introduction: 'El mayor catálogo de productos de vapeo disponible para la calurosa ciudad de Ica.',
    localText: 'Sabemos que el público iqueño valora la calidad. Por ello, hemos establecido una ruta de abastecimiento que nos permite ofrecer los últimos modelos de RELX, Vookbar y Smok. Calidad superior, asesoría en tiempo real y precios justos en tu misma ciudad.',
    faqs: [
      { question: '¿Cómo coordino mi entrega en Ica Metropolitana?', answer: 'Haz tu pedido en nuestra plataforma y te contactaremos por WhatsApp para acordar un punto de encuentro seguro cerca a ti.' },
      { question: '¿Venden e-liquids para recargables en Ica?', answer: 'Por supuesto, contamos con líquidos de variados sabores y niveles de nicotina ideales para cualquier pod recargable.' }
    ]
  }
};
