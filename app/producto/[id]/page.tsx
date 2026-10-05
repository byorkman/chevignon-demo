import { notFound } from "next/navigation";
import { getProduct, getRelated } from "@/data/products";
import ProductDetail from "./ProductDetail";
import ProductJsonLd from "@/components/ProductJsonLd";
import RecommendationCarousel from "@/components/RecommendationCarousel";

const BASE_URL = process.env.NEXT_PUBLIC_SITE_URL || "http://localhost:3000";

export default function ProductPage({ params }: { params: { id: string } }) {
  const product = getProduct(params.id);
  if (!product) notFound();
  const related = getRelated(product.id);

  return (
    <>
      <ProductJsonLd product={product} baseUrl={BASE_URL} />
      <ProductDetail product={product} />
      <RecommendationCarousel title="También te puede interesar" products={related} />
    </>
  );
}
