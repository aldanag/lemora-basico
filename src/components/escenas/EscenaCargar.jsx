import jean from "../../assets/escenas/carrito-jean.webp"
import { abs, AvisoOscuro, BotonTienda, Pegatina, raiz, Toque, u } from "./utiles"

// Escena "Productos y servicios ilimitados": la pantalla Productos del panel (botón "Nuevo producto", lista vacía → fila nueva) y,
// abajo, la ficha en la tienda. Lienzo de 768 px que escala con el ancho del marco (--u = 1 px del lienzo). Bucle de 10 s mientras
// está a la vista (`activa`): un toque en "Nuevo producto", aparece el producto en la lista y después en la tienda. En reposo
// (o con "reducir movimiento") queda ya cargado.
export default function EscenaCargar({ activa = false }) {
  return (
    <div aria-hidden="true" className={`absolute inset-0 overflow-hidden ${activa ? "cp-activa" : ""}`} style={raiz}>
      <svg viewBox="0 0 768 768" className="absolute inset-0 h-full w-full" fill="none">
        <path d="M-20 560C40 540 90 560 130 640C150 690 160 740 170 800" stroke="#CBC0F2" strokeWidth="26" strokeLinecap="round" opacity="0.7" />
        <path d="M600 -20C640 20 700 30 800 20" stroke="#CBC0F2" strokeWidth="26" strokeLinecap="round" opacity="0.7" />
      </svg>

      {/* Panel: Productos */}
      <div style={{ ...abs(60, 96, { width: u(648), height: u(318) }), background: "#fff", borderRadius: u(34), boxShadow: `0 ${u(18)} ${u(46)} rgba(94,70,190,0.2)` }} />
      <span style={{ ...abs(96, 122), fontSize: u(28), fontWeight: 700, color: "#17122F", lineHeight: 1.2 }}>Productos</span>
      <BotonTienda className="cp-boton" x={96} y={170} w={236} h={50} size={21} tono="panel">
        <svg viewBox="0 0 24 24" style={{ width: u(22), height: u(22) }} fill="none">
          <path d="M12 5v14M5 12h14" stroke="#fff" strokeWidth="2.6" strokeLinecap="round" />
        </svg>
        Nuevo producto
      </BotonTienda>
      <div style={{ ...abs(96, 244, { width: u(576), height: u(140) }), border: `${u(1.5)} solid #EEEBF5`, borderRadius: u(16), boxSizing: "border-box" }} />
      <div className="cp-vacio" style={{ ...abs(96, 244, { width: u(576), height: u(140) }), display: "flex", flexDirection: "column", alignItems: "center", justifyContent: "center", opacity: 0 }}>
        <span style={{ fontSize: u(22), fontWeight: 700, color: "#17122F", lineHeight: 1.3 }}>Sin productos</span>
        <span style={{ fontSize: u(16), color: "#8E89A3", lineHeight: 1.4, marginTop: u(4) }}>No hay productos que coincidan con la búsqueda.</span>
      </div>
      <div className="cp-fila" style={abs(96, 244, { width: u(576), height: u(140) })}>
        <img src={jean} alt="" style={{ ...abs(20, 24, { width: u(92), height: u(92) }), borderRadius: u(14), objectFit: "cover" }} />
        <span style={{ ...abs(136, 32), fontSize: u(26), fontWeight: 600, color: "#17122F", lineHeight: 1.3 }}>Jean Brooklyn</span>
        <span style={{ ...abs(136, 76), fontSize: u(22), fontWeight: 700, color: "#6C4FD4", lineHeight: 1.3 }}>$ 26.000</span>
      </div>

      {/* La ficha en la tienda */}
      <div className="cp-ficha" style={abs(60, 446, { width: u(648), height: u(224) })}>
        <div style={{ ...abs(0, 0, { width: u(648), height: u(224) }), background: "#fff", borderRadius: u(34), boxShadow: `0 ${u(18)} ${u(46)} rgba(94,70,190,0.2)` }} />
        <span style={{ ...abs(36, 26), fontSize: u(22), fontWeight: 700, color: "#6C4FD4", lineHeight: 1.2 }}>Velvet</span>
        <img src={jean} alt="" style={{ ...abs(36, 70, { width: u(120), height: u(120) }), borderRadius: u(18), objectFit: "cover" }} />
        <span style={{ ...abs(180, 84), fontSize: u(27), fontWeight: 600, color: "#17122F", lineHeight: 1.3 }}>Jean Brooklyn</span>
        <span style={{ ...abs(180, 128), fontSize: u(27), fontWeight: 600, color: "#6C4FD4", lineHeight: 1.3 }}>$ 26.000</span>
        <span style={{ ...abs(526, 134, { width: u(52), height: u(52) }), borderRadius: "50%", background: "#17122F", display: "flex", alignItems: "center", justifyContent: "center" }}>
          <svg viewBox="0 0 24 24" style={{ width: u(26), height: u(26) }} fill="none">
            <path d="M12 5v14M5 12h14" stroke="#fff" strokeWidth="2.8" strokeLinecap="round" />
          </svg>
        </span>
      </div>

      <Pegatina className="cp-sticker" xd={736} y={30} giro={6}>
        <span style={{ fontSize: u(36), fontWeight: 800, lineHeight: 1.1 }}>Productos</span>
        <span style={{ fontSize: u(14), fontWeight: 500, letterSpacing: "0.06em", opacity: 0.85, marginTop: u(4) }}>ILIMITADOS</span>
      </Pegatina>
      <AvisoOscuro className="cp-aviso" x={40} y={654} h={66} texto="Ya está en tu tienda" />

      <Toque clase="cp-ta" x={214} y={195} ini={2.3} dur={10} />
    </div>
  )
}
