import Link from "next/link";
import { brandAssets } from "@/lib/brandAssets";

export default function Footer() {
  return (
    <>
      <section className="border-t border-neutral-200 bg-white">
        <div className="mx-auto grid max-w-7xl grid-cols-1 gap-6 px-4 py-10 md:grid-cols-4">
          {[
            { title: "Cambios y devoluciones GRATIS", copy: "Gestiona tus pedidos por web o en tiendas físicas." },
            { title: "Envíos Express", copy: "Para Medellín y el Área Metropolitana." },
            { title: "Múltiples medios de pago", copy: "Métodos de pago que se ajustan a tus necesidades." },
            { title: "Opciones de financiación", copy: "Ahora el crédito Chevignon es Su+ Pay." }
          ].map((b) => (
            <div key={b.title} className="text-center">
              <p className="text-xs font-semibold uppercase tracking-widest2 text-brand">{b.title}</p>
              <p className="mt-2 text-xs text-neutral-600">{b.copy}</p>
            </div>
          ))}
        </div>
      </section>

      <section className="border-t border-neutral-200 bg-neutral-50">
        <div className="mx-auto flex max-w-3xl flex-col items-center px-4 py-12 text-center">
          <p className="text-[11px] uppercase tracking-widest2 text-brand-accent">Newsletter</p>
          <h3 className="mt-2 font-display text-2xl italic md:text-3xl">Sé el primero en enterarte</h3>
          <p className="mt-2 text-sm text-neutral-600">
            Suscríbete para recibir lanzamientos, tendencias, descuentos y más.
          </p>
          <form className="mt-5 flex w-full max-w-md gap-2">
            <input
              type="email"
              placeholder="Tu email"
              className="flex-1 border border-neutral-300 bg-white px-3 py-2.5 text-sm focus:border-brand focus:outline-none"
            />
            <button
              type="button"
              className="bg-brand px-5 py-2.5 text-[11px] font-semibold uppercase tracking-widest2 text-white hover:bg-brand-accent"
            >
  Suscribirme
            </button>
          </form>
        </div>
      </section>

      <footer className="border-t border-neutral-200 bg-brand text-neutral-300">
        <div className="mx-auto max-w-7xl px-4 py-14 text-sm">
          <div className="grid grid-cols-1 gap-10 md:grid-cols-5">
            <div className="md:col-span-2">
              <img src={brandAssets.logo} alt="Chevignon" className="h-9 invert brightness-0" style={{ filter: "invert(1) brightness(2)" }} />
              <p className="mt-4 font-display text-lg italic text-brand-cream">
                Embrace Heritage,<br />Experience Freedom
              </p>
              <p className="mt-4 text-xs leading-relaxed text-neutral-400">
                Calle 14 # 52 A 372<br />
                Medellín, Colombia<br />
                Línea nacional: 604 604 1557<br />
                WhatsApp: +57 322 519 6168
              </p>
              <div className="mt-4 flex gap-3 text-xs uppercase tracking-widest2 text-neutral-400">
                <a href="https://www.instagram.com/chevignon_ch" target="_blank" rel="noreferrer noopener" className="hover:text-white">Instagram</a>
                <span>·</span>
                <a href="https://www.facebook.com/ChevignonFrance" target="_blank" rel="noreferrer noopener" className="hover:text-white">Facebook</a>
                <span>·</span>
                <a href="https://www.tiktok.com/@chevignonch" target="_blank" rel="noreferrer noopener" className="hover:text-white">TikTok</a>
              </div>
            </div>
            <div>
              <p className="text-xs font-semibold uppercase tracking-widest2 text-white">Sobre nosotros</p>
              <ul className="mt-3 space-y-2 text-xs text-neutral-400">
                <li><Link href="/nuestra-historia" className="hover:text-white">Historia de la marca</Link></li>
                <li>Encuentra tu tienda</li>
                <li>Trabaja con nosotros</li>
                <li>Mapa del sitio</li>
              </ul>
            </div>
            <div>
              <p className="text-xs font-semibold uppercase tracking-widest2 text-white">Información</p>
              <ul className="mt-3 space-y-2 text-xs text-neutral-400">
                <li>Términos y condiciones</li>
                <li>Política de cookies</li>
                <li>Política de cambios y devoluciones</li>
                <li>Tratamiento de datos personales</li>
                <li>Preguntas frecuentes</li>
              </ul>
            </div>
            <div>
              <p className="text-xs font-semibold uppercase tracking-widest2 text-white">Servicio al cliente</p>
              <ul className="mt-3 space-y-2 text-xs text-neutral-400">
                <li>Gestiona tu cambio o devolución</li>
                <li>PQR y otras solicitudes</li>
                <li>Estado de mi PQR</li>
                <li>Garantías y devoluciones</li>
              </ul>
              <div className="mt-6 flex items-center gap-4">
                <img src={brandAssets.trustSIC} alt="SIC" className="h-12 bg-white p-1" />
                <img src={brandAssets.trustETrust} alt="eTrust" className="h-12 bg-white p-1" />
              </div>
            </div>
          </div>
          <div className="mt-12 border-t border-neutral-800 pt-6 text-[11px] text-neutral-500">
            <p>© 2026 Chevignon · Comodin S.A.S · NIT 800.069.933-6 · Todos los derechos reservados</p>
            <p className="mt-1 italic">
              Demo educativa integrada con Salesforce Personalization — no procesa pagos reales.
              Assets referenciados por hot-link al CDN de Chevignon. No afiliado a la marca.
            </p>
          </div>
        </div>
      </footer>
    </>
  );
}
