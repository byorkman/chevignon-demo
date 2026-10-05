# Chevignon Demo – Data Cloud

Configuración del conector web (Salesforce Interactions SDK) para Data Cloud.

## Archivos

- `chevignon_schema.json` – schema del conector web: `Chevignon_Engagement` (Engagement) y `Chevignon_Profile` (Profile).
- `chevignon_sitemap.js` – sitemap que envía los eventos.

## Eventos

| Evento | Tipo | Disparo |
|---|---|---|
| View Page | Engagement | Cualquier página (por defecto) |
| View Product | Engagement | URL con `/producto/` (datos del JSON-LD) |
| Add to Cart | Engagement | Clic en botón con texto "Agregar al carrito" |
| Purchase | Engagement | Página de confirmación de pedido |
| Identity Login | Profile | Clic en `#btn-login` o submit de formulario con email |

## Pasos en Data Cloud

1. Setup → Websites & Mobile Apps → New → tipo Website.
2. Subir `chevignon_schema.json`. **Revisarlo antes:** una vez subido solo se pueden añadir campos, no editar ni borrar.
3. Subir `chevignon_sitemap.js` como sitemap (o pegarlo en el editor).
4. Crear los data streams del conector y mapear a DMOs (Individual, Contact Point Email, Product Browse Engagement, etc.).
5. Incrustar en la web el script del SDK (beacon) que da el conector.

## Pendiente de ajustar

- Selectores marcados con `AJUSTAR` en el sitemap: input de cantidad y página de confirmación (`orderId`, `orderTotal`).
- Consentimiento fijo en OptIn: solo para demo. En producción leerlo del banner de cookies (RGPD).
- Validar en DevTools → Network que los nombres de campo del payload coinciden con el schema.
