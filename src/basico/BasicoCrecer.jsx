import { useRef } from "react"
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome"
import { faBoxesStacked, faBullhorn, faCreditCard, faTags, faTruckFast, faUsers } from "@fortawesome/free-solid-svg-icons"
import { useReveal } from "../lib/motion"
import Button from "../components/Button"
import { PREMIUM_LANDING_LINK } from "../lib/planes"
import { ETIQUETA } from "../lib/pastillas"

// Sección en azul, antes de los precios: "Cuando crezcas", con lo que suma el plan Premium. Solo lo que Premium incluye de verdad
// (misma lista que la tarjeta del plan Premium en src/lib/planes.js).
const VENTAJAS = [
  {
    icono: faCreditCard,
    titulo: "Mercado Pago y cuotas",
    texto: "Cobrá con tarjeta y ofrecé venta en cuotas, además de efectivo y transferencia.",
  },
  {
    icono: faBoxesStacked,
    titulo: "Mayorista o minorista",
    texto: "Vendé por mayor y por menor, con compra mínima por monto o por cantidad de productos.",
  },
  {
    icono: faUsers,
    titulo: "Clientes e inventario",
    texto: "Un panel con tus clientes y sus pedidos confirmados, exportable, y edición rápida de stock.",
  },
  {
    icono: faTags,
    titulo: "Categorías con su página",
    texto: "Menú y página propia para cada categoría, con filtrador para encontrar todo más rápido.",
  },
  {
    icono: faBullhorn,
    titulo: "Marketing que vende",
    texto: "Notificación de confianza, ofertas por tiempo limitado, promociones y una ventana emergente al salir.",
  },
  {
    icono: faTruckFast,
    titulo: "Envío gratis y gastos de gestión",
    texto: "Definí el envío gratis y los gastos de gestión, por cantidad o por monto.",
  },
]

const Corona = () => (
  <svg viewBox="0 0 24 24" className="h-3.5 w-3.5" fill="currentColor" aria-hidden="true">
    <path d="M3 8l4.5 3.5L12 5l4.5 6.5L21 8l-2 10H5z" />
  </svg>
)

export default function BasicoCrecer() {
  const root = useRef(null)
  useReveal(root)

  return (
    <section id="cuando-crezcas" ref={root} className="bg-night-2 py-16 text-white md:py-[4.5rem]">
      <div className="mx-auto max-w-6xl px-4 md:px-6">
        <div className="text-center">
          <span data-reveal className={ETIQUETA}>
            Cuando crezcas
          </span>
          <h2
            data-words
            className="mx-auto mt-4 max-w-2xl text-balance text-[clamp(25px,8.2vw,32px)] font-bold md:text-[34px]"
          >
            Cuando tu tienda crezca, pasá a Premium.
          </h2>
          <p data-reveal className="mx-auto mt-3 max-w-xl text-balance text-base text-snow-soft">
            Todo lo del plan Básico, y además lo que necesitás para vender más y conocer mejor a tus clientes.
          </p>
        </div>

        <div className="mt-10 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
          {VENTAJAS.map((v) => (
            <article
              key={v.titulo}
              data-reveal
              className="rounded-3xl bg-ink p-6 ring-1 ring-white/10 transition-transform duration-300 ease-out hover:-translate-y-1 motion-reduce:transition-none motion-reduce:hover:transform-none"
            >
              <span className="flex h-11 w-11 items-center justify-center rounded-full bg-white/10 text-lavender">
                <FontAwesomeIcon icon={v.icono} className="h-[18px] w-[18px]" aria-hidden="true" />
              </span>
              <h3 className="mt-4 text-[19px] font-bold leading-tight">{v.titulo}</h3>
              <p className="mt-2 text-[15px] text-snow-soft">{v.texto}</p>
            </article>
          ))}
        </div>

        <div data-reveal className="mt-10 flex flex-col items-center gap-4 text-center">
          <p className="flex items-center gap-2 text-[15px] text-snow-soft">
            <span className="inline-flex items-center gap-1.5 rounded-full bg-white/10 px-3 py-1 text-[12.5px] font-semibold uppercase tracking-[0.09em] text-white">
              <Corona />
              Premium
            </span>
            Pasás desde el panel o escribiéndonos, y actualizamos tu plan en el día.
          </p>
          <Button href={PREMIUM_LANDING_LINK} external variant="inverse" size="lg">
            Ver todo lo que incluye Premium
          </Button>
        </div>
      </div>
    </section>
  )
}
