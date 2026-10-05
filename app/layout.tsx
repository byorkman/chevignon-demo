import type { Metadata } from "next";
import "./globals.css";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import PersonalizationLoader from "@/components/PersonalizationLoader";
import DataCloudSitemap from "@/components/DataCloudSitemap";

export const metadata: Metadata = {
  title: "Chevignon — Tienda oficial | Fall Winter 2026",
  description:
    "Embrace Heritage, Experience Freedom. Denim, cuero y prendas atemporales para hombre, mujer y niños."
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="es">
      <body className="min-h-screen">
        <PersonalizationLoader />
        <DataCloudSitemap />
        <Header />
        <main>{children}</main>
        <Footer />
      </body>
    </html>
  );
}
