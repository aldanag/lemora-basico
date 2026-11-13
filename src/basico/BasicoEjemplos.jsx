import { useCallback, useEffect, useRef, useState } from "react"
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome"
import { faArrowUpRightFromSquare } from "@fortawesome/free-solid-svg-icons"
import { useReveal } from "../lib/motion"
import Button from "../components/Button"
import DispositivosTienda, { prefiereQuieto } from "./DispositivosTienda"
import { EJEMPLO_WEB_LINK } from "../lib/planes"

// Cada tienda se muestra en una pantalla de escritorio y un celular con un video del scroll (ver
// DispositivosTienda.jsx para los nombres de los videos). Si en cambio guardás una imagen suelta en
// src/assets/basico/ como ejemplo-1, ejemplo-2 o ejemplo-3 (.webp, .png o .jpg), se muestra esa.
const fotos = import.meta.glob("../assets/basico/ejemplo-*.{webp,png,jpg}", {
  eager: true,
  import: "default",
})
const fotoDe = (n) => Object.entries(fotos).find(([ruta]) => ruta.includes(`ejemplo-${n}.`))?.[1]

const tiendas = [
  { n: 1, nombre: "Tommy Tommy", rubro: "Pizzería", href: "https://tommytommy.lemora.lat/" },
  { n: 2, nombre: "Amber Parfums", rubro: "Perfumería", href: "https://amberparfums.lemora.lat/" },
  { n: 3, nombre: "Belova", rubro: "Estética", href: "https://belova.lemora.lat/" },
]

// Cómo se mueven: "juntas" = las tres tiendas a la vez, cada video en bucle (al terminar arranca de
// nuevo desde arriba); "turnos" = de a una, de izquierda a derecha. Probá con ?modo=juntas o ?modo=turnos.
const MODO = "juntas"
// Barra del navegador con la dirección de cada tienda. Probá con ?navegador=1 (o ?navegador=0).
const NAVEGADOR = false

export default function BasicoEjemplos() {
  const root = useRef(null)
  const grilla = useRef(null)
  const [modo, setModo] = useState(MODO)
  const [navegador, setNavegador] = useState(NAVEGADOR)
  // Con "reducir movimiento" no arranca ningún video solo: se mueve la tarjeta sobre la que está el mouse.
  const [quieto] = useState(prefiereQuieto)
  const [activa, setActiva] = useState(quieto ? -1 : 0) // solo se usa en modo "turnos" o con "reducir movimiento"
  const [visible, setVisible] = useState(false)
  useReveal(root)

  const todasJuntas = modo === "juntas" && !quieto
  const siguiente = useCallback(() => {
    if (!quieto && modo === "turnos") setActiva((a) => (a + 1) % tiendas.length)
  }, [quieto, modo])

  useEffect(() => {
    const el = grilla.current
    if (!el || !("IntersectionObserver" in window)) {
      setVisible(true)
      return
    }
    const io = new IntersectionObserver(([entry]) => setVisible(entry.isIntersecting), { threshold: 0.4 })
    io.observe(el)
    return () => io.disconnect()
  }, [])

  useEffect(() => {
    const m = new URLSearchParams(window.location.search).get("modo")
    if (m && ["juntas", "turnos"].includes(m.toLowerCase())) setModo(m.toLowerCase())
    const nav = new URLSearchParams(window.location.search).get("navegador")
    if (nav === "1" || nav === "0") setNavegador(nav === "1")
  }, [])

  return (
    <section
      id="ejemplos"
      ref={root}
      className="bg-mist bg-[linear-gradient(to_bottom,#ffffff,var(--color-mist)_14rem)] py-16"
    >
      <div className="mx-auto max-w-6xl px-4 md:px-6">
        <div className="text-center">
          <span
            data-reveal
            className="inline-block rounded-full bg-lime px-2.5 py-1 text-[11px] font-semibold uppercase tracking-[0.08em] text-ink sm:px-3 sm:text-[12.5px] sm:tracking-[0.09em]"
          >
            Ejemplos por casos
          </span>
          <h2
            data-words
            className="mx-auto mt-4 max-w-2xl text-balance text-[clamp(25px,8.2vw,32px)] font-bold text-ink md:text-[34px]"
          >
            Mirá tiendas creadas con el plan Básico.
          </h2>
          <p data-reveal className="mx-auto mt-3 max-w-xl text-balance text-base text-ink-soft">
            Entrá a cada una y recorré cómo se ve y cómo se compra.
          </p>
        </div>

        <div ref={grilla} className="mt-10 grid gap-5 md:grid-cols-3">
          {tiendas.map((t, i) => {
            const foto = fotoDe(t.n)
            return (
              <article
                key={t.n}
                data-reveal
                onMouseEnter={() => setActiva(i)}
                onFocus={() => setActiva(i)}
                onMouseLeave={() => quieto && setActiva(-1)}
                onBlur={() => quieto && setActiva(-1)}
                className="flex flex-col rounded-3xl bg-white p-4 ring-1 ring-ink/10"
              >
                <a
                  href={t.href}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="group block overflow-hidden rounded-2xl bg-ink ring-1 ring-ink/10 focus-ring"
                  aria-label={`Ver la tienda ${t.nombre}`}
                >
                  {foto ? (
                    <img
                      src={foto}
                      alt={`Mockup de la tienda ${t.nombre}`}
                      loading="lazy"
                      decoding="async"
                      className="block h-auto w-full transition-transform duration-700 ease-out group-hover:scale-[1.03] motion-reduce:transition-none motion-reduce:group-hover:scale-100"
                    />
                  ) : (
                    <DispositivosTienda
                      n={t.n}
                      jugando={visible && (todasJuntas || activa === i)}
                      alTerminar={siguiente}
                      bucle={todasJuntas || quieto}
                      navegador={navegador}
                      dominio={new URL(t.href).hostname}
                    />
                  )}
                </a>
                <div className="mt-4 px-1">
                  <h3 className="text-[17px] font-bold text-ink">{t.nombre}</h3>
                  <p className="mt-0.5 text-[15px] text-ink-soft">{t.rubro}</p>
                </div>
                <Button href={t.href} external variant="primary" block className="mt-4 gap-2">
                  Ver tienda
                  <FontAwesomeIcon
                    icon={faArrowUpRightFromSquare}
                    className="h-3.5 w-3.5"
                    aria-hidden="true"
                  />
                </Button>
              </article>
            )
          })}
        </div>
      </div>
    </section>
  )
}
