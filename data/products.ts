export type Category = "mujer" | "hombre" | "ninos" | "accesorios";

export type Product = {
  id: string;
  sku: string;
  name: string;
  category: Category;
  subcategory: string;
  price: number;         // COP — precio actual
  originalPrice?: number; // COP — si hay descuento
  currency: "COP";
  image: string;
  color: string;
  sizes: string[];
  description: string;
  tags: string[];
};

const img = (id: string) =>
  `https://chevignon.vtexassets.com/arquivos/ids/${id}-500-auto`;

/**
 * Catálogo real scrapeado de chevignon.com.co (sep 2026).
 * Precios en COP, imágenes hosteadas en el CDN de VTEX de Chevignon.
 */
export const products: Product[] = [
  // ============= MUJER =============
  {
    id: "w-2337527",
    sku: "CHV-W-2337527",
    name: "Chaleco Doble Faz para Mujer",
    category: "mujer",
    subcategory: "chaquetas",
    price: 249900,
    currency: "COP",
    image: img("2337527"),
    color: "Camel",
    sizes: ["XS", "S", "M", "L", "XL"],
    description: "Chaleco doble faz de silueta relajada, ideal para capas del Fall Winter.",
    tags: ["fall-winter", "chaquetas", "essentials"]
  },
  {
    id: "w-2337814",
    sku: "CHV-W-2337814",
    name: "Vestido Tejido de Punto para Mujer",
    category: "mujer",
    subcategory: "vestidos",
    price: 319900,
    currency: "COP",
    image: img("2337814"),
    color: "Beige",
    sizes: ["XS", "S", "M", "L"],
    description: "Vestido tejido de punto con caída suave, atemporal y versátil.",
    tags: ["fall-winter", "vestidos"]
  },
  {
    id: "w-2337806",
    sku: "CHV-W-2337806",
    name: "Vestido Largo Estampado para Mujer",
    category: "mujer",
    subcategory: "vestidos",
    price: 309900,
    currency: "COP",
    image: img("2337806"),
    color: "Multicolor",
    sizes: ["XS", "S", "M", "L"],
    description: "Vestido largo con estampado exclusivo Chevignon.",
    tags: ["vestidos", "print"]
  },
  {
    id: "w-2337538",
    sku: "CHV-W-2337538",
    name: "Buzo de Cuello en V para Mujer",
    category: "mujer",
    subcategory: "buzos",
    price: 209900,
    currency: "COP",
    image: img("2337538"),
    color: "Marfil",
    sizes: ["S", "M", "L"],
    description: "Buzo de cuello en V, tejido suave y silueta clásica.",
    tags: ["fall-winter", "buzos"]
  },
  {
    id: "w-2337810",
    sku: "CHV-W-2337810",
    name: "Suéter de Lana y Cachemira para Mujer",
    category: "mujer",
    subcategory: "buzos",
    price: 769900,
    currency: "COP",
    image: img("2337810"),
    color: "Caqui",
    sizes: ["S", "M", "L"],
    description: "Suéter premium en mezcla de lana y cachemira, tacto lujoso.",
    tags: ["premium", "fall-winter"]
  },
  {
    id: "w-2337818",
    sku: "CHV-W-2337818",
    name: "Suéter de Lana y Cachemira para Mujer",
    category: "mujer",
    subcategory: "buzos",
    price: 769900,
    currency: "COP",
    image: img("2337818"),
    color: "Negro",
    sizes: ["S", "M", "L"],
    description: "Suéter premium en mezcla de lana y cachemira, versión negra.",
    tags: ["premium", "fall-winter"]
  },
  {
    id: "w-2139683",
    sku: "CHV-W-2139683",
    name: "Camisa de Popelina para Mujer",
    category: "mujer",
    subcategory: "camisas",
    price: 119340,
    originalPrice: 198900,
    currency: "COP",
    image: img("2139683"),
    color: "Crudo",
    sizes: ["XS", "S", "M", "L", "XL"],
    description: "Camisa clásica de popelina de algodón — un básico esencial.",
    tags: ["essentials", "camisas", "sale"]
  },
  {
    id: "w-2050388",
    sku: "CHV-W-2050388",
    name: "Camiseta Manga Corta para Mujer",
    category: "mujer",
    subcategory: "camisetas",
    price: 83940,
    originalPrice: 139900,
    currency: "COP",
    image: img("2050388"),
    color: "Blanco",
    sizes: ["XS", "S", "M", "L", "XL"],
    description: "Camiseta manga corta de algodón peinado, corte regular.",
    tags: ["essentials", "camisetas", "sale"]
  },
  {
    id: "w-2141058",
    sku: "CHV-W-2141058",
    name: "Pantalón Recto para Mujer",
    category: "mujer",
    subcategory: "pantalones",
    price: 143940,
    originalPrice: 239900,
    currency: "COP",
    image: img("2141058"),
    color: "Beige",
    sizes: ["6", "8", "10", "12"],
    description: "Pantalón recto tiro medio, calce moderno.",
    tags: ["essentials", "pantalones", "sale"]
  },
  {
    id: "w-2139678",
    sku: "CHV-W-2139678",
    name: "Camisa de Popelina para Mujer",
    category: "mujer",
    subcategory: "camisas",
    price: 119340,
    originalPrice: 198900,
    currency: "COP",
    image: img("2139678"),
    color: "Blanco",
    sizes: ["XS", "S", "M", "L", "XL"],
    description: "Camisa clásica de popelina de algodón, versión blanca.",
    tags: ["essentials", "camisas", "sale"]
  },

  // ============= HOMBRE =============
  {
    id: "m-2337967",
    sku: "CHV-M-2337967",
    name: "Jean de Hombre Straight Fit Medio",
    category: "hombre",
    subcategory: "jeans",
    price: 173940,
    originalPrice: 289900,
    currency: "COP",
    image: img("2337967"),
    color: "Azul medio",
    sizes: ["30", "32", "34", "36"],
    description: "Jean straight fit en denim de lavado medio, la esencia Chevignon.",
    tags: ["denim", "jeans", "sale"]
  },
  {
    id: "m-2126160",
    sku: "CHV-M-2126160",
    name: "Camiseta Gráfica Slim para Hombre",
    category: "hombre",
    subcategory: "camisetas",
    price: 77940,
    originalPrice: 129900,
    currency: "COP",
    image: img("2126160"),
    color: "Negro",
    sizes: ["S", "M", "L", "XL"],
    description: "Camiseta con estampado gráfico Chevignon, silueta slim.",
    tags: ["camisetas", "graphic", "sale"]
  },
  {
    id: "m-2123805",
    sku: "CHV-M-2123805",
    name: "Camiseta Gráfica Regular para Hombre",
    category: "hombre",
    subcategory: "camisetas",
    price: 101940,
    originalPrice: 169900,
    currency: "COP",
    image: img("2123805"),
    color: "Blanco",
    sizes: ["S", "M", "L", "XL"],
    description: "Camiseta gráfica con corte regular, algodón premium.",
    tags: ["camisetas", "graphic", "sale"]
  },
  {
    id: "m-2334508",
    sku: "CHV-M-2334508",
    name: "Blazer Multiforma para Hombre",
    category: "hombre",
    subcategory: "chaquetas",
    price: 639900,
    currency: "COP",
    image: img("2334508"),
    color: "Azul marino",
    sizes: ["S", "M", "L", "XL"],
    description: "Blazer versátil de construcción impecable — smart casual heritage.",
    tags: ["premium", "chaquetas", "smart-casual"]
  },
  {
    id: "m-2334014",
    sku: "CHV-M-2334014",
    name: "Camisa Manga Larga para Hombre",
    category: "hombre",
    subcategory: "camisas",
    price: 298900,
    currency: "COP",
    image: img("2334014"),
    color: "Negro",
    sizes: ["S", "M", "L", "XL"],
    description: "Camisa manga larga de caída fluida, tejido premium.",
    tags: ["camisas", "smart-casual"]
  },
  {
    id: "m-2334011",
    sku: "CHV-M-2334011",
    name: "Camisa Manga Larga para Hombre",
    category: "hombre",
    subcategory: "camisas",
    price: 298900,
    currency: "COP",
    image: img("2334011"),
    color: "Gris",
    sizes: ["S", "M", "L", "XL"],
    description: "Camisa manga larga, versión gris con acabado suave.",
    tags: ["camisas", "smart-casual"]
  },
  {
    id: "m-2325678",
    sku: "CHV-M-2325678",
    name: "Cárdigan de Punto para Hombre",
    category: "hombre",
    subcategory: "buzos",
    price: 369900,
    currency: "COP",
    image: img("2325678"),
    color: "Beige",
    sizes: ["S", "M", "L", "XL"],
    description: "Cárdigan tejido de punto, cierre frontal con botones — un pilar del Fall Winter.",
    tags: ["fall-winter", "buzos", "premium"]
  },
  {
    id: "m-2320424",
    sku: "CHV-M-2320424",
    name: "Camisa Manga Corta para Hombre",
    category: "hombre",
    subcategory: "camisas",
    price: 249900,
    currency: "COP",
    image: img("2320424"),
    color: "Blanco",
    sizes: ["S", "M", "L", "XL"],
    description: "Camisa manga corta con estampado sutil, ideal para clima cálido.",
    tags: ["camisas", "verano"]
  },
  {
    id: "m-2327563",
    sku: "CHV-M-2327563",
    name: "Camiseta Regular Fit para Hombre",
    category: "hombre",
    subcategory: "camisetas",
    price: 209900,
    currency: "COP",
    image: img("2327563"),
    color: "Azul marino",
    sizes: ["S", "M", "L", "XL"],
    description: "Camiseta regular fit de algodón peinado — corte moderno y cómodo.",
    tags: ["essentials", "camisetas"]
  },
  {
    id: "m-2314807",
    sku: "CHV-M-2314807",
    name: "Jean Súper Skinny Fit para Hombre",
    category: "hombre",
    subcategory: "jeans",
    price: 398900,
    currency: "COP",
    image: img("2314807"),
    color: "Azul oscuro",
    sizes: ["30", "32", "34", "36"],
    description: "Jean súper skinny fit con lavado oscuro, denim con elastano para máxima comodidad.",
    tags: ["denim", "jeans"]
  },
  {
    id: "m-2314803",
    sku: "CHV-M-2314803",
    name: "Jean Súper Skinny Fit para Hombre",
    category: "hombre",
    subcategory: "jeans",
    price: 398900,
    currency: "COP",
    image: img("2314803"),
    color: "Azul medio",
    sizes: ["30", "32", "34", "36"],
    description: "Jean súper skinny en lavado medio con detalles vintage.",
    tags: ["denim", "jeans"]
  },
  {
    id: "m-2314808",
    sku: "CHV-M-2314808",
    name: "Jean Súper Skinny Fit para Hombre",
    category: "hombre",
    subcategory: "jeans",
    price: 409900,
    currency: "COP",
    image: img("2314808"),
    color: "Negro",
    sizes: ["30", "32", "34", "36"],
    description: "Jean súper skinny en color negro, elegante y versátil.",
    tags: ["denim", "jeans"]
  },
  {
    id: "m-1975881",
    sku: "CHV-M-1975881",
    name: "Chaqueta Tipo Biker en Cuero para Hombre",
    category: "hombre",
    subcategory: "chaquetas",
    price: 1019940,
    originalPrice: 1699900,
    currency: "COP",
    image: img("1975881"),
    color: "Negro",
    sizes: ["S", "M", "L", "XL"],
    description: "Chaqueta biker en cuero premium — un ícono Chevignon. The Icons.",
    tags: ["leather", "premium", "chaquetas", "sale", "the-icons"]
  },
  {
    id: "m-1976965",
    sku: "CHV-M-1976965",
    name: "Chaqueta Tipo Biker en Cuero para Hombre",
    category: "hombre",
    subcategory: "chaquetas",
    price: 1019940,
    originalPrice: 1699900,
    currency: "COP",
    image: img("1976965"),
    color: "Café",
    sizes: ["S", "M", "L", "XL"],
    description: "Chaqueta biker en cuero premium — versión café heritage.",
    tags: ["leather", "premium", "chaquetas", "sale", "the-icons"]
  },
  {
    id: "m-2148156",
    sku: "CHV-M-2148156",
    name: "Chaqueta de Cuero para Hombre",
    category: "hombre",
    subcategory: "chaquetas",
    price: 834540,
    originalPrice: 1390900,
    currency: "COP",
    image: img("2148156"),
    color: "Café",
    sizes: ["S", "M", "L", "XL"],
    description: "Chaqueta de cuero con corte clásico — construcción impecable.",
    tags: ["leather", "premium", "chaquetas", "sale"]
  },
  {
    id: "m-2169740",
    sku: "CHV-M-2169740",
    name: "Chaqueta de Cuero para Hombre",
    category: "hombre",
    subcategory: "chaquetas",
    price: 839940,
    originalPrice: 1399900,
    currency: "COP",
    image: img("2169740"),
    color: "Negro",
    sizes: ["S", "M", "L", "XL"],
    description: "Chaqueta de cuero silueta clásica en negro — versátil y atemporal.",
    tags: ["leather", "premium", "chaquetas", "sale"]
  },

  // ============= NIÑOS =============
  {
    id: "k-2128241",
    sku: "CHV-K-2128241",
    name: "Camiseta Gráfica para Niño",
    category: "ninos",
    subcategory: "camisetas",
    price: 98900,
    currency: "COP",
    image: img("2128241"),
    color: "Blanco",
    sizes: ["4", "6", "8", "10", "12"],
    description: "Camiseta gráfica para niño con logo Chevignon.",
    tags: ["kids", "camisetas"]
  },
  {
    id: "k-2129220",
    sku: "CHV-K-2129220",
    name: "Chaqueta Bomber para Niño",
    category: "ninos",
    subcategory: "chaquetas",
    price: 249900,
    currency: "COP",
    image: img("2129220"),
    color: "Verde militar",
    sizes: ["4", "6", "8", "10", "12"],
    description: "Chaqueta bomber para niño, forro térmico y cierre frontal.",
    tags: ["kids", "chaquetas"]
  },
  {
    id: "k-2128827",
    sku: "CHV-K-2128827",
    name: "Camiseta para Niño",
    category: "ninos",
    subcategory: "camisetas",
    price: 79900,
    currency: "COP",
    image: img("2128827"),
    color: "Azul",
    sizes: ["4", "6", "8", "10", "12"],
    description: "Camiseta básica para niño en algodón suave.",
    tags: ["kids", "essentials"]
  },

  // ============= ACCESORIOS =============
  {
    id: "a-2314731",
    sku: "CHV-A-2314731",
    name: "Gorra Trucker Detalles en Cuero",
    category: "accesorios",
    subcategory: "gorras",
    price: 159900,
    currency: "COP",
    image: img("2314731"),
    color: "Negro",
    sizes: ["Único"],
    description: "Gorra trucker con detalles en cuero premium — icónica Chevignon.",
    tags: ["accesorios", "gorras", "leather"]
  },
  {
    id: "a-2317730",
    sku: "CHV-A-2317730",
    name: "Correa de Cuero Doble Faz para Hombre",
    category: "accesorios",
    subcategory: "correas",
    price: 159900,
    currency: "COP",
    image: img("2317730"),
    color: "Café",
    sizes: ["90", "95", "100", "105"],
    description: "Correa doble faz en cuero genuino, dos looks en una.",
    tags: ["accesorios", "correas", "leather"]
  },
  {
    id: "a-2318099",
    sku: "CHV-A-2318099",
    name: "Correa de Cuero para Mujer",
    category: "accesorios",
    subcategory: "correas",
    price: 169900,
    currency: "COP",
    image: img("2318099"),
    color: "Camel",
    sizes: ["Único"],
    description: "Correa slim de cuero para mujer, hebilla dorada.",
    tags: ["accesorios", "correas", "leather"]
  },
  {
    id: "a-2314794",
    sku: "CHV-A-2314794",
    name: "Gorra con Aplique Seis Cascos",
    category: "accesorios",
    subcategory: "gorras",
    price: 179900,
    currency: "COP",
    image: img("2314794"),
    color: "Beige",
    sizes: ["Único"],
    description: "Gorra con el aplique icónico Seis Cascos de Chevignon.",
    tags: ["accesorios", "gorras", "heritage"]
  }
];

export function getProduct(id: string): Product | undefined {
  return products.find((p) => p.id === id);
}

export function getRelated(id: string, limit = 4): Product[] {
  const p = getProduct(id);
  if (!p) return products.slice(0, limit);
  return products
    .filter((x) => x.id !== id && (x.category === p.category || x.subcategory === p.subcategory))
    .slice(0, limit);
}

export function byCategory(category?: Category): Product[] {
  if (!category) return products;
  return products.filter((p) => p.category === category);
}

export function formatCOP(value: number): string {
  return "$ " + value.toLocaleString("es-CO", { minimumFractionDigits: 0, maximumFractionDigits: 0 });
}
