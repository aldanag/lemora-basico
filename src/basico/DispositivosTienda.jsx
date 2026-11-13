import { useEffect, useRef, useState } from "react"
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome"
import { faImage } from "@fortawesome/free-solid-svg-icons"

// Videos de las tiendas de ejemplo: guardalos en src/assets/basico/ como
//   ejemplo-1-desktop.mp4  y  ejemplo-1-movil.mp4   (también sirve .webm; ejemplo-2-..., ejemplo-3-...)
// Una captura opcional (que se ve antes de que arranque el video o con "reducir movimiento"):
//   ejemplo-1-desktop-poster.webp  y  ejemplo-1-movil-poster.webp  (.png o .jpg)
// La página los toma solos; mientras no estén, los marcos muestran un lugar vacío.
// Los dos videos de una tienda tienen la misma duración y se reproducen una sola vez por turno
// (BasicoEjemplos decide cuál tarjeta se mueve).
const videos = import.meta.glob("../assets/basico/ejemplo-*-{desktop,movil}.{mp4,webm}", {
  eager: true,
  import: "default",
})
const posters = import.meta.glob("../assets/basico/ejemplo-*-{desktop,movil}-poster.{webp,png,jpg}", {
  eager: true,
  import: "default",
})

const buscar = (grupo, n, tipo, sufijo = "") =>
  Object.entries(grupo)
    .filter(([ruta]) => ruta.includes(`ejemplo-${n}-${tipo}${sufijo}.`))
    .sort(([a], [b]) => Number(b.endsWith(".webm")) - Number(a.endsWith(".webm"))) // el webm primero: pesa menos

// Fondo: el azul oscuro del design system (ink) con una iluminación violeta suave (primary y lavender).
const FONDO = {
  backgroundColor: "rgba(23,18,47,0.9)",
  backgroundImage:
    "radial-gradient(ellipse 85% 75% at 22% 18%, rgba(108,79,212,0.36), transparent 72%), radial-gradient(ellipse 60% 60% at 95% 100%, rgba(185,171,240,0.14), transparent 72%)",
}

export const hayVideo = (n) => buscar(videos, n, "desktop").length > 0

export const prefiereQuieto = () =>
  typeof window !== "undefined" && window.matchMedia("(prefers-reduced-motion: reduce)").matches

// Aviso para quien tiene "reducir movimiento": el video corre al pasar el mouse. Desaparece al hacerlo.
function Pista({ n }) {
  const [quieto] = useState(prefiereQuieto)
  if (!quieto || !hayVideo(n)) return null
  return (
    <span className="absolute bottom-2.5 left-2.5 hidden items-center gap-1.5 rounded-full bg-white/90 py-1 pl-2.5 pr-3 text-[11px] font-semibold text-ink transition-opacity duration-200 group-hover:opacity-0 group-focus-visible:opacity-0 [@media(hover:hover)]:inline-flex">
      <svg viewBox="0 0 24 24" className="h-3 w-3" fill="currentColor" aria-hidden="true">
        <path d="M8 5v14l11-7z" />
      </svg>
      Pasá el mouse
    </span>
  )
}

// Un video que corre una sola vez cuando le toca (`jugando`) y queda en el último cuadro hasta su próximo turno.
// El de escritorio avisa cuando termina (`alTerminar`) para pasar a la tienda siguiente.
function Pantalla({ n, tipo, etiqueta, jugando, alTerminar, bucle }) {
  const ref = useRef(null)
  const fuentes = buscar(videos, n, tipo)
  const poster = buscar(posters, n, tipo, "-poster")[0]?.[1]

  useEffect(() => {
    const el = ref.current
    if (!el) return
    if (jugando) {
      el.currentTime = 0
      el.play().catch(() => {})
    } else {
      el.pause()
    }
  }, [jugando])

  // Sin video de escritorio no hay nada que termine: se pasa de turno enseguida.
  useEffect(() => {
    if (!jugando || tipo !== "desktop" || fuentes.length > 0) return
    const t = setTimeout(() => alTerminar?.(), 1200)
    return () => clearTimeout(t)
  }, [jugando, tipo, fuentes.length, alTerminar])

  if (fuentes.length === 0) {
    return poster ? (
      <img src={poster} alt="" className="h-full w-full object-cover object-top" />
    ) : (
      <div className="flex h-full w-full flex-col items-center justify-center gap-1.5 bg-primary-tint text-primary">
        <FontAwesomeIcon icon={faImage} className="h-6 w-6" aria-hidden="true" />
        <p className="text-[11px] font-bold uppercase tracking-[0.09em]">{etiqueta}</p>
      </div>
    )
  }

  return (
    <video
      ref={ref}
      poster={poster}
      muted
      loop={bucle}
      playsInline
      preload="auto"
      onEnded={tipo === "desktop" ? alTerminar : undefined}
      aria-hidden="true"
      className="h-full w-full object-cover object-top"
    >
      {fuentes.map(([ruta, url]) => (
        <source key={ruta} src={url} type={ruta.endsWith(".webm") ? "video/webm" : "video/mp4"} />
      ))}
    </video>
  )
}

