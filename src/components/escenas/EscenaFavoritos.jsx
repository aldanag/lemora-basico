import respaldo1 from "../../assets/escenas/respaldo-fav-1.webp"
import respaldo2 from "../../assets/escenas/respaldo-fav-2.webp"
import respaldo3 from "../../assets/escenas/respaldo-fav-3.webp"
import respaldo4 from "../../assets/escenas/respaldo-fav-4.webp"
import { abs, AvisoOscuro, Pegatina, raiz, Toque, u } from "./utiles"

// Escena "Favoritos": los productos de una tienda con el corazón de favoritos. Lienzo de 768 px que escala con el ancho del marco
// (--u = 1 px del lienzo). Bucle de 10 s mientras está a la vista (`activa`): un toque en el corazón del jean lo llena y aparece
// "Guardado en favoritos"; otro toque en el del hoodie hace lo mismo. En reposo (o con "reducir movimiento") quedan llenos los dos.
//
// Fotos: si existen src/assets/escenas/fav-jean.*, fav-remera.*, fav-short.* y fav-hoodie.* (jpg, png o webp) se usan; si no, los
// recortes de respaldo de la imagen anterior.
const subidas = import.meta.glob("../../assets/escenas/{fav-jean,fav-remera,fav-short,fav-hoodie}.{jpg,jpeg,png,webp}", {
  eager: true,
  import: "default",
})
const foto = (nombre, respaldo) => Object.entries(subidas).find(([ruta]) => ruta.includes(`/${nombre}.`))?.[1] ?? respaldo

const PRODUCTOS = [
  { nombre: "Jean Brooklyn", precio: "$ 26.000", src: foto("fav-jean", respaldo1), x: 96, y: 196, lleno: "fv-h1" },
  { nombre: "Remera Maia", precio: "$ 24.500", src: foto("fav-remera", respaldo2), x: 396, y: 196 },
  { nombre: "Short Ema", precio: "$ 21.000", src: foto("fav-short", respaldo3), x: 96, y: 444 },
  { nombre: "Hoodie Black", precio: "$ 36.200", src: foto("fav-hoodie", respaldo4), x: 396, y: 444, lleno: "fv-h4" },
]

const Corazon = ({ lleno }) => (
  <svg viewBox="0 0 24 24" style={{ width: u(24), height: u(24) }} fill={lleno ? "#6C4FD4" : "none"} aria-hidden="true">
    <path
      d="M12 20.5s-7.5-4.6-9.2-9.4C1.8 7.9 3.4 5 6.4 5c1.9 0 3.4 1.1 4.2 2.5.2.3.6.3.8 0C12.2 6.1 13.7 5 15.6 5c3 0 4.6 2.9 3.6 6.1-1.7 4.8-9.2 9.4-9.2 9.4Z"
      stroke="#6C4FD4"
      strokeWidth="2.2"
      strokeLinejoin="round"
    />
  </svg>
)

export default function EscenaFavoritos({ activa = false }) {
  return (
    <div aria-hidden="true" className={`absolute inset-0 overflow-hidden ${activa ? "fv-activa" : ""}`} style={raiz}>
      <svg viewBox="0 0 768 768" className="absolute inset-0 h-full w-full" fill="none">
        <path d="M-20 300C30 240 100 250 120 320C135 370 120 410 90 450" stroke="#CBC0F2" strokeWidth="26" strokeLinecap="round" opacity="0.7" />
        <path d="M560 -20C600 30 680 30 800 10" stroke="#CBC0F2" strokeWidth="26" strokeLinecap="round" opacity="0.7" />
      </svg>

      {/* Tarjeta Favoritos */}
      <div style={{ ...abs(60, 100, { width: u(648), height: u(612) }), background: "#fff", borderRadius: u(34), boxShadow: `0 ${u(18)} ${u(46)} rgba(94,70,190,0.2)` }} />
      <span style={{ ...abs(96, 134), fontSize: u(34), fontWeight: 700, color: "#17122F", lineHeight: 1.2 }}>Favoritos</span>

      {PRODUCTOS.map((p) => (
        <div key={p.nombre}>
          <div style={{ ...abs(p.x, p.y, { width: u(276), height: u(232) }), border: `${u(1.5)} solid #EEEBF5`, borderRadius: u(22), boxSizing: "border-box", background: "#fff" }} />
          <img src={p.src} alt="" style={{ ...abs(p.x + 14, p.y + 14, { width: u(248), height: u(138) }), borderRadius: u(14), objectFit: "cover" }} />
          <span style={{ ...abs(p.x + 14 + 248 - 52, p.y + 22, { width: u(44), height: u(44) }), borderRadius: "50%", background: "#fff", boxShadow: `0 ${u(4)} ${u(12)} rgba(23,18,47,0.16)`, display: "flex", alignItems: "center", justifyContent: "center" }}>
            <Corazon />
          </span>
          {p.lleno && (
            <span className={p.lleno} style={{ ...abs(p.x + 14 + 248 - 52, p.y + 22, { width: u(44), height: u(44) }), borderRadius: "50%", background: "#fff", display: "flex", alignItems: "center", justifyContent: "center" }}>
              <Corazon lleno />
            </span>
          )}
          <span style={{ ...abs(p.x + 18, p.y + 160), fontSize: u(22), fontWeight: 500, color: "#17122F", lineHeight: 1.3, whiteSpace: "nowrap" }}>{p.nombre}</span>
          <span style={{ ...abs(p.x + 18, p.y + 192), fontSize: u(22), fontWeight: 700, color: "#6C4FD4", lineHeight: 1.3 }}>{p.precio}</span>
        </div>
      ))}

      <Pegatina className="fv-sticker" xd={738} y={36} giro={6}>
        <span style={{ fontSize: u(36), fontWeight: 800, lineHeight: 1.1 }}>Favoritos</span>
        <span style={{ fontSize: u(14), fontWeight: 500, letterSpacing: "0.06em", opacity: 0.85, marginTop: u(4) }}>CON UN TOQUE</span>
      </Pegatina>
      <AvisoOscuro className="fv-aviso" x={40} y={654} h={66} texto="Guardado en favoritos" />

      <Toque clase="fv-ta" x={328} y={240} ini={2.2} dur={10} />
      <Toque clase="fv-tb" x={628} y={488} ini={5.7} dur={10} />
    </div>
  )
}
