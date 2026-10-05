"use client";

import { Product } from "@/data/products";

export type CartLine = {
  productId: string;
  sku: string;
  name: string;
  price: number;
  quantity: number;
  image: string;
  size?: string;
};

const KEY = "fpd_cart";

function read(): CartLine[] {
  if (typeof window === "undefined") return [];
  try {
    return JSON.parse(localStorage.getItem(KEY) || "[]");
  } catch {
    return [];
  }
}

function write(lines: CartLine[]) {
  localStorage.setItem(KEY, JSON.stringify(lines));
  window.dispatchEvent(new CustomEvent("fpd:cart-changed"));
}

export function getCart(): CartLine[] {
  return read();
}

export function addToCart(p: Product, size?: string, quantity = 1): CartLine[] {
  const lines = read();
  const existing = lines.find((l) => l.productId === p.id && l.size === size);
  if (existing) {
    existing.quantity += quantity;
  } else {
    lines.push({
      productId: p.id,
      sku: p.sku,
      name: p.name,
      price: p.price,
      quantity,
      image: p.image,
      size
    });
  }
  write(lines);
  return lines;
}

export function updateQuantity(productId: string, size: string | undefined, quantity: number) {
  const lines = read()
    .map((l) => (l.productId === productId && l.size === size ? { ...l, quantity } : l))
    .filter((l) => l.quantity > 0);
  write(lines);
}

export function removeLine(productId: string, size?: string) {
  const lines = read().filter((l) => !(l.productId === productId && l.size === size));
  write(lines);
}

export function clearCart() {
  write([]);
}

export function cartTotal(lines: CartLine[] = read()): number {
  return lines.reduce((sum, l) => sum + l.price * l.quantity, 0);
}

export function cartCount(lines: CartLine[] = read()): number {
  return lines.reduce((sum, l) => sum + l.quantity, 0);
}
