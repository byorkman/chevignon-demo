# Chevignon Demo – Data Cloud

Configuración del conector web (Salesforce Interactions SDK) para Data Cloud.

## Archivos

- `chevignon_schema.json` – schema del conector web: `Chevignon_Engagement` (Engagement) y `Chevignon_Profile` (Profile).
- `chevignon_sitemap.js` – sitemap que envía los eventos.

## Eventos

La web es una SPA (Next.js): el sitemap detecta los cambios de URL y escucha los eventos propios de la web (`fpd:user-changed`, `fpd:cart-changed`), en lugar de depender de selectores CSS.

| Evento | Schema | Disparo |
|---|---|---|
| View Page | Engagement | Cada navegación que no sea ficha de producto |
| View Product | Engagement | Navegación a `/producto/[id]` (datos del JSON-LD) |
| Add to Cart | Engagement | El carrito gana unidades (ficha o botón "+" en `/carrito`) |
| Order Completed | Engagement | "Confirmar pedido" en `/checkout` (el carrito se vacía); `orderId` = `CHV-…` |
| Identity Login | Profile | Login en `/login` (email, customerId, firstName, loyaltyTier) |

## Pasos en Data Cloud

1. Setup → Websites & Mobile Apps → New → tipo Website.
2. Subir `chevignon_schema.json`. **Revisarlo antes:** una vez subido solo se pueden añadir campos, no editar ni borrar.
3. Subir `chevignon_sitemap.js` como sitemap (o pegarlo en el editor).
4. Crear los data streams del conector y mapear a DMOs (Individual, Contact Point Email, Product Browse Engagement, etc.).
5. Incrustar en la web el script del SDK (beacon) que da el conector.

## Pendiente / notas

- No usar nombres reservados del SDK como nombre de interacción (`Purchase`, `Add To Cart`, `View Catalog Object`…): el SDK descarta el evento sin error. Ver `SalesforceInteractions.OrderInteractionName` / `CartInteractionName`.

- Consentimiento fijo en OptIn: solo para demo. En producción leerlo del banner de cookies (RGPD).
- `lib/personalization.ts` (pensado para Salesforce Personalization) también llama a `window.SalesforceInteractions.sendEvent` con eventos sin `eventType`; Data Cloud los descarta. Los eventos válidos para Data Cloud los envía este sitemap.
- `customerId` lo genera `lib/auth.ts` con `btoa(email).slice(0, 10)`: emails con el mismo inicio pueden compartir ID. Vale para demo.
- Validar en DevTools → Network que los payloads llegan con los nombres del schema.
