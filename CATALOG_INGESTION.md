# Catalog Ingestion — Personalization + Data Cloud

Guía para conectar el catálogo de esta demo con **Salesforce Personalization** vía sitemap XML + JSON-LD.

## Qué expone la app

| Recurso | Ruta | Propósito |
|---|---|---|
| Sitemap XML | `/sitemap.xml` | Lista todas las URLs (home, PLPs, PDPs) para que el crawler descubra el catálogo |
| JSON-LD (schema.org/Product) | Inline en `/producto/[id]` | Estructura los atributos de cada producto sin necesidad de selectores CSS |
| Producto data source | `data/products.ts` | 33 SKUs reales de Chevignon usados para render y para el sitemap |

## Verificar localmente

Con `npm run dev` corriendo:

```bash
curl http://localhost:3000/sitemap.xml | head -40
curl -s http://localhost:3000/producto/m-1975881 | grep -A 30 'application/ld+json'
```

## Configurar en Personalization Admin UI

1. **Setear la URL pública del site** en `.env.local`:
   ```
   NEXT_PUBLIC_SITE_URL=https://tu-dominio.com
   ```
   (En dev queda `http://localhost:3000`; en prod poner el dominio real para que el sitemap emita URLs absolutas correctas.)

2. **Admin UI → Datasets → tu dataset → Catalog**
   - **Add Catalog Object Type** = `Product` (si aún no existe)
   - Atributos: `sku`, `name`, `category`, `subcategory`, `brand`, `price`, `currency`, `color`, `keywords`, `image`

3. **Admin UI → Catalog → Sitemap Ingestion**
   - Sitemap URL: `https://tu-dominio.com/sitemap.xml`
   - Frecuencia: Daily (o Hourly durante la demo)
   - Filtro de URLs: `*/producto/*` (solo PDPs, no PLPs/home)

4. **Mapear JSON-LD → Catalog Attributes**
   Personalization detecta automáticamente los campos schema.org/Product. Mapear:

   | JSON-LD field | Product attribute |
   |---|---|
   | `sku` | `sku` |
   | `name` | `name` |
   | `description` | `description` |
   | `image[0]` | `image` |
   | `brand.name` | `brand` |
   | `category` | `category` |
   | `color` | `color` |
   | `keywords` | `keywords` |
   | `offers.price` | `price` |
   | `offers.priceCurrency` | `currency` |
   | `offers.priceSpecification.referencePrice.price` | `originalPrice` |

5. **Trigger primer crawl** manualmente desde el Admin UI y verificar en Data Cloud → Catalog Object Type = Product que ingresaron los 33 SKUs.

## JSON-LD emitido (ejemplo)

Chaqueta Tipo Biker en Cuero para Hombre (SKU CHV-M-1975881):

```json
{
  "@context": "https://schema.org",
  "@type": "Product",
  "productID": "m-1975881",
  "sku": "CHV-M-1975881",
  "name": "Chaqueta Tipo Biker en Cuero para Hombre",
  "description": "Chaqueta biker en cuero premium — un ícono Chevignon. The Icons.",
  "image": ["https://chevignon.vtexassets.com/arquivos/ids/1975881-500-auto"],
  "brand": { "@type": "Brand", "name": "Chevignon" },
  "category": "hombre/chaquetas",
  "color": "Negro",
  "keywords": "leather, premium, chaquetas, sale, the-icons",
  "offers": {
    "@type": "Offer",
    "url": "https://tu-dominio.com/producto/m-1975881",
    "priceCurrency": "COP",
    "price": 1019940,
    "availability": "https://schema.org/InStock",
    "priceSpecification": {
      "@type": "UnitPriceSpecification",
      "price": 1019940,
      "priceCurrency": "COP",
      "referencePrice": {
        "@type": "PriceSpecification",
        "price": 1699900,
        "priceCurrency": "COP"
      }
    }
  }
}
```

## Alternativa: feed dedicado

Si preferís un feed tipo Google Merchant (más control, sin depender de crawl), crear una route `app/catalog.xml/route.ts` que devuelva `<rss>` con `<item><g:id/><g:price/><g:image_link/>…</item>` por producto. La estructura de datos ya está en `data/products.ts` — es un par de líneas.
