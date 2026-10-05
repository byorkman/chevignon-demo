import type { MetadataRoute } from "next";
import { products } from "@/data/products";

/**
 * Sitemap consumido por:
 *  - Google / motores de búsqueda (SEO)
 *  - Salesforce Personalization → Admin UI → Dataset → Catalog → Ingestion → Sitemap URL
 *
 * Personalization crawlea cada URL de producto, parsea el JSON-LD (schema.org/Product)
 * y sincroniza los atributos con el Catalog Object Type "Product" en Data Cloud.
 */

const BASE_URL = process.env.NEXT_PUBLIC_SITE_URL || "http://localhost:3000";

export default function sitemap(): MetadataRoute.Sitemap {
  const now = new Date();

  const staticEntries: MetadataRoute.Sitemap = [
    { url: `${BASE_URL}/`, lastModified: now, changeFrequency: "daily", priority: 1 },
    { url: `${BASE_URL}/productos`, lastModified: now, changeFrequency: "daily", priority: 0.9 },
    { url: `${BASE_URL}/productos?cat=hombre`, lastModified: now, changeFrequency: "daily", priority: 0.9 },
    { url: `${BASE_URL}/productos?cat=mujer`, lastModified: now, changeFrequency: "daily", priority: 0.9 },
    { url: `${BASE_URL}/productos?cat=ninos`, lastModified: now, changeFrequency: "daily", priority: 0.9 },
    { url: `${BASE_URL}/productos?cat=accesorios`, lastModified: now, changeFrequency: "daily", priority: 0.9 },
    { url: `${BASE_URL}/nuestra-historia`, lastModified: now, changeFrequency: "monthly", priority: 0.6 }
  ];

  const productEntries: MetadataRoute.Sitemap = products.map((p) => ({
    url: `${BASE_URL}/producto/${p.id}`,
    lastModified: now,
    changeFrequency: "weekly",
    priority: 0.8
  }));

  return [...staticEntries, ...productEntries];
}
