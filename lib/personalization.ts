"use client";

/**
 * Wrapper sobre el SDK de Salesforce Personalization (Interactions API).
 * El SDK global expone `SalesforceInteractions` una vez cargado desde el beacon.
 * Todas las llamadas hacen no-op si el SDK todavía no está listo (permite dev sin credenciales).
 */

import type { CartLine } from "./cart";
import type { Product } from "@/data/products";

declare global {
  interface Window {
    SalesforceInteractions?: any;
  }
}

function sdk(): any | null {
  if (typeof window === "undefined") return null;
  return window.SalesforceInteractions || null;
}

export function trackPageView(page: {
  category?: string;
  name?: string;
  url?: string;
}) {
  const s = sdk();
  if (!s) return;
  try {
    s.sendEvent({
      interaction: {
        name: "Page View",
        category: page.category,
        page: {
          name: page.name || (typeof document !== "undefined" ? document.title : undefined),
          url: page.url || (typeof window !== "undefined" ? window.location.href : undefined)
        }
      }
    });
  } catch (e) {
    console.warn("[personalization] trackPageView failed", e);
  }
}

export function trackProductView(p: Product) {
  const s = sdk();
  if (!s) return;
  try {
    s.sendEvent({
      interaction: {
        name: "View Catalog Object",
        catalogObject: {
          type: "Product",
          id: p.id,
          attributes: {
            sku: p.sku,
            name: p.name,
            category: p.category,
            subcategory: p.subcategory,
            brand: "Chevignon",
            price: p.price,
            currency: p.currency,
            color: p.color,
            tags: p.tags.join(",")
          }
        }
      }
    });
  } catch (e) {
    console.warn("[personalization] trackProductView failed", e);
  }
}

export function trackAddToCart(p: Product, quantity: number, size?: string) {
  const s = sdk();
  if (!s) return;
  try {
    s.sendEvent({
      interaction: {
        name: "Cart",
        lineItem: {
          catalogObject: { type: "Product", id: p.id },
          quantity,
          price: p.price,
          currency: p.currency,
          attributes: { size: size || "" }
        }
      }
    });
  } catch (e) {
    console.warn("[personalization] trackAddToCart failed", e);
  }
}

export function trackOrder(orderId: string, lines: CartLine[], totalValue: number) {
  const s = sdk();
  if (!s) return;
  try {
    s.sendEvent({
      interaction: {
        name: "Order",
        order: {
          id: orderId,
          currency: "USD",
          totalValue,
          lineItems: lines.map((l) => ({
            catalogObject: { type: "Product", id: l.productId },
            quantity: l.quantity,
            price: l.price,
            attributes: { size: l.size || "" }
          }))
        }
      }
    });
  } catch (e) {
    console.warn("[personalization] trackOrder failed", e);
  }
}

/**
 * Handoff anónimo → conocido: linkea la sesión actual al customerId.
 * Data Cloud debería resolver el perfil anónimo bajo el mismo Individual.
 */
export function identify(user: { customerId: string; email: string; firstName?: string }) {
  const s = sdk();
  if (!s) return;
  try {
    s.sendEvent({
      interaction: { name: "Identity" },
      user: {
        identities: {
          customerId: user.customerId,
          email: user.email
        },
        attributes: {
          firstName: user.firstName
        }
      }
    });
  } catch (e) {
    console.warn("[personalization] identify failed", e);
  }
}

/**
 * Solicita una campaña (banner/CTA personalizado) por punto de decisión.
 * Retorna el payload que el server-side de Personalization emita para ese slot.
 */
export async function fetchCampaign(campaignName: string): Promise<any | null> {
  const s = sdk();
  if (!s) return null;
  try {
    return await new Promise((resolve) => {
      s.getCampaign?.({ campaignName }, (payload: any) => resolve(payload));
      setTimeout(() => resolve(null), 1500);
    });
  } catch {
    return null;
  }
}
