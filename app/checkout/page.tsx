"use client";

import Link from "next/link";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import { cartTotal, clearCart, getCart, type CartLine } from "@/lib/cart";
import { getUser, type FakeUser } from "@/lib/auth";
import { trackOrder } from "@/lib/personalization";
import { formatCOP } from "@/data/products";

export default function CheckoutPage() {
  const router = useRouter();
  const [lines, setLines] = useState<CartLine[]>([]);
  const [user, setUser] = useState<FakeUser | null>(null);
  const [placed, setPlaced] = useState<string | null>(null);

  useEffect(() => {
    setLines(getCart());
    setUser(getUser());
  }, []);

  const total = cartTotal(lines);

  const placeOrder = () => {
    if (!user) {
      router.push("/login?next=/checkout");
      return;
    }
    const orderId = "CHV-" + Math.random().toString(36).slice(2, 10).toUpperCase();
    trackOrder(orderId, lines, total);
    clearCart();
    setPlaced(orderId);
  };

  if (placed) {
    return (
      <div className="mx-auto max-w-lg px-4 py-20 text-center">
        <p className="text-xs uppercase tracking-widest2 text-brand-accent">Confirmado</p>
        <h1 className="mt-2 font-display text-4xl italic">¡Gracias por tu compra!</h1>
        <p className="mt-2 text-neutral-600">Tu pedido {placed} está en camino.</p>
        <div className="mt-6 border border-dashed border-neutral-300 bg-white p-4 text-left text-xs text-neutral-600">
          <p className="font-semibold text-neutral-700">Evento enviado a Personalization</p>
          <p className="mt-1">
            <code className="rounded bg-neutral-100 px-1">Order</code> con {lines.length} line items · Total {formatCOP(total)}.
            El perfil ya tiene señal de compra para segmentaciones futuras.
          </p>
        </div>
        <Link
          href="/productos"
          className="mt-8 inline-block border border-brand bg-brand px-8 py-3 text-xs font-semibold uppercase tracking-widest2 text-white hover:bg-brand-accent hover:border-brand-accent"
        >
          Seguir comprando
        </Link>
      </div>
    );
  }

  if (lines.length === 0) {
    return (
      <div className="mx-auto max-w-lg px-4 py-20 text-center">
        <h1 className="font-display text-3xl italic">No hay productos en el carrito</h1>
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
    <div className="mx-auto max-w-3xl px-4 py-10">
      <h1 className="font-display text-4xl italic">Checkout</h1>

      {!user && (
        <div className="mt-6 border border-amber-300 bg-amber-50 p-4 text-sm">
          <p className="font-semibold text-amber-800">Todavía eres un visitante anónimo</p>
          <p className="mt-1 text-amber-700">
            <Link href="/login?next=/checkout" className="underline">
              Ingresa con tu email
            </Link>{" "}
            para completar el pedido — así unificamos tu perfil con el histórico de navegación.
          </p>
        </div>
      )}

      <div className="mt-6 border border-neutral-200 bg-white p-6">
        <h2 className="text-xs font-semibold uppercase tracking-widest2">Resumen</h2>
        <ul className="mt-3 divide-y divide-neutral-200 text-sm">
          {lines.map((l) => (
            <li key={`${l.productId}-${l.size}`} className="flex justify-between py-2">
              <span>
                {l.name} × {l.quantity} <span className="text-neutral-400">({l.size ?? "—"})</span>
              </span>
              <span>{formatCOP(l.price * l.quantity)}</span>
            </li>
          ))}
        </ul>
        <div className="mt-3 flex justify-between border-t border-neutral-200 pt-3 font-bold">
          <span>Total</span>
          <span>{formatCOP(total)}</span>
        </div>
      </div>

      <button
        onClick={placeOrder}
        className="mt-6 w-full border border-brand-accent bg-brand-accent px-6 py-3 text-xs font-semibold uppercase tracking-widest2 text-white hover:bg-transparent hover:text-brand-accent"
      >
        Confirmar pedido
      </button>
    </div>
  );
}
