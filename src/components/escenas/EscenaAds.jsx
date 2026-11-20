import banner from "../../assets/escenas/carrusel-lentes-2.webp"
import lente1 from "../../assets/escenas/respaldo-lente-1.webp"
import lente2 from "../../assets/escenas/respaldo-lente-2.webp"
import lente3 from "../../assets/escenas/respaldo-lente-3.webp"
import { abs, AvisoOscuro, IconoCarrito, raiz, u } from "./utiles"

// Escena "Lemora Ads": la franja promocional que corre arriba de la tienda. En el plan Básico lleva el aviso de Lemora; con Premium
// se reemplaza por los mensajes y el color de la tienda (el ejemplo es el de una tienda Premium real: "Precios mayoristas · Envíos a
// todo el país · Compra mínima $70.000"). La tienda es el modelo minimalista de Lemora: franja, encabezado, slider y productos.
// Lienzo de 768 px que escala con el ancho del marco (--u = 1 px del lienzo). Bucle de 12 s mientras está a la vista (`activa`):
// franja de Lemora → franja propia (Premium) → vuelve. En reposo (o con "reducir movimiento") queda la franja de Lemora, la del Básico.
const AD_LEMORA = "Hecho con Lemora  ·  Tu tienda online. Sin comisiones  ·  "
const AD_PROPIA = "Precios mayoristas  ·  Envíos a todo el país  ·  Compra mínima $ 70.000  ·  "
const PRODUCTOS = [
  [lente1, "Lentes Marine", "$ 12.500"],
  [lente2, "Lentes Italy", "$ 14.500"],
  [lente3, "Lentes Burdeos", "$ 9.900"],
]
const centro = { display: "flex", alignItems: "center", justifyContent: "center" }

const Franja = ({ clase, fondo, texto, opacidad }) => (
  <div className={clase} style={{ ...abs(48, 120, { width: u(672), height: u(46) }), background: fondo, borderTopLeftRadius: u(34), borderTopRightRadius: u(34), overflow: "hidden", opacity: opacidad }}>
    <div className="ca-pista" style={{ position: "absolute", left: 0, top: 0, height: "100%", display: "flex", alignItems: "center", whiteSpace: "nowrap", fontSize: u(19), fontWeight: 600, color: "#fff", width: "max-content" }}>
      {[0, 1, 2, 3].map((k) => (
        <span key={k}>{texto}</span>
      ))}
    </div>
  </div>
)

