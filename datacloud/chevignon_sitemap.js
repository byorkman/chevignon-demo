/**
 * Sitemap Chevignon Demo - Data Cloud (Salesforce Interactions SDK)
 *
 * Reglas clave:
 *  - interaction.eventType      -> debe coincidir con el developerName del schema Engagement
 *  - user.attributes.eventType  -> debe coincidir con el developerName del schema Profile
 *  - Los campos custom se envían planos y con el MISMO nombre que en el schema.
 *  - eventId, deviceId, sessionId, dateTime y category los rellena el SDK.
 */

const ENGAGEMENT_SCHEMA = "Chevignon_Engagement";
const PROFILE_SCHEMA = "Chevignon_Profile";

// ---------- Helpers ----------

const whenDomReady = (fn) =>
    document.readyState === "loading"
        ? document.addEventListener("DOMContentLoaded", fn)
        : fn();

// Elimina claves undefined/null/"" para no mandar basura a Data Cloud
const clean = (obj) =>
    Object.fromEntries(Object.entries(obj).filter(([, v]) => v !== undefined && v !== null && v !== ""));

// Lee el producto del JSON-LD (soporta varios <script>, arrays y @graph)
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
        const product = nodes.find((n) => {
            const type = n && n["@type"];
            return type === "Product" || (Array.isArray(type) && type.includes("Product"));
        });
        if (!product) continue;

        const offer = Array.isArray(product.offers) ? product.offers[0] : (product.offers || {});
        const price = parseFloat(offer.price);

        return clean({
            sku: product.sku != null ? String(product.sku) : undefined,
            productName: product.name,
            prodCategory: typeof product.category === "string" ? product.category : undefined,
            price: Number.isFinite(price) ? price : undefined,
            currency: offer.priceCurrency
        });
    }
    return {};
}

// AJUSTAR: selector del input de cantidad en la ficha de producto
function getQuantity() {
    const input = document.querySelector('input[name="quantity"], input[type="number"]');
    const qty = input ? parseInt(input.value, 10) : 1;
    return Number.isFinite(qty) && qty > 0 ? qty : 1;
}

function sendLogin(email) {
    if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) return;
    SalesforceInteractions.sendEvent({
        interaction: { name: "Identity Login" },
        user: {
            attributes: clean({
                eventType: PROFILE_SCHEMA,
                isAnonymous: "0",
                email: email.toLowerCase()
                // customerId: solo si la web expone un ID real del cliente (no inventarlo)
                // firstName:  solo si se dispone del nombre real
            })
        }
    });
}

// ---------- Init ----------

SalesforceInteractions.init({
    consents: [{
        provider: "Chevignon",
        purpose: "Personalization",
        status: SalesforceInteractions.ConsentStatus.OptIn // Demo. En producción: leer del CMP/banner de cookies
    }]
}).then(() => whenDomReady(() => {

    const sitemapConfig = {
        global: {
            listeners: [
                // Login por click en el botón
                SalesforceInteractions.listener("click", "#btn-login", () => {
                    const emailInput = document.querySelector("input[type='email']");
                    if (emailInput) sendLogin(emailInput.value.trim());
                }),
                // Login por Enter (submit del formulario)
                SalesforceInteractions.listener("submit", "form", (e) => {
                    const emailInput = e.target.querySelector("input[type='email']");
                    if (emailInput) sendLogin(emailInput.value.trim());
                })
            ]
        },

        pageTypeDefault: {
            name: "default",
            interaction: {
                name: "View Page",
                eventType: ENGAGEMENT_SCHEMA,
                pageUrl: window.location.href
            }
        },

        pageTypes: [
            {
                name: "product_detail",
                isMatch: () => /\/producto\//.test(window.location.pathname),
                interaction: {
                    name: "View Product",
                    eventType: ENGAGEMENT_SCHEMA,
                    pageUrl: window.location.href,
                    ...getProductFromJsonLd()
                },
                listeners: [
                    // :contains() no es un selector CSS válido -> se filtra por texto del botón
                    SalesforceInteractions.listener("click", "body", (e) => {
                        const btn = e.target.closest("button");
                        if (!btn || !/agregar al carrito/i.test(btn.textContent)) return;

                        SalesforceInteractions.sendEvent({
                            interaction: {
                                name: "Add to Cart",
                                eventType: ENGAGEMENT_SCHEMA,
                                pageUrl: window.location.href,
                                ...getProductFromJsonLd(),
                                quantity: getQuantity()
                            }
                        });
                    })
                ]
            },
            {
                // AJUSTAR: URL y selectores de la página de confirmación de pedido
                name: "order_confirmation",
                isMatch: () => /\/(confirmacion|gracias|order-confirmation)/.test(window.location.pathname),
                interaction: {
                    name: "Purchase",
                    eventType: ENGAGEMENT_SCHEMA,
                    pageUrl: window.location.href,
                    ...clean({
                        orderId: document.querySelector("[data-order-id]")?.getAttribute("data-order-id"),
                        orderTotal: parseFloat(document.querySelector("[data-order-total]")?.getAttribute("data-order-total")) || undefined
                    })
                }
            }
        ]
    };

    SalesforceInteractions.initSitemap(sitemapConfig);
}));