const Candado = ({ className }) => (
  <svg viewBox="0 0 24 24" className={className} fill="currentColor" aria-hidden="true">
    <path d="M7 10V8a5 5 0 0 1 10 0v2h1a1 1 0 0 1 1 1v9a1 1 0 0 1-1 1H6a1 1 0 0 1-1-1v-9a1 1 0 0 1 1-1h1Zm2 0h6V8a3 3 0 0 0-6 0v2Z" />
  </svg>
)

// Ventana de navegador de escritorio (opcional): tres puntos y la dirección de la tienda arriba del video.
function VentanaNavegador({ navegador, dominio, children }) {
  if (!navegador) return children
  return (
    <div className="flex h-full flex-col bg-white [container-type:inline-size]">
      <div className="flex h-[10.5%] flex-none items-center gap-[2cqw] bg-[#F2F2F7] px-[2.4cqw]">
        <span className="flex gap-[1cqw]">
          {[0, 1, 2].map((i) => (
            <i key={i} className="block h-[1.4cqw] w-[1.4cqw] rounded-full bg-ink/25" />
          ))}
        </span>
        <span className="mx-auto flex h-[78%] w-[52%] items-center justify-center gap-[1cqw] rounded-full bg-white px-[2cqw] text-[2.4cqw] font-medium leading-none text-ink-soft ring-1 ring-ink/10">
          <Candado className="h-[2.2cqw] w-[2.2cqw] flex-none" />
          <span className="truncate">{dominio}</span>
        </span>
        <span className="w-[6cqw]" />
      </div>
      <div className="min-h-0 flex-1">{children}</div>
    </div>
  )
}

// Celular: solo un rectángulo de esquinas redondeadas con un contorno claro por fuera, sin marco ni borde
// arriba. El radio es chico: la curva recorta únicamente la franja negra de Lemora Ads que trae cada tienda
// arriba, y el logo queda justo debajo, sin tocar. Sale cortado por el borde de abajo de la tarjeta.
function Celular({ posicion, ...props }) {
  return (
    <div className={`absolute ${posicion} aspect-[9/19] overflow-hidden rounded-t-[0.8rem] bg-white ring-1 ring-white/70`}>
      <Pantalla {...props} tipo="movil" etiqueta="Celular" />
    </div>
  )
}

// La tienda en una pantalla de escritorio (un rectángulo moderno de esquinas redondeadas) y en un celular
// cortado por el borde de abajo de la tarjeta, sobre un fondo azul oscuro con un resplandor violeta.
// Va dentro de un link: es decorativo.
// `jugando` = es el turno de esta tienda; `alTerminar` = avisa que el video terminó;
// `bucle` = al terminar vuelve a empezar solo; `navegador` = simula la barra del navegador de escritorio
// con la dirección (`dominio`) de la tienda.
export default function DispositivosTienda({ n, jugando = false, alTerminar, bucle = false, navegador = false, dominio = "" }) {
  const props = { n, jugando, alTerminar, bucle, navegador, dominio }
  return (
    <div className="relative aspect-[16/10] w-full overflow-hidden" style={FONDO} aria-hidden="true">
      <div className="absolute left-[5%] top-[10%] aspect-[16/10] w-[80%] overflow-hidden rounded-2xl bg-white ring-1 ring-white/20">
        <VentanaNavegador navegador={navegador} dominio={dominio}>
          <Pantalla {...props} tipo="desktop" etiqueta="Desktop" />
        </VentanaNavegador>
      </div>
      <Celular {...props} posicion="right-[6%] top-[26%] w-[25%]" />
      <Pista n={n} />
    </div>
  )
}
