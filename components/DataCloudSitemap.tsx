"use client";

import Script from "next/script";
import { useEffect } from "react";

/**
 * Carga el Data Cloud Web SDK (sitemap tag).
 * Si NEXT_PUBLIC_DATACLOUD_SITEMAP_URL no está seteado, no carga nada.
 * La lógica de captura de eventos se define en el sitemap configurado en Data Cloud.
 */
export default function DataCloudSitemap() {
  const sitemapUrl = process.env.NEXT_PUBLIC_DATACLOUD_SITEMAP_URL;
  const tenant = process.env.NEXT_PUBLIC_DATACLOUD_TENANT;

  useEffect(() => {
    if (!sitemapUrl) {
      console.info(
        "[data-cloud] sitemap tag no configurado — setear NEXT_PUBLIC_DATACLOUD_SITEMAP_URL en .env.local para activar."
      );
    }
  }, [sitemapUrl]);

  if (!sitemapUrl) return null;

  return (
    <>
      {tenant && (
        <Script
          id="sf-datacloud-init"
          strategy="beforeInteractive"
          dangerouslySetInnerHTML={{
            __html: `window.SalesforceInteractionsDataCloud = { tenant: "${tenant}" };`
          }}
        />
      )}
      <Script src={sitemapUrl} strategy="afterInteractive" id="sf-datacloud-sitemap" async />
    </>
  );
}
