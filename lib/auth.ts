"use client";

export type FakeUser = {
  customerId: string;
  email: string;
  firstName: string;
  loyaltyTier?: "Base" | "Silver" | "Gold" | "Platinum";
};

const KEY = "fpd_user";

export function getUser(): FakeUser | null {
  if (typeof window === "undefined") return null;
  try {
    const raw = localStorage.getItem(KEY);
    return raw ? (JSON.parse(raw) as FakeUser) : null;
  } catch {
    return null;
  }
}

export function login(email: string): FakeUser {
  const firstName = email.split("@")[0].replace(/[^a-z]/gi, "") || "Cliente";
  const user: FakeUser = {
    customerId: "cust-" + btoa(email).slice(0, 10),
    email,
    firstName: firstName.charAt(0).toUpperCase() + firstName.slice(1),
    loyaltyTier: "Silver"
  };
  localStorage.setItem(KEY, JSON.stringify(user));
  window.dispatchEvent(new CustomEvent("fpd:user-changed"));
  return user;
}

export function logout() {
  localStorage.removeItem(KEY);
  window.dispatchEvent(new CustomEvent("fpd:user-changed"));
}
