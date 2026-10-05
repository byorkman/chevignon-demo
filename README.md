# Chevignon Personalization Demo

Ecommerce funcional inspirado en **chevignon.com.co** (Colombia) construido con **Next.js 14 + Tailwind** para demostrar la integración con **Salesforce Personalization** (Interactions API sobre Data Cloud).

> Uso educativo / demos SE. Los productos, imágenes, precios (COP) y branding vienen scrapeados de la tienda pública de Chevignon (sep 2026). No es un sitio oficial y no procesa pagos reales.

---

## Features de Personalization que se demuestran

- **Event tracking**: `Page View`, `View Catalog Object`, `Cart`, `Order`
- **Anonymous → Known handoff** vía `Identity` (fusiona perfil anónimo con customerId en login)
- **Banner personalizable** (hero) con fallback local + hook a campañas server-side de Personalization
- **Carruseles de recomendaciones** con lógica de fallback por categoría/subcategoría (listos para reemplazar por decisiones server-side)

---

## 1. Setup

```bash
npm install
cp .env.local.example .env.local
# editar .env.local con los valores del tenant
npm run dev
```

Abrir http://localhost:3000

> Sin configurar el beacon, la app funciona igual — los eventos se ignoran silenciosamente y en consola aparece un aviso. Ideal para desarrollar UI antes de tener el tenant listo.

## 2. Configurar Personalization

Editar `.env.local`:

```
NEXT_PUBLIC_PERSONALIZATION_BEACON_URL=https://cdn.evgnet.com/beacon/<ACCOUNT_ID>/<DATASET_ID>/scripts/evergage.min.js
NEXT_PUBLIC_PERSONALIZATION_SITE_NAME=chevignon-demo
NEXT_PUBLIC_PERSONALIZATION_COOKIE_DOMAIN=localhost
```

Valores del **Personalization Admin UI** → Dataset → Web Beacon.

## 3. Eventos que dispara la demo

| Página / acción            | Interaction name       | Payload principal                                |
|----------------------------|------------------------|--------------------------------------------------|
| Cualquier ruta (mount)     | `Page View`            | `page.name`, `page.url`                          |
| `/producto/[id]` (mount)   | `View Catalog Object`  | `catalogObject.type=Product`, atributos completos |
| Botón "Agregar al carrito" | `Cart`                 | `lineItem.catalogObject.id`, `quantity`, `size`   |
| "Confirmar pedido"         | `Order`                | `order.id`, `totalValue`, `lineItems[]`          |
| Login exitoso              | `Identity`             | `user.identities.customerId + email`             |

Helpers en [`lib/personalization.ts`](./lib/personalization.ts) — no-op si el SDK no está cargado.

## 4. Mapear el catálogo en Data Cloud

En Personalization:

1. **Catalog Object Type** = `Product` con atributos: `sku`, `name`, `category`, `subcategory`, `brand`, `price`, `currency`, `color`, `tags`.
2. Ingesta batch de los 22 SKUs (o vía sitemap).
3. **Campaigns** sugeridas:
   - `home_hero` → consumida por `HeroBanner` vía `fetchCampaign("home_hero")`.
   - Slots por categoría para reemplazar `RecommendationCarousel` con recos server-side.

## 5. Flujo de demo sugerido (guión para presentar)

1. **Anónimo** entra al home → hero muestra "Embrace Heritage, Experience Freedom".
2. Navega 2-3 productos de la misma categoría (ej. cuero → correas/gorras) → se disparan `View Catalog Object`.
3. Verificar en **Live Events** de Personalization que llegan los eventos.
4. Va a checkout → sistema pide login → email cualquiera → dispara `Identity`.
5. En Data Cloud confirmar que el perfil anónimo se **fusionó** con el `customerId`.
6. Confirma pedido → llega el `Order` → aparece en el histórico del Individual.
7. Refresca home → si la campaña `home_hero` tiene una variante por segmento, cambia el banner (el fallback local ya muestra la variante "known" con acceso anticipado).

## 6. Catálogo (22 SKUs reales de Chevignon)

- **Mujer (10)**: chalecos, vestidos, buzos, suéteres de lana/cachemira, camisas de popelina, camisetas, pantalones.
- **Hombre (6)**: jeans straight fit, camisetas gráficas, blazer multiforma, camisas manga larga.
- **Niños (3)**: camisetas gráficas, chaqueta bomber.
- **Accesorios (3)**: gorras trucker (cuero, six-cascos), correas de cuero doble faz.

Precios en **COP** con soporte para descuentos (Essentials tiene marcados los 40% off).

Ver [`data/products.ts`](./data/products.ts).

## 7. Stack

- Next.js 14 (App Router) + TypeScript
- Tailwind CSS 3 con paleta heritage (negro / rojo Chevignon / crema / cuero / denim)
- Sin backend — cart y user en `localStorage`

## 8. Estructura

```
app/
  page.tsx           Home: hero + Lo Más Nuevo + Categorías + Essentials + Nuestra Historia + Denim
  productos/         PLP con filtro por categoría (hombre/mujer/niños/accesorios)
  producto/[id]/     PDP con recomendaciones "También te puede interesar"
  carrito/           Cart con COP formatting
  checkout/          Checkout + Order event
  login/             Fake login + Identity event
components/          UI (Header, HeroBanner, ProductCard, RecommendationCarousel, Footer, PersonalizationLoader)
lib/
  personalization.ts SDK wrapper
  cart.ts            Cart en localStorage
  auth.ts            Fake user en localStorage
data/products.ts     22 SKUs reales scrapeados de chevignon.com.co
```

## Créditos y disclaimer

Marca, productos, imágenes y textos pertenecen a **Chevignon / Comodin S.A.S. (NIT 800.069.933-6)**. Este repo es una **demo educativa** para ilustrar la integración de un ecommerce moderno con Salesforce Personalization. No está afiliado a Chevignon.
