import type { Product } from "@/data/products";
import ProductCard from "./ProductCard";

export default function RecommendationCarousel({
  title,
  subtitle,
  products
}: {
  title: string;
  subtitle?: string;
  products: Product[];
}) {
  return (
    <section className="mx-auto max-w-6xl px-4 py-12">
      <div className="mb-6 flex items-end justify-between">
        <div>
          <h2 className="font-display text-3xl italic">{title}</h2>
          {subtitle && <p className="mt-1 text-sm text-neutral-600">{subtitle}</p>}
        </div>
        <span className="text-[10px] uppercase tracking-widest2 text-neutral-500">
          Recomendado
        </span>
      </div>
      <div className="grid grid-cols-2 gap-4 md:grid-cols-4">
        {products.map((p) => (
          <ProductCard key={p.id} product={p} />
        ))}
      </div>
    </section>
  );
}
