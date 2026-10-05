/**
 * Sitemap Chevignon Demo - Data Cloud (Salesforce Interactions SDK)
 * Se pega en el editor de sitemap del conector web de Data Cloud.
 *
 * Adaptado al código real de la web (Next.js, navegación SPA):
 *  - La web cambia de página sin recargar -> se detectan los cambios de URL
 *    (pushState / replaceState / popstate) y se envía el evento en cada navegación.
 *  - Login: la web emite "fpd:user-changed" y guarda el usuario en localStorage("fpd_user").
 *  - Carrito: la web emite "fpd:cart-changed" y guarda el carrito en localStorage("fpd_cart").
 *    Comparando el carrito antes/después se detectan Add to Cart y Purchase
 *    (el checkout vacía el carrito al confirmar el pedido y no cambia de URL).
 *
 * Reglas:
 *  - interaction.eventType      = developerName del schema Engagement
 *  - user.attributes.eventType  = developerName del schema Profile
 *  - Campos custom planos y con el MISMO nombre que en el schema.
 *  - eventId, deviceId, sessionId, dateTime y category los rellena el SDK.
 */

(function () {
    const ENGAGEMENT_SCHEMA = "Chevignon_Engagement";
    const PROFILE_SCHEMA = "Chevignon_Profile";
    const CURRENCY = "COP";
    const USER_KEY = "fpd_user";
    const CART_KEY = "fpd_cart";

    // ---------- Helpers ----------

    const clean = (obj) =>
        Object.fromEntries(Object.entries(obj).filter(([, v]) => v !== undefined && v !== null && v !== ""));

    const readJson = (key, fallback) => {
        try {
            const raw = localStorage.getItem(key);
            return raw ? JSON.parse(raw) : fallback;
        } catch (e) {
            return fallback;
        }
    };

    const send = (name, fields) =>
        SalesforceInteractions.sendEvent({
            interaction: clean({
                name,
                eventType: ENGAGEMENT_SCHEMA,
                pageUrl: window.location.href,
                ...fields
            })
        });

    // Producto de la ficha, leído del JSON-LD que pinta components/ProductJsonLd.tsx
    function getProductFromJsonLd() {
        const scripts = document.querySelectorAll('script[type="application/ld+json"]');
        for (const script of scripts) {
            let data;
            try {
                data = JSON.parse(script.textContent);
            } catch (e) {
                continue;
            }
            const nodes = Array.isArray(data) ? data : (data["@graph"] || [data]);
            const product = nodes.find((n) => n && n["@type"] === "Product");
            if (!product) continue;

            const offer = Array.isArray(product.offers) ? product.offers[0] : (product.offers || {});
            const price = parseFloat(offer.price);
            return clean({
                sku: product.sku != null ? String(product.sku) : undefined,
                productName: product.name,
                prodCategory: typeof product.category === "string" ? product.category : undefined,
                price: Number.isFinite(price) ? price : undefined,
                currency: offer.priceCurrency || CURRENCY
            });
        }
        return null;
    }

    const isProductPage = () => /^\/producto\/[^/]+/.test(window.location.pathname);

    // ---------- Navegación (View Page / View Product) ----------

    let lastTrackedUrl = null;

    function trackNavigation() {
        const url = window.location.href;
        if (url === lastTrackedUrl) return;
        lastTrackedUrl = url;

        if (!isProductPage()) {
            send("View Page", {});
            return;
        }

        // En navegación SPA el JSON-LD del nuevo producto tarda un poco en aparecer
        const expectedPath = window.location.pathname;
        let tries = 0;
        (function waitForProduct() {
            const product = getProductFromJsonLd();
            const jsonLdMatches = product && document
                .querySelector('script[type="application/ld+json"]')
                ?.textContent.includes(expectedPath);
            if (jsonLdMatches || tries >= 20) {
                send("View Product", product || {});
                return;
            }
            tries++;
            setTimeout(waitForProduct, 100);
        })();
    }

    function watchUrlChanges() {
        const fire = () => setTimeout(trackNavigation, 0);
        ["pushState", "replaceState"].forEach((method) => {
            const original = history[method];
            history[method] = function () {
                const result = original.apply(this, arguments);
                fire();
                return result;
            };
        });
        window.addEventListener("popstate", fire);
    }

    // ---------- Login (Identity) ----------

    function watchLogin() {
        window.addEventListener("fpd:user-changed", () => {
            const user = readJson(USER_KEY, null);
            if (!user || !user.email) return; // logout -> no se envía nada

            SalesforceInteractions.sendEvent({
                interaction: { name: "Identity Login" },
                user: {
                    attributes: clean({
                        eventType: PROFILE_SCHEMA,
                        isAnonymous: "0",
                        email: String(user.email).trim().toLowerCase(),
                        customerId: user.customerId,
                        firstName: user.firstName,
                        loyaltyTier: user.loyaltyTier
                    })
                }
            });
        });
    }

    // ---------- Carrito (Add to Cart / Purchase) ----------

    const lineKey = (l) => `${l.productId}|${l.size || ""}`;

    function watchCart() {
        let previous = readJson(CART_KEY, []);

        window.addEventListener("fpd:cart-changed", () => {
            const current = readJson(CART_KEY, []);
            const before = Object.fromEntries(previous.map((l) => [lineKey(l), l]));

            // Pedido confirmado: el checkout vacía el carrito
            if (current.length === 0 && previous.length > 0 && window.location.pathname.startsWith("/checkout")) {
                const orderTotal = previous.reduce((sum, l) => sum + l.price * l.quantity, 0);
                const quantity = previous.reduce((sum, l) => sum + l.quantity, 0);
                // El número de pedido (CHV-XXXXXXXX) aparece en pantalla justo después
                setTimeout(() => {
                    const match = (document.body.textContent || "").match(/CHV-[A-Z0-9]+/);
                    send("Purchase", {
                        orderId: match ? match[0] : undefined,
                        orderTotal,
                        quantity,
                        currency: CURRENCY
                    });
                }, 500);
                previous = current;
                return;
            }

            // Unidades añadidas (desde la ficha o con "+" en el carrito)
            const pdpProduct = isProductPage() ? getProductFromJsonLd() : null;
            current.forEach((line) => {
                const added = line.quantity - (before[lineKey(line)]?.quantity || 0);
                if (added <= 0) return;
                send("Add to Cart", {
                    sku: line.sku,
                    productName: line.name,
                    prodCategory: pdpProduct && pdpProduct.sku === line.sku ? pdpProduct.prodCategory : undefined,
                    price: line.price,
                    currency: CURRENCY,
                    quantity: added
                });
            });

            previous = current;
        });
    }

    // ---------- Init ----------

    SalesforceInteractions.init({
        consents: [{
            provider: "Chevignon",
            purpose: "Personalization",
            status: SalesforceInteractions.ConsentStatus.OptIn // Demo. En producción: leer del banner de cookies
        }]
    }).then(() => {
        // Los eventos se envían a mano para soportar la navegación SPA de Next.js
        SalesforceInteractions.initSitemap({ global: {}, pageTypes: [] });

        watchLogin();
        watchCart();
        watchUrlChanges();

        if (document.readyState === "loading") {
            document.addEventListener("DOMContentLoaded", trackNavigation);
        } else {
            trackNavigation();
        }
    });
})();
