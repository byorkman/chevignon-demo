import Link from "next/link";
import ProductCard from "@/components/ProductCard";
import { byCategory, type Category } from "@/data/products";

const CATS: { key: Category | "todos"; label: string }[] = [
  { key: "todos", label: "Ver todo" },
  { key: "hombre", label: "Hombre" },
  { key: "mujer", label: "Mujer" },
  { key: "ninos", label: "Niños" },
  { key: "accesorios", label: "Accesorios" }
];

const TITLES: Record<Category, string> = {
  hombre: "Hombre",
  mujer: "Mujer",
  ninos: "Niños",
  accesorios: "Accesorios"
};

export default function ProductsPage({
  searchParams
}: {
  searchParams: { cat?: string };
}) {
  const active = (searchParams.cat as Category) || undefined;
  const items = byCategory(active);

  return (
    <div className="mx-auto max-w-6xl px-4 py-10">
      <div className="mb-8 flex flex-col gap-4 md:flex-row md:items-end md:justify-between">
        <div>
          <p className="text-[10px] uppercase tracking-widest2 text-neutral-500">Catálogo Chevignon</p>
          <h1 className="mt-1 font-display text-4xl italic">
            {active ? TITLES[active] : "Ver todo"}
          </h1>
          <p className="mt-1 text-sm text-neutral-500">Mostrando {items.length} productos</p>
        </div>
        <div className="flex flex-wrap gap-2 text-xs uppercase tracking-widest2">
          {CATS.map((c) => {
            const href = c.key === "todos" ? "/productos" : `/productos?cat=${c.key}`;
            const isActive = c.key === "todos" ? !active : active === c.key;
            return (
              <Link
                key={c.key}
                href={href}
                className={
                  "border px-4 py-2 " +
                  (isActive
                    ? "border-brand bg-brand text-white"
                    : "border-neutral-300 bg-white text-neutral-700 hover:border-brand")
                }
              >
                {c.label}
              </Link>
            );
          })}
        </div>
      </div>
      <div className="grid grid-cols-2 gap-4 md:grid-cols-4">
        {items.map((p) => (
          <ProductCard key={p.id} product={p} />
        ))}
      </div>
    </div>
  );
}
