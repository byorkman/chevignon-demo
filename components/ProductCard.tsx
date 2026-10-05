import Link from "next/link";
import type { Product } from "@/data/products";
import { formatCOP } from "@/data/products";

export default function ProductCard({ product }: { product: Product }) {
  const hasSale = product.originalPrice && product.originalPrice > product.price;
  return (
    <Link
      href={`/producto/${product.id}`}
      className="group block overflow-hidden bg-white transition hover:shadow-md"
    >
      <div className="relative aspect-[4/5] w-full overflow-hidden bg-neutral-100">
        <img
          src={product.image}
          alt={product.name}
          className="h-full w-full object-cover transition duration-500 group-hover:scale-105"
          loading="lazy"
        />
        {hasSale && (
          <span className="absolute left-3 top-3 bg-brand-accent px-2 py-1 text-[10px] font-semibold uppercase tracking-widest2 text-white">
            Sale
          </span>
        )}
      </div>
      <div className="p-4">
        <p className="text-[10px] uppercase tracking-widest2 text-neutral-500">{product.subcategory}</p>
        <h3 className="mt-1 line-clamp-2 text-sm font-medium text-neutral-900">{product.name}</h3>
        <div className="mt-2 flex items-baseline gap-2">
          <p className="text-base font-bold text-brand">{formatCOP(product.price)}</p>
          {hasSale && (
            <p className="text-xs text-neutral-400 line-through">
              {formatCOP(product.originalPrice!)}
            </p>
          )}
        </div>
        <p className="mt-1 text-[10px] text-neutral-500">0% de interés hasta 3 cuotas</p>
      </div>
    </Link>
  );
}
