import headphonesImg from "@/assets/products/headphones.jpg";
import keyboardImg from "@/assets/products/keyboard.jpg";
import phoneImg from "@/assets/products/phone.jpg";
import smartwatchImg from "@/assets/products/smartwatch.jpg";
import earbudsImg from "@/assets/products/earbuds.jpg";
import speakerImg from "@/assets/products/speaker.jpg";
import mouseImg from "@/assets/products/mouse.jpg";
import microphoneImg from "@/assets/products/microphone.jpg";
import powerbankImg from "@/assets/products/powerbank.jpg";
import monitorImg from "@/assets/products/monitor.jpg";
import laptopStandImg from "@/assets/products/laptop-stand.jpg";
import chargerImg from "@/assets/products/charger.jpg";

export type CategoryId = "tecnologia" | "audio" | "celulares" | "accesorios";

export interface Category {
  id: CategoryId;
  label: string;
}

export const categories: Category[] = [
  { id: "tecnologia", label: "Tecnología" },
  { id: "audio", label: "Audio" },
  { id: "celulares", label: "Celulares" },
  { id: "accesorios", label: "Accesorios" },
];

export const categoryLabel = (id: string) =>
  categories.find((c) => c.id === id)?.label ?? id;

export interface Product {
  id: string;
  name: string;
  brand: string;
  category: CategoryId;
  price: number;
  originalPrice?: number;
  rating: number;
  reviews: number;
  stock: number;
  shortDescription: string;
  description: string;
  features: string[];
  image: string;
  isNew?: boolean;
  freeShipping?: boolean;
}

