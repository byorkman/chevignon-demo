"use client";

import { useEffect, useState } from "react";
import type { Product } from "@/data/products";
import { formatCOP } from "@/data/products";
import { addToCart } from "@/lib/cart";
import { trackAddToCart, trackProductView } from "@/lib/personalization";

export default function ProductDetail({ product }: { product: Product }) {
  const [size, setSize] = useState(product.sizes[0]);
  const [added, setAdded] = useState(false);
  const hasSale = product.originalPrice && product.originalPrice > product.price;

  useEffect(() => {
    trackProductView(product);
  }, [product]);

  const handleAdd = () => {
    addToCart(product, size, 1);
    trackAddToCart(product, 1, size);
    setAdded(true);
    setTimeout(() => setAdded(false), 1600);
  };

  return (
    <section className="mx-auto grid max-w-6xl grid-cols-1 gap-10 px-4 py-10 md:grid-cols-2">
      <div className="overflow-hidden bg-neutral-100">
        <img src={product.image} alt={product.name} className="h-full w-full object-cover" />
      </div>
      <div>
        <p className="text-[10px] uppercase tracking-widest2 text-neutral-500">{product.subcategory}</p>
        <h1 className="mt-1 font-display text-3xl italic md:text-4xl">{product.name}</h1>

        <div className="mt-4 flex items-baseline gap-3">
          <p className="text-2xl font-bold text-brand">{formatCOP(product.price)}</p>
          {hasSale && (
            <>
              <p className="text-base text-neutral-400 line-through">
                {formatCOP(product.originalPrice!)}
              </p>
              <span className="bg-brand-accent px-2 py-0.5 text-[10px] font-semibold uppercase tracking-widest2 text-white">
                −{Math.round((1 - product.price / product.originalPrice!) * 100)}%
              </span>
            </>
          )}
        </div>
        <p className="mt-1 text-xs text-neutral-500">0% de interés hasta 3 cuotas</p>

        <p className="mt-6 text-neutral-700">{product.description}</p>

        <div className="mt-6">
          <p className="text-xs uppercase tracking-widest2">
            Color: <span className="normal-case tracking-normal text-neutral-600">{product.color}</span>
          </p>
        </div>

        <div className="mt-6">
          <p className="mb-2 text-xs uppercase tracking-widest2">Talle</p>
          <div className="flex flex-wrap gap-2">
            {product.sizes.map((s) => (
              <button
                key={s}
                onClick={() => setSize(s)}
                className={
                  "min-w-[3rem] border px-3 py-2 text-sm " +
                  (size === s
                    ? "border-brand bg-brand text-white"
                    : "border-neutral-300 bg-white text-neutral-800 hover:border-brand")
                }
              >
                {s}
              </button>
            ))}
          </div>
        </div>

        <button
          onClick={handleAdd}
          className="mt-8 w-full border border-brand-accent bg-brand-accent px-6 py-3 text-xs font-semibold uppercase tracking-widest2 text-white transition hover:bg-transparent hover:text-brand-accent md:w-auto md:px-12"
        >
          {added ? "Agregado ✓" : "Agregar al carrito"}
        </button>

        <div className="mt-6 space-y-1 text-xs text-neutral-600">
          <p>✓ Envíos Express en Medellín y Área Metropolitana</p>
          <p>✓ Cambios y devoluciones GRATIS</p>
        </div>

        <div className="mt-8 border border-dashed border-neutral-300 bg-white/50 p-4 text-xs text-neutral-600">
          <p className="font-semibold text-neutral-700">Personalization insight</p>
          <p className="mt-1">
            Al ver este producto se dispara <code className="rounded bg-white px-1">View Catalog Object</code> con SKU {product.sku}.
            Data Cloud lo suma al perfil (anónimo o conocido) y refina los próximos slots.
          </p>
        </div>
      </div>
    </section>
  );
}
