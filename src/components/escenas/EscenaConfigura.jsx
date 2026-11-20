import banner from "../../assets/escenas/carrusel-lentes-1.webp"
import lente1 from "../../assets/escenas/respaldo-lente-1.webp"
import lente2 from "../../assets/escenas/respaldo-lente-2.webp"
import lente3 from "../../assets/escenas/respaldo-lente-3.webp"
import { abs, AvisoOscuro, IconoCarrito, Pegatina, raiz, Toque, u } from "./utiles"

// Escena "Configurá tu tienda": la pantalla Diseño del panel (Identidad visual: logotipo, color principal, tamaño del logotipo) y,
// abajo, la tienda con su encabezado, su slider y sus productos, que se actualiza con lo que se elige. Lienzo de 768 px que escala
// con el ancho del marco (--u = 1 px del lienzo). Bucle de 12 s mientras está a la vista (`activa`): un toque en "Subir" carga el
// logo, otro en un color cambia el color principal de toda la tienda, otro en "Large" agranda el logotipo. En reposo (o con
// "reducir movimiento") queda todo ya configurado. Los productos y los textos de la tienda son de ejemplo.
const COLORES = ["#6C4FD4", "#E94B8B", "#FF9A52", "#2BB5A8", "#17122F"]
const PASO_COLOR = 56
const TAMANOS = [
  ["Small", "40 px", 28],
  ["Medium", "60 px", 40],
  ["Large", "80 px", 52],
]
const PASO_TAM = 170
const PRODUCTOS = [
  [lente1, "Lentes Marine", "$ 12.500"],
  [lente2, "Lentes Italy", "$ 14.500"],
  [lente3, "Lentes Burdeos", "$ 9.900"],
]

const Nube = () => (
  <svg viewBox="0 0 24 24" style={{ width: u(22), height: u(22) }} fill="#17122F" aria-hidden="true">
    <path d="M7 18a4.5 4.5 0 0 1-.6-8.96A6 6 0 0 1 18 8.6 4.7 4.7 0 0 1 17.5 18H13v-4.2l1.6 1.6 1.4-1.4L12 10l-4 4 1.4 1.4L11 13.8V18Z" />
  </svg>
)

const centro = { display: "flex", alignItems: "center", justifyContent: "center" }

