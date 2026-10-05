import type { Product } from "@/data/products";

/**
 * Marca schema.org/Product en cada PDP.
 * Personalization crawler + Google lo leen sin necesidad de selectores CSS.
 */
export default function ProductJsonLd({
  product,
  baseUrl
}: {
  product: Product;
  baseUrl: string;
}) {
  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "Product",
    productID: product.id,
    sku: product.sku,
    name: product.name,
    description: product.description,
    image: [product.image],
    brand: {
      "@type": "Brand",
      name: "Chevignon"
    },
    category: `${product.category}/${product.subcategory}`,
    color: product.color,
    keywords: product.tags.join(", "),
    offers: {
      "@type": "Offer",
      url: `${baseUrl}/producto/${product.id}`,
      priceCurrency: product.currency,
      price: product.price,
      availability: "https://schema.org/InStock",
      ...(product.originalPrice && product.originalPrice > product.price
        ? {
            priceSpecification: {
              "@type": "UnitPriceSpecification",
              price: product.price,
              priceCurrency: product.currency,
              referencePrice: {
                "@type": "PriceSpecification",
                price: product.originalPrice,
                priceCurrency: product.currency
              }
            }
          }
        : {})
    }
  };

  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
    />
  );
}