export const products: Product[] = [
  {
    id: "aurora-pro-anc",
    name: "Audífonos Aurora Pro ANC",
    brand: "Aurora",
    category: "audio",
    price: 349,
    originalPrice: 449,
    rating: 4.8,
    reviews: 234,
    stock: 12,
    shortDescription: "Cancelación activa de ruido y 40 h de batería.",
    description:
      "Los Aurora Pro ANC combinan cancelación activa de ruido híbrida con drivers de 40 mm afinados para un sonido cálido y detallado. Su batería de 40 horas te acompaña toda la semana, y el modo transparencia te mantiene atento a tu entorno con una sola pulsación.",
    features: [
      "Cancelación activa de ruido híbrida",
      "40 h de batería con carga rápida",
      "Bluetooth 5.3 multipunto",
      "Almohadillas de espuma viscoelástica",
    ],
    image: headphonesImg,
    freeShipping: true,
  },
  {
    id: "keyforge-tkl",
    name: "Teclado mecánico KeyForge TKL",
    brand: "KeyForge",
    category: "tecnologia",
    price: 259,
    originalPrice: 299,
    rating: 4.7,
    reviews: 156,
    stock: 8,
    shortDescription: "Switches táctiles, retroiluminación blanca y perilla giratoria.",
    description:
      "Formato 65% sin sacrificar la fila de navegación. Switches táctiles pre-lubricados, montaje gasket para una escritura suave y una perilla giratoria de aluminio para controlar el volumen al instante. Compatible con Windows, macOS y Linux.",
    features: [
      "Switches táctiles pre-lubricados",
      "Montaje gasket con espuma acústica",
      "Perilla de volumen de aluminio",
      "Cable USB-C desmontable",
    ],
    image: keyboardImg,
    freeShipping: true,
  },
  {
    id: "nova-x5",
    name: "Smartphone Nova X5 · 128 GB",
    brand: "Nova",
    category: "celulares",
    price: 1299,
    originalPrice: 1499,
    rating: 4.6,
    reviews: 512,
    stock: 5,
    shortDescription: "Pantalla AMOLED 120 Hz y cámara triple de 50 MP.",
    description:
      "El Nova X5 trae una pantalla AMOLED de 6.7\" a 120 Hz, un procesador de 8 núcleos preparado para gaming y una cámara triple de 50 MP con estabilización óptica. Batería de 5000 mAh con carga rápida de 67 W para pasar el día sin despeguar.",
    features: [
      "Pantalla AMOLED 6.7\" · 120 Hz",
      "Cámara triple 50 MP con OIS",
      "Batería 5000 mAh · carga 67 W",
      "128 GB de almacenamiento",
    ],
    image: phoneImg,
    freeShipping: true,
  },
  {
    id: "pulse-fit-s2",
    name: "Smartwatch Pulse Fit S2",
    brand: "Pulse",
    category: "tecnologia",
    price: 199,
    originalPrice: 259,
    rating: 4.5,
    reviews: 320,
    stock: 20,
    shortDescription: "GPS integrado, oxígeno en sangre y 10 días de autonomía.",
    description:
      "Monitoriza frecuencia cardíaca, SpO2 y sueño con precisión médica. El Pulse Fit S2 incluye GPS para registrar tus carreras sin celular, más de 100 modos deportivos y una batería que dura hasta 10 días por carga.",
    features: [
      "GPS integrado y 100+ modos deportivos",
      "Monitoreo de SpO2 y sueño",
      "Hasta 10 días de batería",
      "Resistencia 5 ATM",
    ],
    image: smartwatchImg,
    isNew: true,
  },
  {
    id: "echobuds-air",
    name: "EchoBuds Air TWS",
    brand: "Echo",
    category: "audio",
    price: 129,
    originalPrice: 159,
    rating: 4.4,
    reviews: 208,
    stock: 35,
    shortDescription: "Audífonos inalámbricos con estuche de carga rápida.",
    description:
      "Compactos, cómodos y con un sonido sorprendentemente completo. Los EchoBuds Air emparejan al instante, resisten salpicaduras (IPX4) y el estuche entrega 24 h adicionales de reproducción con carga rápida USB-C.",
    features: [
      "Bluetooth 5.3 · emparejamiento instantáneo",
      "24 h con estuche de carga",
      "Resistencia IPX4",
      "Carga rápida USB-C",
    ],
    image: earbudsImg,
  },
  {
    id: "boombox-mini",
    name: "Bocina Bluetooth BoomBox Mini",
    brand: "BoomBox",
    category: "audio",
    price: 179,
    rating: 4.6,
    reviews: 98,
    stock: 15,
    shortDescription: "Sonido 360°, 12 h de música y resistencia IP67.",
    description:
      "La BoomBox Mini llena la habitación (o la playa) con sonido envolvente de 360° y graves profundos. Resistente al agua y al polvo con certificación IP67, incluye correa trenzada para llevarla a todas partes.",
    features: [
      "Sonido 360° con pasivo radial",
      "12 h de batería",
      "Certificación IP67 (agua y polvo)",
      "Emparejamiento estéreo dual",
    ],
    image: speakerImg,
    freeShipping: true,
  },
  {
    id: "vector-g7",
    name: "Mouse gamer Vector G7",
    brand: "Vector",
    category: "tecnologia",
    price: 149,
    originalPrice: 189,
    rating: 4.7,
    reviews: 174,
    stock: 25,
    shortDescription: "Sensor 26 000 DPI, 65 g e inalámbrico de baja latencia.",
    description:
      "Con solo 65 gramos y un sensor óptico de 26 000 DPI, el Vector G7 responde a cada movimiento con precisión quirúrgica. Su conexión inalámbrica de 2.4 GHz ofrece latencia de 1 ms, con autonomía de 70 horas.",
    features: [
      "Sensor óptico 26 000 DPI",
      "Latencia 1 ms vía 2.4 GHz",
      "Solo 65 g · 70 h de batería",
      "Switches ópticos de 100 M de clics",
    ],
    image: mouseImg,
  },
  {
    id: "streamcast-mic",
    name: "Micrófono USB StreamCast",
    brand: "StreamCast",
    category: "audio",
    price: 289,
    rating: 4.8,
    reviews: 67,
    stock: 10,
    shortDescription: "Cápsula condensadora con control de ganancia y monitoreo.",
    description:
      "Calidad de estudio en tu escritorio. La cápsula condensadora de 14 mm captura voces claras y con cuerpo, mientras el control de ganancia física y el monitoreo sin latencia te dan control total del sonido en streaming, podcast o videollamadas.",
    features: [
      "Cápsula condensadora de 14 mm",
      "Control de ganancia y silencio en el cuerpo",
      "Monitoreo sin latencia (jack 3.5 mm)",
      "Trípode de mesa incluido",
    ],
    image: microphoneImg,
    isNew: true,
  },
  {
    id: "voltcore-20k",
    name: "Power bank VoltCore 20K",
    brand: "VoltCore",
    category: "accesorios",
    price: 89,
    originalPrice: 119,
    rating: 4.5,
    reviews: 421,
    stock: 40,
    shortDescription: "20 000 mAh con carga rápida de 22.5 W y doble salida.",
    description:
      "Carga tu celular hasta 4 veces con el VoltCore 20K. Doble salida USB-C + USB-A con carga rápida de 22.5 W, indicadores LED de nivel de batería y protección multicapa contra sobrecarga y corto circuito.",
    features: [
      "20 000 mAh · hasta 4 cargas",
      "Carga rápida 22.5 W (USB-C PD)",
      "Indicadores LED de nivel",
      "Protección contra sobrecarga",
    ],
    image: powerbankImg,
  },
  {
    id: "viewedge-27",
    name: 'Monitor ViewEdge 27" QHD',
    brand: "ViewEdge",
    category: "tecnologia",
    price: 749,
    originalPrice: 849,
    rating: 4.7,
    reviews: 88,
    stock: 6,
    shortDescription: "QHD 165 Hz, borde a borde y soporte ergonómico.",
    description:
      'Panel QHD de 27" a 165 Hz con tiempo de respuesta de 1 ms y cobertura sRGB del 99%. Bordes ultrafinos, ajuste de altura, inclinación y pivote, además de filtros de luz azul para jornadas largas.',
    features: [
      '27" QHD 2560×1440 · 165 Hz',
      "1 ms · sRGB 99%",
      "Soporte ergonómico (altura + pivote)",
      "Filtro de luz azul sin hardware",
    ],
    image: monitorImg,
    freeShipping: true,
  },
  {
    id: "ergorise-stand",
    name: "Soporte para laptop ErgoRise",
    brand: "ErgoRise",
    category: "accesorios",
    price: 119,
    rating: 4.6,
    reviews: 143,
    stock: 18,
    shortDescription: "Aluminio, 6 niveles de altura y enfriamiento pasivo.",
    description:
      "Sube tu laptop a la altura de los ojos y trabaja mejor. El ErgoRise es de aluminio anodizado con 6 niveles de altura, soporta hasta 17\" y su diseño abierto mejora el flujo de aire para mantener tu equipo fresco.",
    features: [
      "Aluminio anodizado · soporta hasta 17\"",
      "6 niveles de altura",
      "Mejora el flujo de aire",
      "Plegable para viajar",
    ],
    image: laptopStandImg,
  },
  {
    id: "swiftcharge-65w",
    name: "Cargador GaN SwiftCharge 65W",
    brand: "SwiftCharge",
    category: "accesorios",
    price: 79,
    originalPrice: 99,
    rating: 4.7,
    reviews: 265,
    stock: 30,
    shortDescription: "GaN compacto de 65 W con dos puertos USB-C.",
    description:
      "Tecnología GaN que reduce el tamaño a la mitad sin perder potencia: 65 W para cargar laptop y celular a la vez con dos puertos USB-C y Clavija plegable lista para viajar.",
    features: [
      "65 W · GaN de nueva generación",
      "2× USB-C PD 3.0",
      "50% más compacto que un cargador estándar",
      "Clavija plegable",
    ],
    image: chargerImg,
  },
];