export default function EscenaAds({ activa = false }) {
  return (
    <div aria-hidden="true" className={`absolute inset-0 overflow-hidden ${activa ? "ca-activa" : ""}`} style={raiz}>
      <svg viewBox="0 0 768 768" className="absolute inset-0 h-full w-full" fill="none">
        <path d="M-20 600C40 560 100 570 130 630C150 670 150 720 140 800" stroke="#CBC0F2" strokeWidth="26" strokeLinecap="round" opacity="0.7" />
        <path d="M560 -20C600 30 680 30 800 10" stroke="#CBC0F2" strokeWidth="26" strokeLinecap="round" opacity="0.7" />
      </svg>

      {/* La tienda */}
      <div style={{ ...abs(48, 120, { width: u(672), height: u(488) }), background: "#fff", borderRadius: u(34), boxShadow: `0 ${u(18)} ${u(46)} rgba(94,70,190,0.2)` }} />
      <Franja clase="ca-lemora" fondo="#17122F" texto={AD_LEMORA} opacidad={1} />
      <Franja clase="ca-propia" fondo="#F25CC1" texto={AD_PROPIA} opacidad={0} />

      {/* Encabezado: logo, menú y carrito */}
      <span style={{ ...abs(84, 181), fontSize: u(26), fontWeight: 800, color: "#17122F", letterSpacing: "-0.02em", lineHeight: 1.2 }}>Tu tienda</span>
      {[["Inicio", true, 410], ["Productos", false, 484], ["Preguntas", false, 576]].map(([t, act, x]) => (
        <span key={t} style={{ ...abs(x, 186), fontSize: u(16), fontWeight: 500, color: act ? "#6C4FD4" : "#17122F", lineHeight: 1.2, whiteSpace: "nowrap" }}>{t}</span>
      ))}
      <IconoCarrito x={676} y={184} size={24} color="#17122F" />

      {/* Slider */}
      <div style={{ ...abs(48, 230, { width: u(672), height: u(160) }), overflow: "hidden", background: "#17122F" }}>
        <img src={banner} alt="" style={{ position: "absolute", inset: 0, width: "100%", height: "100%", objectFit: "cover" }} />
        <div style={{ position: "absolute", inset: 0, background: "linear-gradient(90deg, rgba(23,18,47,0.6) 0%, rgba(23,18,47,0.28) 45%, rgba(23,18,47,0) 72%)" }} />
        <span style={{ ...abs(52, 52), fontSize: u(30), fontWeight: 700, color: "#fff", lineHeight: 1.15 }}>Nuevos lanzamientos</span>
        <span style={{ ...abs(52, 96, { width: u(330) }), fontSize: u(16), color: "#F1EEF8", lineHeight: 1.35 }}>Descubrí lo último que llegó a la tienda.</span>
      </div>
      {[0, 1].map((k) => (
        <span key={k} style={{ ...abs(k ? 684 : 64, 295, { width: u(30), height: u(30) }), borderRadius: "50%", background: "rgba(23,18,47,0.55)", ...centro }}>
          <svg viewBox="0 0 24 24" style={{ width: u(15), height: u(15), transform: k ? "none" : "rotate(180deg)" }} fill="none">
            <path d="m9 6 6 6-6 6" stroke="#fff" strokeWidth="2.6" strokeLinecap="round" strokeLinejoin="round" />
          </svg>
        </span>
      ))}
      {[357, 371, 399, 413, 427].map((x, k) => (
        <span key={k} style={{ ...abs(x, 372, { width: u(k === 1 ? 22 : 8), height: u(8) }), borderRadius: u(4), background: k === 1 ? "#6C4FD4" : "rgba(255,255,255,0.6)" }} />
      ))}

      {/* Productos: tarjetas verticales como las de la tienda, cortadas por el borde de abajo */}
      <div style={{ ...abs(48, 408, { width: u(672), height: u(200) }), overflow: "hidden", borderBottomLeftRadius: u(34), borderBottomRightRadius: u(34) }}>
        {PRODUCTOS.map(([src, nombre, precio], k) => (
          <div key={nombre} style={{ ...abs(28 + k * 208, 0, { width: u(192), height: u(230) }), border: `${u(1.5)} solid #EEEBF5`, borderRadius: u(16), background: "#fff", boxSizing: "border-box" }}>
            <div style={{ ...abs(8, 8, { width: u(174), height: u(112) }), borderRadius: u(10), background: "#F3F0FF" }}>
              <img src={src} alt="" style={{ ...abs(12, 14, { width: u(150), height: u(84) }), objectFit: "contain", mixBlendMode: "multiply" }} />
              <span style={{ ...abs(138, 74, { width: u(30), height: u(30) }), borderRadius: "50%", background: "#6C4FD4", ...centro }}>
                <svg viewBox="0 0 24 24" style={{ width: u(16), height: u(16) }} fill="none">
                  <path d="M12 5v14M5 12h14" stroke="#fff" strokeWidth="2.8" strokeLinecap="round" />
                </svg>
              </span>
            </div>
            <span style={{ ...abs(14, 132), fontSize: u(16), fontWeight: 600, color: "#17122F", lineHeight: 1.2, whiteSpace: "nowrap" }}>{nombre}</span>
            <span style={{ ...abs(14, 158), fontSize: u(16), fontWeight: 700, color: "#6C4FD4", lineHeight: 1.2 }}>{precio}</span>
          </div>
        ))}
      </div>

      {/* Plan: Básico (franja de Lemora) o Premium (franja propia) */}
      <span className="ca-chip-b" style={{ ...abs(48, 40, { height: u(46), width: u(150) }), borderRadius: u(23), background: "#17122F", color: "#fff", fontSize: u(20), fontWeight: 700, ...centro, opacity: 1 }}>
        Plan Básico
      </span>
      <span className="ca-chip-p" style={{ ...abs(48, 40, { height: u(46), width: u(150) }), borderRadius: u(23), background: "#6C4FD4", color: "#fff", fontSize: u(20), fontWeight: 700, ...centro, opacity: 0 }}>
        Plan Premium
      </span>

      <AvisoOscuro className="ca-aviso" x={40} y={620} h={66} texto="Con Premium la personalizás" />
    </div>
  )
}
