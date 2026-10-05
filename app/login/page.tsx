"use client";

import { useRouter, useSearchParams } from "next/navigation";
import { Suspense, useState } from "react";
import { login } from "@/lib/auth";
import { identify } from "@/lib/personalization";

function LoginForm() {
  const router = useRouter();
  const params = useSearchParams();
  const next = params.get("next") || "/";
  const [email, setEmail] = useState("");

  const submit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!email) return;
    const user = login(email);
    identify(user);
    router.push(next);
  };

  return (
    <div className="mx-auto max-w-md px-4 py-16">
      <p className="text-xs uppercase tracking-widest2 text-brand-accent">Plan de lealtad</p>
      <h1 className="mt-1 font-display text-4xl italic">Ingresa a Chevignon</h1>
      <p className="mt-2 text-neutral-600">
        Para la demo basta con poner un email — no se envía contraseña.
      </p>
      <form onSubmit={submit} className="mt-8 space-y-4">
        <div>
          <label className="text-xs uppercase tracking-widest2">Email</label>
          <input
            type="email"
            required
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            className="mt-1 w-full border border-neutral-300 bg-white px-3 py-2 focus:border-brand focus:outline-none"
            placeholder="cliente@example.com"
          />
        </div>
        <button
          type="submit"
          className="w-full border border-brand bg-brand px-6 py-3 text-xs font-semibold uppercase tracking-widest2 text-white hover:bg-brand-accent hover:border-brand-accent"
        >
          Ingresar
        </button>
      </form>
      <div className="mt-8 border border-dashed border-neutral-300 bg-white p-4 text-xs text-neutral-600">
        <p className="font-semibold text-neutral-700">Handoff anónimo → conocido</p>
        <p className="mt-1">
          Al hacer login se dispara el evento <code className="rounded bg-neutral-100 px-1">Identity</code> con
          customerId + email. Data Cloud fusiona el perfil anónimo (histórico de navegación) con el Individual conocido.
        </p>
      </div>
    </div>
  );
}

export default function LoginPage() {
  return (
    <Suspense fallback={<div className="mx-auto max-w-md px-4 py-16">Cargando…</div>}>
      <LoginForm />
    </Suspense>
  );
}