export const getProduct = (id: string) => products.find((p) => p.id === id);

export interface PromoSlide {
  eyebrow: string;
  title: string;
  highlight: string;
  description: string;
  cta: string;
  categoryId: CategoryId;
  theme: "ink" | "brand" | "soft";
}

export const promoSlides: PromoSlide[] = [
  {
    eyebrow: "Semana Gamer",
    title: "Hasta 25% off",
    highlight: "en gaming",
    description: "Teclados, mouses y periféricos listos para competir.",
    cta: "Ver Tecnología",
    categoryId: "tecnologia",
    theme: "ink",
  },
  {
    eyebrow: "Audio Days",
    title: "Desde S/129",
    highlight: "en audio",
    description: "Audífonos, bocinas y micrófonos con envío gratis.",
    cta: "Ver Audio",
    categoryId: "audio",
    theme: "brand",
  },
  {
    eyebrow: "Nuevo",
    title: "Llegó Nova X5",
    highlight: "AMOLED 120 Hz",
    description: "Cámara triple 50 MP y carga rápida de 67 W.",
    cta: "Ver Celulares",
    categoryId: "celulares",
    theme: "soft",
  },
];

export const formatPrice = (value: number) =>
  new Intl.NumberFormat("es-PE", {
    style: "currency",
    currency: "PEN",
    minimumFractionDigits: 2,
  }).format(value);
