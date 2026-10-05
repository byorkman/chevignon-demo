import Link from "next/link";
import { brandAssets } from "@/lib/brandAssets";

export const metadata = {
  title: "Nuestra Historia — Chevignon",
  description: "Back to the origins. La historia de Chevignon: heritage, libertad, cuero y denim."
};

export default function NuestraHistoriaPage() {
  return (
    <>
      <section className="relative overflow-hidden">
        <div className="relative h-[520px] w-full">
          <img src={brandAssets.historia} alt="" className="absolute inset-0 h-full w-full object-cover" />
          <div className="absolute inset-0 bg-black/50" />
          <div className="relative mx-auto flex h-full max-w-4xl flex-col items-center justify-center px-4 text-center text-white">
            <p className="text-[11px] uppercase tracking-widest2 text-white/80">Chevignon</p>
            <h1 className="mt-3 font-display text-5xl italic md:text-7xl">Nuestra historia</h1>
            <p className="mt-3 text-sm uppercase tracking-widest2 text-white/70">Back to the origins</p>
          </div>
        </div>
      </section>

      <section className="mx-auto max-w-3xl px-4 py-16 text-neutral-800">
        <p className="text-lg leading-relaxed">
          En Chevignon nos dedicamos a crear piezas atemporales que celebran una historia compartida.
          Desde nuestros orígenes celebramos la libertad, el espíritu del vuelo y la durabilidad
          del cuero y el denim.
        </p>
        <p className="mt-6 leading-relaxed">
          Cada pieza cuenta una historia. Nuestras chaquetas de cuero envejecen con carácter, nuestro
          denim se moldea al uso, y nuestros esenciales acompañan cada día. Somos una marca de
          heritage — construida sobre décadas de oficio, obsesión por el detalle y respeto por
          quienes las visten.
        </p>
        <blockquote className="my-12 border-l-4 border-brand-accent bg-brand-cream/50 p-6 font-display text-2xl italic md:text-3xl">
          Embrace Heritage, Experience Freedom.
        </blockquote>
        <p className="leading-relaxed">
          Hoy sumas la tuya. Descubre las colecciones que celebran esa herencia — Denim, Premium
          Leather, Essentials — y encuentra la pieza que te acompaña.
        </p>
        <div className="mt-10 flex flex-wrap gap-3">
          <Link
            href="/productos?cat=hombre"
            className="border border-brand bg-brand px-6 py-3 text-[11px] font-semibold uppercase tracking-widest2 text-white hover:bg-brand-accent hover:border-brand-accent"
          >
            Ver Hombre
          </Link>
          <Link
            href="/productos?cat=mujer"
            className="border border-brand bg-white px-6 py-3 text-[11px] font-semibold uppercase tracking-widest2 text-brand hover:bg-brand hover:text-white"
          >
            Ver Mujer
          </Link>
        </div>
      </section>

      <section className="relative overflow-hidden">
        <div className="relative h-[420px] w-full">
          <img src={brandAssets.historiaSecondary} alt="" className="absolute inset-0 h-full w-full object-cover" />
        </div>
      </section>
    </>
  );
}
