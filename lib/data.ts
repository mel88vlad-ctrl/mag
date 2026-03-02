export type Category = "beds" | "sofas" | "mattresses" | "accessories";

export interface Product {
  id: string;
  name: string;
  description: string;
  price: number;
  oldPrice?: number;
  category: Category;
  images: string[];
  features: string[];
  dimensions: string;
  materials: string;
  inStock: boolean;
  rating: number;
  reviewsCount: number;
  isNew?: boolean;
}

export const products: Product[] = [
  {
    id: "bed-001",
    name: 'Кровать "Сканди" с мягким изголовьем',
    description:
      "Элегантная двуспальная кровать в скандинавском стиле. Мягкое изголовье из премиального велюра обеспечивает максимальный комфорт во время чтения или отдыха. Каркас выполнен из массива дуба, что гарантирует долговечность и надежность конструкции.",
    price: 85000,
    oldPrice: 105000,
    category: "beds",
    images: [
      "https://picsum.photos/seed/bed1/800/800",
      "https://picsum.photos/seed/bed1_detail/800/800",
      "https://picsum.photos/seed/bed1_room/800/800",
    ],
    features: [
      "Ортопедическое основание",
      "Съемные чехлы",
      "Гипоаллергенные материалы",
    ],
    dimensions: "160x200 см",
    materials: "Массив дуба, велюр, пенополиуретан",
    inStock: true,
    rating: 4.8,
    reviewsCount: 124,
  },
  {
    id: "bed-002",
    name: 'Парящая кровать "Невесомость"',
    description:
      "Инновационный дизайн со скрытыми опорами создает эффект парения над полом. Встроенная LED-подсветка по периметру добавляет магии в интерьер вашей спальни. Идеальный выбор для современных минималистичных пространств.",
    price: 112000,
    category: "beds",
    images: [
      "https://picsum.photos/seed/bed2/800/800",
      "https://picsum.photos/seed/bed2_detail/800/800",
    ],
    features: [
      "Эффект парения",
      "Встроенная LED-подсветка",
      "Усиленный металлический каркас",
    ],
    dimensions: "180x200 см",
    materials: "Металл, МДФ, шпон ореха",
    inStock: true,
    rating: 4.9,
    reviewsCount: 89,
    isNew: true,
  },
  {
    id: "bed-003",
    name: 'Кровать "Лофт" с подъемным механизмом',
    description:
      "Практичное и стильное решение для спальни. Вместительный бельевой ящик под спальным местом позволяет экономить пространство. Брутальный дизайн с элементами металла и дерева.",
    price: 94000,
    oldPrice: 99000,
    category: "beds",
    images: [
      "https://picsum.photos/seed/bed3/800/800",
      "https://picsum.photos/seed/bed3_detail/800/800",
    ],
    features: [
      "Подъемный механизм на газлифтах",
      "Вместительный короб для белья",
      "Надежная фурнитура",
    ],
    dimensions: "160x200 см",
    materials: "ЛДСП, металл, экокожа",
    inStock: false,
    rating: 4.5,
    reviewsCount: 42,
  },
  {
    id: "sofa-001",
    name: 'Модульный диван "Облако"',
    description:
      "Невероятно мягкий и глубокий диван для просторной гостиной. Модульная система позволяет менять конфигурацию в зависимости от ваших потребностей. Наполнитель из натурального пуха и пера дарит ощущение полного расслабления.",
    price: 245000,
    category: "sofas",
    images: [
      "https://picsum.photos/seed/sofa1/800/800",
      "https://picsum.photos/seed/sofa1_detail/800/800",
      "https://picsum.photos/seed/sofa1_room/800/800",
    ],
    features: [
      "Модульная конструкция",
      "Глубокая посадка",
      "Премиальный наполнитель",
    ],
    dimensions: "320x110x85 см",
    materials: "Массив сосны, пух-перо, ткань букле",
    inStock: true,
    rating: 5.0,
    reviewsCount: 15,
    isNew: true,
  },
  {
    id: "sofa-002",
    name: 'Прямой диван "Милан"',
    description:
      'Лаконичный дизайн и строгие линии. Диван "Милан" станет центром притяжения в вашем интерьере. Обивка из натуральной кожи итальянской выделки со временем приобретает благородную патину.',
    price: 180000,
    oldPrice: 210000,
    category: "sofas",
    images: [
      "https://picsum.photos/seed/sofa2/800/800",
      "https://picsum.photos/seed/sofa2_detail/800/800",
    ],
    features: [
      "Натуральная кожа",
      "Анатомическая поддержка спины",
      "Высокие ножки для робота-пылесоса",
    ],
    dimensions: "240x95x80 см",
    materials: "Натуральная кожа, пенополиуретан, металл",
    inStock: true,
    rating: 4.7,
    reviewsCount: 56,
  },
  {
    id: "sofa-003",
    name: 'Угловой диван "Комфорт Плюс"',
    description:
      'Идеальное решение для большой семьи. Диван оснащен механизмом трансформации "Дельфин", превращаясь в полноценное двуспальное место. В оттоманке предусмотрен вместительный ящик для хранения.',
    price: 135000,
    category: "sofas",
    images: [
      "https://picsum.photos/seed/sofa3/800/800",
      "https://picsum.photos/seed/sofa3_detail/800/800",
    ],
    features: [
      "Механизм трансформации",
      "Ящик для белья",
      "Антивандальная ткань",
    ],
    dimensions: "280x160x90 см",
    materials: "Фанера, микровелюр, независимый пружинный блок",
    inStock: true,
    rating: 4.6,
    reviewsCount: 203,
  },
  {
    id: "mattress-001",
    name: 'Ортопедический матрас "СлипМастер"',
    description:
      "Матрас с независимым пружинным блоком и слоем пены с эффектом памяти. Обеспечивает идеальную поддержку позвоночника.",
    price: 35000,
    oldPrice: 45000,
    category: "mattresses",
    images: [
      "https://picsum.photos/seed/mattress1/800/800",
    ],
    features: ["Независимые пружины", "Эффект памяти", "Съемный чехол"],
    dimensions: "160x200x22 см",
    materials: "Пенополиуретан, пружинный блок, трикотаж",
    inStock: true,
    rating: 4.9,
    reviewsCount: 340,
  },
  {
    id: "acc-001",
    name: 'Анатомическая подушка "Релакс"',
    description:
      "Подушка эргономичной формы из пены с эффектом памяти. Поддерживает шею в правильном положении.",
    price: 4500,
    category: "accessories",
    images: [
      "https://picsum.photos/seed/pillow1/800/800",
    ],
    features: ["Эффект памяти", "Охлаждающий гель", "Гипоаллергенно"],
    dimensions: "60x40x12 см",
    materials: "Пена Memory Foam, охлаждающий гель",
    inStock: true,
    rating: 4.8,
    reviewsCount: 512,
  },
];

export function getProductById(id: string): Product | undefined {
  return products.find((p) => p.id === id);
}

export function getProductsByCategory(category: Category): Product[] {
  return products.filter((p) => p.category === category);
}

export function getFeaturedProducts(): Product[] {
  return products.filter((p) => p.rating >= 4.8).slice(0, 4);
}

export function getDiscountedProducts(): Product[] {
  return products.filter((p) => p.oldPrice).slice(0, 4);
}
