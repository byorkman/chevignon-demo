import Link from "next/link";
import HeroBanner from "@/components/HeroBanner";
import RecommendationCarousel from "@/components/RecommendationCarousel";
import { products } from "@/data/products";
import { brandAssets } from "@/lib/brandAssets";

export default function HomePage() {
  const loMasNuevo = products.filter((p) => p.tags.includes("fall-winter")).slice(0, 4);
  const essentials = products.filter((p) => p.tags.includes("essentials")).slice(0, 4);
  const premiumLeather = products.filter((p) => p.tags.includes("leather")).slice(0, 4);
  const denim = products.filter((p) => p.tags.includes("denim") || p.tags.includes("jeans")).slice(0, 4);
  const recentlyViewed = products.slice(15, 19);

  return (
    <>
      <HeroBanner />

      <RecommendationCarousel
        title="Lo Más Nuevo"
        subtitle="Descubre los últimos lanzamientos"
        products={loMasNuevo}
      />

      <section className="mx-auto max-w-7xl px-4 pb-6">
        <div className="mb-6">
          <p className="text-[10px] uppercase tracking-widest2 text-neutral-500">Explora</p>
          <h2 className="mt-1 font-display text-3xl italic md:text-4xl">
            Descubre las nuevas ediciones y colecciones de Fall Winter
          </h2>
        </div>
        <div className="grid grid-cols-1 gap-4 md:grid-cols-3">
          {[
            { label: "Chaquetas", href: "/productos?cat=hombre", img: brandAssets.exploraChaquetas },
            { label: "Zapatos", href: "/productos", img: brandAssets.exploraZapatos },
            { label: "Tejidos", href: "/productos?cat=mujer", img: brandAssets.exploraTejidos }
          ].map((c) => (
            <Link
              key={c.label}
              href={c.href}
              className="group relative block aspect-[3/4] overflow-hidden bg-neutral-200"
            >
              <img
                src={c.img}
                alt={c.label}
                className="h-full w-full object-cover transition duration-500 group-hover:scale-105"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/50 via-transparent to-transparent" />
              <div className="absolute inset-x-0 bottom-0 p-6">
                <p className="text-[10px] uppercase tracking-widest2 text-white/80">Explora</p>
                <p className="mt-1 font-display text-3xl italic text-white">{c.label}</p>
              </div>
            </Link>
          ))}
        </div>
      </section>

      <section className="mx-auto max-w-7xl px-4 py-10">
        <div className="grid grid-cols-2 gap-4 md:grid-cols-4">
          {[
            { label: "Hombre", href: "/productos?cat=hombre", img: brandAssets.tileHombre },
            { label: "Mujer", href: "/productos?cat=mujer", img: brandAssets.tileMujer },
            { label: "Denim", href: "/productos?cat=hombre", img: brandAssets.tileDenim },
            { label: "Cuero", href: "/productos?cat=accesorios", img: brandAssets.tileCuero }
          ].map((c) => (
            <Link key={c.label} href={c.href} className="group relative block aspect-[3/4] overflow-hidden bg-neutral-200">
              <img
                src={c.img}
                alt={c.label}
                className="h-full w-full object-cover transition duration-500 group-hover:scale-105"
              />
              <div className="absolute inset-0 bg-black/30 transition group-hover:bg-black/40" />
              <div className="absolute inset-x-0 bottom-0 p-4 text-center text-white">
                <p className="font-display text-2xl italic md:text-3xl">{c.label}</p>
              </div>
            </Link>
          ))}
        </div>
      </section>

      <section className="relative overflow-hidden">
        <div className="relative h-[380px] w-full md:h-[420px]">
          <img src={brandAssets.kidsBanner} alt="Kids" className="absolute inset-0 h-full w-full object-cover" />
          <div className="absolute inset-0 bg-gradient-to-r from-black/60 via-black/30 to-transparent" />
          <div className="relative mx-auto flex h-full max-w-7xl items-center px-4 md:px-8">
            <div className="max-w-xl text-white">
              <p className="text-[11px] uppercase tracking-widest2 text-white/80">Kids</p>
              <h2 className="mt-2 font-display text-4xl italic md:text-5xl">
                Explora nuestra colección para los más pequeños
              </h2>
              <Link
                href="/productos?cat=ninos"
                className="mt-6 inline-block border border-white bg-transparent px-8 py-3 text-[11px] font-semibold uppercase tracking-widest2 text-white transition hover:bg-white hover:text-brand"
              >
                Ver Kids
              </Link>
            </div>
          </div>
        </div>
      </section>

      <RecommendationCarousel
        title="Essentials"
        subtitle="Prendas con cortes y estilos atemporales, para todos los días"
        products={essentials}
      />

      <section className="relative bg-brand py-20 text-white">
        <div className="mx-auto grid max-w-7xl grid-cols-1 items-center gap-10 px-4 md:grid-cols-2 md:px-8">
          <div>
            <p className="text-[11px] uppercase tracking-widest2 text-brand-accent">Chevignon</p>
            <h2 className="mt-3 font-display text-4xl italic md:text-5xl">Nuestra historia</h2>
            <p className="mt-2 text-sm uppercase tracking-widest2 text-neutral-400">Back to the origins</p>
            <p className="mt-6 max-w-lg text-neutral-300">
              Desde nuestros orígenes celebramos la libertad, el espíritu del vuelo y la durabilidad
              del cuero y el denim. Cada pieza cuenta una historia — la tuya se suma desde hoy.
            </p>
            <Link
              href="/nuestra-historia"
              className="mt-8 inline-block border border-white px-8 py-3 text-[11px] font-semibold uppercase tracking-widest2 text-white transition hover:bg-white hover:text-brand"
            >
              Conoce más
            </Link>
          </div>
          <div className="relative aspect-[4/3] overflow-hidden">
            <img src={brandAssets.historia} alt="" className="h-full w-full object-cover" />
          </div>
        </div>
      </section>

      <section className="relative overflow-hidden">
        <div className="relative h-[520px] w-full">
          <img src={brandAssets.premiumLeather} alt="" className="absolute inset-0 h-full w-full object-cover" />
          <div className="absolute inset-0 bg-gradient-to-l from-black/70 via-black/30 to-transparent" />
          <div className="relative mx-auto flex h-full max-w-7xl items-center justify-end px-4 md:px-8">
            <div className="max-w-lg text-right text-white">
              <p className="text-[11px] uppercase tracking-widest2 text-white/80">Premium Leather</p>
              <h2 className="mt-3 font-display text-4xl italic md:text-6xl">Historia a través del uso</h2>
              <p className="mt-4 text-sm uppercase tracking-widest2 text-white/70">The Icons</p>
              <Link
                href="/productos?cat=accesorios"
                className="mt-8 inline-block border border-white px-8 py-3 text-[11px] font-semibold uppercase tracking-widest2 text-white transition hover:bg-white hover:text-brand"
              >
                Descubrir la colección
              </Link>
            </div>
          </div>
        </div>
      </section>

      {premiumLeather.length > 0 && (
        <RecommendationCarousel
          title="The Icons"
          subtitle="Cuero premium con historia — piezas que solo mejoran con el tiempo"
          products={premiumLeather}
        />
      )}

      <section className="relative overflow-hidden">
        <div className="relative h-[520px] w-full">
          <img src={brandAssets.denim} alt="" className="absolute inset-0 h-full w-full object-cover" />
          <div className="absolute inset-0 bg-gradient-to-r from-black/60 via-black/20 to-transparent" />
          <div className="relative mx-auto flex h-full max-w-7xl items-center px-4 md:px-8">
            <div className="max-w-lg text-white">
              <p className="text-[11px] uppercase tracking-widest2 text-white/80">Denim</p>
              <h2 className="mt-3 font-display text-4xl italic md:text-6xl">Nuestra esencia</h2>
              <Link
                href="/productos?cat=hombre"
                className="mt-8 inline-block border border-white px-8 py-3 text-[11px] font-semibold uppercase tracking-widest2 text-white transition hover:bg-white hover:text-brand"
              >
                Ver Denim
              </Link>
            </div>
          </div>
        </div>
      </section>

      {denim.length > 0 && (
        <RecommendationCarousel
          title="Denim para ti"
          subtitle="La esencia Chevignon en cada lavado"
          products={denim}
        />
      )}

      {recentlyViewed.length > 0 && (
        <RecommendationCarousel
          title="¿Aún te interesan?"
          subtitle="No los pierdas de vista"
          products={recentlyViewed}
        />
      )}
    </>
  );
}
