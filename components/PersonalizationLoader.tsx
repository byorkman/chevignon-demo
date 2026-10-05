"use client";

import Script from "next/script";
import { useEffect } from "react";
import { trackPageView } from "@/lib/personalization";

/**
 * Carga el beacon de Salesforce Personalization y hace un ping de Page View inicial.
 * Si NEXT_PUBLIC_PERSONALIZATION_BEACON_URL no está seteado, no carga nada (dev-friendly).
 */
export default function PersonalizationLoader() {
  const beacon = process.env.NEXT_PUBLIC_PERSONALIZATION_BEACON_URL;
  const siteName = process.env.NEXT_PUBLIC_PERSONALIZATION_SITE_NAME || "fashion-demo";
  const cookieDomain = process.env.NEXT_PUBLIC_PERSONALIZATION_COOKIE_DOMAIN || "localhost";

  useEffect(() => {
    if (!beacon) {
      console.info(
        "[personalization] beacon no configurado — los eventos se loguean en consola. Setear NEXT_PUBLIC_PERSONALIZATION_BEACON_URL en .env.local."
      );
    }
  }, [beacon]);

  if (!beacon) return null;

  return (
    <>
      <Script
        id="sf-personalization-init"
        strategy="beforeInteractive"
        dangerouslySetInnerHTML={{
          __html: `window.SalesforceInteractionsConfig = { cookieDomain: "${cookieDomain}", siteName: "${siteName}" };`
        }}
      />
      <Script src={beacon} strategy="afterInteractive" id="sf-personalization-beacon" onLoad={() => trackPageView({})} />
    </>
  );
}
