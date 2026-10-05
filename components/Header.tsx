"use client";

import Link from "next/link";
import { useEffect, useState } from "react";
import { cartCount, getCart } from "@/lib/cart";
import { getUser, logout, type FakeUser } from "@/lib/auth";
import { brandAssets } from "@/lib/brandAssets";

const nav = [
  { href: "/productos", label: "Nuevo" },
  { href: "/productos?cat=hombre", label: "Hombre" },
  { href: "/productos?cat=mujer", label: "Mujer" },
  { href: "/productos?cat=ninos", label: "Niños" },
  { href: "/productos?cat=accesorios", label: "Essentials" },
  { href: "/nuestra-historia", label: "Nuestra Historia" }
];

const strip = [
  "Cambios y devoluciones GRATIS",
  "Envíos Express en Medellín",
  "0% de interés hasta 3 cuotas"
];

export default function Header() {
  const [count, setCount] = useState(0);
  const [user, setUser] = useState<FakeUser | null>(null);
  const [stripIdx, setStripIdx] = useState(0);

  useEffect(() => {
    const refresh = () => {
      setCount(cartCount(getCart()));
      setUser(getUser());
    };
    refresh();
    window.addEventListener("fpd:cart-changed", refresh);
    window.addEventListener("fpd:user-changed", refresh);
    const t = setInterval(() => setStripIdx((i) => (i + 1) % strip.length), 4000);
    return () => {
      window.removeEventListener("fpd:cart-changed", refresh);
      window.removeEventListener("fpd:user-changed", refresh);
      clearInterval(t);
    };
  }, []);

  return (
    <header className="sticky top-0 z-40 w-full bg-white">
      <div className="bg-brand text-white">
        <div className="mx-auto max-w-7xl px-4 py-2 text-center text-[11px] uppercase tracking-widest2">
          {strip[stripIdx]}
        </div>
      </div>
      <div className="border-b border-neutral-200">
        <div className="mx-auto flex max-w-7xl items-center justify-between px-4 py-4">
          <Link href="/" className="flex items-center" aria-label="Chevignon home">
            <img src={brandAssets.logo} alt="Chevignon" className="h-8 md:h-10" />
          </Link>
          <nav className="hidden gap-6 text-[13px] font-medium uppercase tracking-wider md:flex">
            {nav.map((n) => (
              <Link key={n.href} href={n.href} className="text-neutral-800 hover:text-brand-accent">
                {n.label}
              </Link>
            ))}
          </nav>
          <div className="flex items-center gap-4 text-sm">
            {user ? (
              <>
                <span className="hidden text-neutral-600 md:inline">Hola, {user.firstName}</span>
                <button onClick={logout} className="text-neutral-500 hover:text-brand-accent">
                  Salir
                </button>
              </>
            ) : (
              <Link href="/login" className="hidden uppercase tracking-wider hover:text-brand-accent md:inline">
                Ingresar
              </Link>
            )}
            <Link
              href="/carrito"
              className="relative flex items-center gap-2 border border-brand bg-white px-4 py-2 text-xs uppercase tracking-widest2 text-brand hover:bg-brand hover:text-white"
            >
              Carrito
              {count > 0 && (
                <span className="flex h-5 min-w-5 items-center justify-center bg-brand-accent px-1.5 text-[10px] font-semibold text-white">
                  {count}
                </span>
              )}
            </Link>
          </div>
        </div>
      </div>
    </header>
  );
}