export default function EscenaConfigura({ activa = false }) {
  return (
    <div aria-hidden="true" className={`absolute inset-0 overflow-hidden ${activa ? "cf-activa" : ""}`} style={raiz}>
      {/* Trazos decorativos de fondo */}
      <svg viewBox="0 0 768 768" className="absolute inset-0 h-full w-full" fill="none">
        <path d="M-20 330C30 270 100 280 120 350C135 400 120 440 90 480" stroke="#CBC0F2" strokeWidth="26" strokeLinecap="round" opacity="0.7" />
        <path d="M600 800C640 740 700 720 800 730" stroke="#CBC0F2" strokeWidth="26" strokeLinecap="round" opacity="0.7" />
      </svg>

      {/* Panel: Identidad visual */}
      <div style={{ ...abs(60, 40, { width: u(648), height: u(288) }), background: "#fff", borderRadius: u(30), boxShadow: `0 ${u(18)} ${u(46)} rgba(94,70,190,0.2)` }} />
      <span style={{ ...abs(96, 58), fontSize: u(26), fontWeight: 700, color: "#17122F", lineHeight: 1.2 }}>Identidad visual</span>

      {/* Logotipo */}
      <span style={{ ...abs(96, 104), fontSize: u(18), fontWeight: 600, color: "#17122F", lineHeight: 1.2 }}>Logotipo de la tienda</span>
      <div style={{ ...abs(96, 134, { width: u(128), height: u(74) }), border: `${u(2)} dashed #D6D2E6`, borderRadius: u(14), background: "#FAFAFC", boxSizing: "border-box" }} />
      <span className="cf-sin" style={{ ...abs(96, 160, { width: u(128) }), textAlign: "center", fontSize: u(15), color: "#8E89A3", lineHeight: 1.2 }}>Sin archivo</span>
      <span className="cf-logo-caja" style={{ ...abs(96, 134, { width: u(128), height: u(74) }), ...centro, fontSize: u(28), fontWeight: 800, color: COLORES[1], letterSpacing: "-0.02em" }}>Velvet</span>
      <div className="cf-subir" style={{ ...abs(238, 148, { width: u(106), height: u(46) }), border: `${u(1.5)} solid #E4DFF3`, borderRadius: u(10), background: "#fff", boxSizing: "border-box", ...centro, gap: u(6), fontSize: u(18), fontWeight: 600, color: "#17122F" }}>
        <Nube />
        Subir
      </div>

      {/* Color principal */}
      <span style={{ ...abs(396, 104), fontSize: u(18), fontWeight: 600, color: "#17122F", lineHeight: 1.2 }}>Color principal</span>
      {COLORES.map((c, k) => (
        <span key={c} style={{ ...abs(404 + k * PASO_COLOR, 146, { width: u(40), height: u(40) }), borderRadius: "50%", background: c }} />
      ))}
      <span className="cf-col" style={{ ...abs(398, 140, { width: u(52), height: u(52) }), borderRadius: "50%", border: `${u(3)} solid #17122F`, boxSizing: "border-box", transform: `translateX(calc(var(--u) * ${PASO_COLOR}))` }} />
      <span style={{ ...abs(396, 204), fontSize: u(15), color: "#8E89A3", lineHeight: 1.3 }}>Cambia botones y detalles de toda la tienda.</span>

      {/* Tamaño del logotipo */}
      <span style={{ ...abs(96, 226), fontSize: u(18), fontWeight: 600, color: "#17122F", lineHeight: 1.2 }}>Tamaño del logotipo</span>
      {TAMANOS.map(([nombre, px, ancho], i) => (
        <div key={nombre} style={{ ...abs(96 + i * PASO_TAM, 254, { width: u(156), height: u(56) }), border: `${u(1.5)} solid #E4DFF3`, borderRadius: u(12), background: "#fff", boxSizing: "border-box" }}>
          <span style={{ ...abs(14, 25, { width: u(ancho * 0.6), height: u(10) }), background: "#6C4FD4", borderRadius: u(3) }} />
          <span style={{ ...abs(62, 8), fontSize: u(17), fontWeight: 700, color: "#17122F", lineHeight: 1.2 }}>{nombre}</span>
          <span style={{ ...abs(62, 30), fontSize: u(14), color: "#8E89A3", lineHeight: 1.2 }}>{px}</span>
        </div>
      ))}
      <div className="cf-sel" style={{ ...abs(96, 254, { width: u(156), height: u(56) }), border: `${u(3)} solid #6C4FD4`, borderRadius: u(12), boxSizing: "border-box", boxShadow: "0 0 0 4px rgba(108,79,212,0.18)", transform: `translateX(calc(var(--u) * ${PASO_TAM * 2}))` }} />

      {/* La tienda (con el logo, el color y el tamaño elegidos) */}
      <div style={{ ...abs(60, 346, { width: u(648), height: u(372) }), background: "#fff", borderRadius: u(30), boxShadow: `0 ${u(18)} ${u(46)} rgba(94,70,190,0.2)` }} />
      {/* Barra promocional */}
      <div className="cf-c-bg" style={{ ...abs(60, 346, { width: u(648), height: u(32) }), background: COLORES[1], borderTopLeftRadius: u(30), borderTopRightRadius: u(30), ...centro, color: "#fff", fontSize: u(14), fontWeight: 600 }}>
        Envíos a todo el país  ·  Compra mínima $ 70.000
      </div>
      {/* Productos: tarjetas verticales como las de la tienda, cortadas por el borde de abajo. El recorte queda fijo; las tarjetas suben y bajan con el encabezado. */}
      <div style={{ ...abs(60, 540, { width: u(648), height: u(178) }), overflow: "hidden", borderBottomLeftRadius: u(30), borderBottomRightRadius: u(30) }}>
        <div className="cf-abajo" style={{ position: "absolute", inset: 0 }}>
          {PRODUCTOS.map(([src, nombre, precio], k) => (
            <div key={nombre} style={{ ...abs(20 + k * 208, 48, { width: u(192), height: u(220) }), border: `${u(1.5)} solid #EEEBF5`, borderRadius: u(14), boxSizing: "border-box", background: "#fff" }}>
              <div style={{ ...abs(7, 7, { width: u(176), height: u(66) }), borderRadius: u(9), background: "#F3F0FF" }}>
                <img src={src} alt="" style={{ ...abs(14, 8, { width: u(110), height: u(50) }), objectFit: "contain", mixBlendMode: "multiply" }} />
                <span className="cf-c-bg" style={{ ...abs(142, 32, { width: u(28), height: u(28) }), borderRadius: "50%", background: COLORES[1], ...centro }}>
                  <svg viewBox="0 0 24 24" style={{ width: u(15), height: u(15) }} fill="none">
                    <path d="M12 5v14M5 12h14" stroke="#fff" strokeWidth="2.8" strokeLinecap="round" />
                  </svg>
                </span>
              </div>
              <span style={{ ...abs(12, 82), fontSize: u(14), fontWeight: 600, color: "#17122F", lineHeight: 1.25, whiteSpace: "nowrap" }}>{nombre}</span>
              <span className="cf-c-tx" style={{ ...abs(12, 104), fontSize: u(14), fontWeight: 700, color: COLORES[1], lineHeight: 1.25 }}>{precio}</span>
            </div>
          ))}
        </div>
      </div>

      {/* Encabezado: todo centrado en la misma línea. Con el logo grande el encabezado crece y baja el resto (cf-cab / cf-abajo). */}
      <div className="cf-cab" style={{ position: "absolute", inset: 0 }}>
        <span className="cf-prev-sin" style={{ ...abs(90, 394.6), fontSize: u(24), fontWeight: 800, color: "#17122F", letterSpacing: "-0.02em", lineHeight: 1.2, opacity: 0 }}>Tu tienda</span>
        <span className="cf-prev-logo" style={{ ...abs(90, 393.4), fontSize: u(26), fontWeight: 800, color: COLORES[1], letterSpacing: "-0.02em", lineHeight: 1.2, transformOrigin: "left center", transform: "scale(1.4)" }}>Velvet</span>
        <div style={{ ...abs(232, 394, { width: u(172), height: u(30) }), background: "#F3F2F8", borderRadius: u(15), display: "flex", alignItems: "center", justifyContent: "space-between", padding: `0 ${u(10)} 0 ${u(12)}`, boxSizing: "border-box", fontSize: u(11.5), color: "#8E89A3", whiteSpace: "nowrap" }}>
          ¿Qué estás buscando?
          <svg viewBox="0 0 24 24" style={{ width: u(14), height: u(14) }} fill="none" aria-hidden="true">
            <circle cx="11" cy="11" r="6.5" stroke="#8E89A3" strokeWidth="2.4" />
            <path d="m16 16 4.5 4.5" stroke="#8E89A3" strokeWidth="2.4" strokeLinecap="round" />
          </svg>
        </div>
        {[["Inicio", true, 420], ["Productos", false, 478], ["Preguntas", false, 552]].map(([t, act, x]) => (
          <span key={t} className={act ? "cf-c-tx" : ""} style={{ ...abs(x, 401.2), fontSize: u(13), fontWeight: 500, color: act ? COLORES[1] : "#17122F", lineHeight: 1.2, whiteSpace: "nowrap" }}>{t}</span>
        ))}
        {/* Carrito de la tienda */}
        <IconoCarrito x={660} y={398} size={22} color="#17122F" />
      </div>

      {/* Slider: la imagen ocupa todo el ancho */}
      <div className="cf-abajo" style={{ position: "absolute", inset: 0 }}>
        <div style={{ ...abs(60, 440, { width: u(648), height: u(130) }), overflow: "hidden", background: "#17122F" }}>
          <img src={banner} alt="" style={{ position: "absolute", inset: 0, width: "100%", height: "100%", objectFit: "cover" }} />
          <div style={{ position: "absolute", inset: 0, background: "linear-gradient(90deg, rgba(23,18,47,0.6) 0%, rgba(23,18,47,0.28) 45%, rgba(23,18,47,0) 72%)" }} />
          <span style={{ ...abs(40, 36), fontSize: u(28), fontWeight: 700, color: "#fff", lineHeight: 1.15 }}>Nuevos lanzamientos</span>
          <span style={{ ...abs(40, 78, { width: u(300) }), fontSize: u(15), color: "#F1EEF8", lineHeight: 1.35 }}>Descubrí lo último que llegó a la tienda.</span>
        </div>
        {[0, 1].map((k) => (
          <span key={k} style={{ ...abs(k ? 668 : 72, 491, { width: u(28), height: u(28) }), borderRadius: "50%", background: "rgba(23,18,47,0.55)", ...centro }}>
            <svg viewBox="0 0 24 24" style={{ width: u(14), height: u(14), transform: k ? "none" : "rotate(180deg)" }} fill="none">
              <path d="m9 6 6 6-6 6" stroke="#fff" strokeWidth="2.6" strokeLinecap="round" strokeLinejoin="round" />
            </svg>
          </span>
        ))}
        {/* Puntitos del slider: el activo se estira */}
        {[345, 359, 387, 401, 415].map((x, k) => (
          <span key={k} className={k === 1 ? "cf-c-bg" : ""} style={{ ...abs(x, 552, { width: u(k === 1 ? 22 : 8), height: u(8) }), borderRadius: u(4), background: k === 1 ? COLORES[1] : "rgba(255,255,255,0.6)" }} />
        ))}
      </div>

      <Pegatina className="cf-sticker" xd={738} y={6} giro={6}>
        <span style={{ fontSize: u(36), fontWeight: 800, lineHeight: 1.1 }}>Tu marca</span>
        <span style={{ fontSize: u(14), fontWeight: 500, letterSpacing: "0.06em", opacity: 0.85, marginTop: u(4) }}>SIN CÓDIGO</span>
      </Pegatina>
      <AvisoOscuro className="cf-aviso" x={36} y={696} h={58} texto="Se actualiza en tu tienda" />

      <Toque clase="cf-ta" x={291} y={171} ini={1.47} dur={12} />
      <Toque clase="cf-tb" x={480} y={166} ini={3.5} dur={12} />
      <Toque clase="cf-tc" x={518} y={282} ini={5.7} dur={12} />
    </div>
  )
}
