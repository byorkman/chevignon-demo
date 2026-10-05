"use client";

import Link from "next/link";
import { useEffect, useState } from "react";
import { cartTotal, getCart, removeLine, updateQuantity, type CartLine } from "@/lib/cart";
import { formatCOP } from "@/data/products";

export default function CartPage() {
  const [lines, setLines] = useState<CartLine[]>([]);

  useEffect(() => {
    const refresh = () => setLines(getCart());
    refresh();
    window.addEventListener("fpd:cart-changed", refresh);
    return () => window.removeEventListener("fpd:cart-changed", refresh);
  }, []);

  const total = cartTotal(lines);

  if (lines.length === 0) {
    return (
      <div className="mx-auto max-w-3xl px-4 py-20 text-center">
        <h1 className="font-display text-3xl italic">Tu carrito está vacío</h1>
        <p className="mt-2 text-neutral-600">Explora la colección Fall Winter y encuentra tu próxima pieza.</p>
        <Link
          href="/productos"
          className="mt-6 inline-block border border-brand bg-brand px-8 py-3 text-xs font-semibold uppercase tracking-widest2 text-white hover:bg-brand-accent hover:border-brand-accent"
        >
          Ver productos
        </Link>
      </div>
    );
  }

  return (
    <div className="mx-auto max-w-4xl px-4 py-10">
      <h1 className="font-display text-4xl italic">Tu carrito</h1>
      <div className="mt-8 space-y-4">
        {lines.map((l) => (
          <div
            key={`${l.productId}-${l.size}`}
            className="flex items-center gap-4 border border-neutral-200 bg-white p-4"
          >
            <img src={l.image} alt={l.name} className="h-28 w-24 object-cover" />
            <div className="flex-1">
              <p className="font-medium">{l.name}</p>
              <p className="text-xs text-neutral-500">SKU {l.sku} · Talle {l.size ?? "—"}</p>
              <div className="mt-2 flex items-center gap-2">
                <button
                  onClick={() => updateQuantity(l.productId, l.size, l.quantity - 1)}
                  className="h-7 w-7 border border-neutral-300"
                >
                  −
                </button>
                <span className="w-6 text-center text-sm">{l.quantity}</span>
                <button
                  onClick={() => updateQuantity(l.productId, l.size, l.quantity + 1)}
                  className="h-7 w-7 border border-neutral-300"
                >
                  +
                </button>
                <button
                  onClick={() => removeLine(l.productId, l.size)}
                  className="ml-4 text-xs uppercase tracking-widest2 text-neutral-500 hover:text-brand-accent"
                >
                  Eliminar
                </button>
              </div>
            </div>
            <p className="text-right font-bold">{formatCOP(l.price * l.quantity)}</p>
          </div>
        ))}
      </div>

      <div className="mt-8 border border-neutral-200 bg-white p-6">
        <div className="flex items-center justify-between text-lg font-semibold">
          <span>Total</span>
          <span>{formatCOP(total)}</span>
        </div>
        <p className="mt-1 text-xs text-neutral-500">0% de interés hasta 3 cuotas</p>
        <Link
          href="/checkout"
          className="mt-6 block w-full border border-brand-accent bg-brand-accent px-6 py-3 text-center text-xs font-semibold uppercase tracking-widest2 text-white hover:bg-transparent hover:text-brand-accent"
        >
          Ir a checkout
        </Link>
      </div>
    </div>
  );
}
