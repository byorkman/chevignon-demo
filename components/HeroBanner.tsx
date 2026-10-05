"use client";

import Link from "next/link";
import { useEffect, useState } from "react";
import { fetchCampaign } from "@/lib/personalization";
import { getUser } from "@/lib/auth";
import { brandAssets } from "@/lib/brandAssets";

type Variant = {
  eyebrow: string;
  headline: string;
  subhead: string;
  cta: string;
  href: string;
  image: string;
  align?: "left" | "right";
};

const DEFAULT: Variant = {
  eyebrow: "Fall Winter",
  headline: "Embrace Heritage, Experience Freedom",
  subhead:
    "En Chevignon nos dedicamos a crear piezas atemporales que celebran una historia compartida.",
  cta: "Explorar colección",
  href: "/productos",
  image: brandAssets.heroMain,
  align: "left"
};

const KNOWN: Variant = {
  eyebrow: "Bienvenido de vuelta",
  headline: "Acceso anticipado a Premium Leather",
  subhead:
    "Como miembro Chevignon disfruta antes que nadie de la nueva colección — The Icons.",
  cta: "Ver Premium Leather",
  href: "/productos?cat=accesorios",
  image: brandAssets.premiumLeather,
  align: "left"
};

export default function HeroBanner() {
  const [variant, setVariant] = useState<Variant>(DEFAULT);

  useEffect(() => {
    if (getUser()) setVariant(KNOWN);

    (async () => {
      const payload = await fetchCampaign("home_hero");
      if (payload) {
        setVariant({ ...DEFAULT, ...payload });
      }
    })();
  }, []);

  return (
    <section className="relative overflow-hidden">
      <div className="relative h-[560px] w-full md:h-[640px]">
        <img
          src={variant.image}
          alt=""
          className="absolute inset-0 h-full w-full object-cover"
        />
        <div className={`absolute inset-0 ${variant.align === "right" ? "bg-gradient-to-l" : "bg-gradient-to-r"} from-black/70 via-black/30 to-transparent`} />
        <div className="relative mx-auto flex h-full max-w-7xl items-center px-4 md:px-8">
          <div className={`max-w-2xl text-white ${variant.align === "right" ? "ml-auto text-right" : ""}`}>
            <p className="text-[11px] uppercase tracking-widest2 text-white/85">{variant.eyebrow}</p>
            <h1 className="mt-3 font-display text-5xl italic leading-[1.05] md:text-7xl">
              {variant.headline}
            </h1>
            <p className="mt-6 max-w-lg text-base text-white/90 md:text-lg">
              {variant.subhead}
            </p>
            <Link
              href={variant.href}
              className="mt-8 inline-block border border-white bg-transparent px-10 py-3.5 text-[11px] font-semibold uppercase tracking-widest2 text-white transition hover:bg-white hover:text-brand"
            >
              {variant.cta}
            </Link>
          </div>
        </div>
      </div>
    </section>
  );
}
