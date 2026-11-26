import { abs, AvisoOscuro, BotonTienda, Pegatina, raiz, Toque, u } from "./utiles"

// Escena "Métodos de pago" del plan Básico: el panel con "Medios de pago" (efectivo y transferencia / WhatsApp, incluidos en todos los
// planes) y, debajo, la tarjeta de Mercado Pago y cuotas, que es de Premium. Lienzo de 768 px que escala con el ancho del marco (--u = 1
// px del lienzo). Bucle de 10 s mientras está a la vista (`activa`): un toque tilda "Habilitar efectivo", otro "Habilitar transferencia /
// WhatsApp" (con el primero se habilita "Guardar métodos"), un toque en "Guardar métodos" y aparece el aviso. En reposo (o con "reducir
// movimiento") queda todo tildado y guardado. Los tiempos están en index.css (pm-). La tarjeta de Premium no se anima: es el incentivo.
const VIO = "#6C4FD4"
const OSC = "#17122F"

const Tilde = ({ size, color = "#fff" }) => (
  <svg viewBox="0 0 24 24" style={{ width: u(size), height: u(size) }} fill="none" aria-hidden="true">
    <path d="M5 12.5l4.5 4.5L19 7.5" stroke={color} strokeWidth="3.6" strokeLinecap="round" strokeLinejoin="round" />
  </svg>
)

const centro = { display: "flex", alignItems: "center", justifyContent: "center" }

function Casilla({ x, y, texto, claseOn, claseOff }) {
  return (
    <>
      <span
        className={claseOff}
        style={{ ...abs(x, y, { width: u(34), height: u(34) }), borderRadius: u(10), background: "#fff", boxShadow: `inset 0 0 0 ${u(2.6)} #CFC9E0`, opacity: 0 }}
      />
      <span className={claseOn} style={{ ...abs(x, y, { width: u(34), height: u(34) }), borderRadius: u(10), background: VIO, ...centro }}>
        <Tilde size={22} />
      </span>
      <span style={{ ...abs(x + 54, y), fontSize: u(25), fontWeight: 600, color: OSC, lineHeight: u(34), whiteSpace: "nowrap" }}>{texto}</span>
    </>
  )
}

export default function EscenaMetodos({ activa = false }) {
  return (
    <div aria-hidden="true" className={`absolute inset-0 overflow-hidden ${activa ? "pm-activa" : ""}`} style={raiz}>
      {/* Trazos decorativos de fondo */}
      <svg viewBox="0 0 768 768" className="absolute inset-0 h-full w-full" fill="none">
        <path d="M-20 90C50 60 100 110 96 190" stroke="#CBC0F2" strokeWidth="26" strokeLinecap="round" opacity="0.7" />
        <path d="M600 800C640 740 700 725 800 745" stroke="#CBC0F2" strokeWidth="26" strokeLinecap="round" opacity="0.7" />
      </svg>

      {/* Medios de pago (los del plan Básico) */}
      <div style={{ ...abs(61, 158, { width: u(646), height: u(278) }), background: "#fff", borderRadius: u(30), boxShadow: `0 ${u(16)} ${u(40)} rgba(94,70,190,0.2)` }} />
      <span style={{ ...abs(96, 188), fontSize: u(30), fontWeight: 800, color: OSC, lineHeight: 1.2 }}>Medios de pago</span>
      <Casilla x={96} y={246} texto="Habilitar efectivo" claseOn="pm-k1" claseOff="pm-k1e" />
      <Casilla x={96} y={302} texto="Habilitar transferencia / WhatsApp" claseOn="pm-k2" claseOff="pm-k2e" />
      {/* Guardar métodos: apagado hasta tildar el primer medio */}
      <BotonTienda tono="panel" className="pm-g0" x={96} y={364} w={576} h={52} size={21} style={{ background: "#CBC0F2", fontWeight: 700, borderRadius: u(13), opacity: 0 }}>
        Guardar métodos
      </BotonTienda>
      <BotonTienda tono="panel" className="pm-g1" x={96} y={364} w={576} h={52} size={21} style={{ fontWeight: 700, borderRadius: u(13) }}>
        Guardar métodos
      </BotonTienda>

      {/* Mercado Pago y cuotas: solo en Premium */}
      <div style={{ ...abs(61, 466, { width: u(646), height: u(150) }), background: "#fff", borderRadius: u(30), boxShadow: `0 ${u(16)} ${u(40)} rgba(94,70,190,0.2)` }} />
      <div style={{ ...abs(96, 494), display: "flex", alignItems: "center", gap: u(14), whiteSpace: "nowrap" }}>
        <span style={{ fontSize: u(28), fontWeight: 800, color: OSC, lineHeight: 1.2 }}>Mercado Pago y cuotas</span>
        <span style={{ display: "inline-flex", alignItems: "center", gap: u(7), padding: `${u(7)} ${u(16)}`, borderRadius: 999, background: OSC, color: "#fff", fontSize: u(18), fontWeight: 800, lineHeight: 1 }}>
          <svg viewBox="0 0 24 24" style={{ width: u(18), height: u(18) }} fill="currentColor" aria-hidden="true">
            <path d="M3 8l4.5 3.5L12 5l4.5 6.5L21 8l-2 10H5z" />
          </svg>
          Premium
        </span>
      </div>
      <span style={{ ...abs(96, 548, { width: u(576) }), fontSize: u(22), fontWeight: 600, color: OSC, lineHeight: 1.4 }}>
        Cobrá con tarjeta y ofrecé cuotas con Premium.
      </span>

      {/* Sticker */}
      <Pegatina xd={730} y={40} giro={6}>
        <span style={{ fontSize: u(34), fontWeight: 800, lineHeight: 1.1 }}>Cobrá como</span>
        <span style={{ fontSize: u(34), fontWeight: 800, lineHeight: 1.1 }}>quieras</span>
      </Pegatina>

      <AvisoOscuro className="pm-aviso" x={40} y={684} h={60} texto="Métodos de pago guardados" />

      {/* Toques (tap): efectivo, transferencia y guardar */}
      <Toque clase="pm-ta" x={113} y={263} ini={1.25} dur={10} />
      <Toque clase="pm-tb" x={113} y={319} ini={2.35} dur={10} />
      <Toque clase="pm-tc" x={384} y={390} ini={3.55} dur={10} />
    </div>
  )
}
