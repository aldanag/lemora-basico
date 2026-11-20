import { abs, AvisoOscuro, BotonTienda, Pegatina, raiz, Toque, u, WhatsAppGlifo } from "./utiles"

// Escena "Que te escriban": la página de contacto de una tienda (formulario, mapa de ubicación) y el botón de WhatsApp presente en toda
// la tienda. Dibujo genérico: no hay captura de la página de contacto real. Lienzo de 768 px que escala con el ancho del marco
// (--u = 1 px del lienzo). Bucle de 12 s mientras está a la vista (`activa`): se completa el formulario, un toque en "Enviar" y
// aparece "Mensaje recibido"; el botón de WhatsApp late. En reposo (o con "reducir movimiento") queda ya enviado.
const campo = { border: `${u(1.5)} solid #E4DFF3`, borderRadius: u(12), background: "#FAFAFC", boxSizing: "border-box" }

export default function EscenaContacto({ activa = false }) {
  return (
    <div aria-hidden="true" className={`absolute inset-0 overflow-hidden ${activa ? "cc-activa" : ""}`} style={raiz}>
      <svg viewBox="0 0 768 768" className="absolute inset-0 h-full w-full" fill="none">
        <path d="M-20 200C30 180 80 190 100 240C115 280 105 320 80 360" stroke="#CBC0F2" strokeWidth="26" strokeLinecap="round" opacity="0.7" />
        <path d="M640 800C650 740 700 700 800 690" stroke="#CBC0F2" strokeWidth="26" strokeLinecap="round" opacity="0.7" />
      </svg>

      {/* Página de contacto */}
      <div style={{ ...abs(60, 96, { width: u(648), height: u(500) }), background: "#fff", borderRadius: u(34), boxShadow: `0 ${u(18)} ${u(46)} rgba(94,70,190,0.2)` }} />
      <span style={{ ...abs(96, 124), fontSize: u(30), fontWeight: 700, color: "#17122F", lineHeight: 1.2 }}>Contacto</span>

      {/* Formulario */}
      <span style={{ ...abs(96, 188), fontSize: u(18), fontWeight: 600, color: "#4A4560", lineHeight: 1.2 }}>Nombre</span>
      <div style={{ ...abs(96, 218, { width: u(290), height: u(52) }), ...campo }} />
      <span className="cc-nombre" style={{ ...abs(112, 230), fontSize: u(21), color: "#17122F", lineHeight: 1.3, whiteSpace: "nowrap" }}>Julieta R.</span>
      <span style={{ ...abs(96, 292), fontSize: u(18), fontWeight: 600, color: "#4A4560", lineHeight: 1.2 }}>Mensaje</span>
      <div style={{ ...abs(96, 322, { width: u(290), height: u(120) }), ...campo }} />
      <span className="cc-mensaje" style={{ ...abs(112, 336, { width: u(260) }), fontSize: u(21), color: "#17122F", lineHeight: 1.35 }}>Hola, ¿hacen envíos a Córdoba?</span>
      <BotonTienda className="cc-boton" x={96} y={470} w={290} h={52} size={22}>
        Enviar
      </BotonTienda>

      {/* Mapa de ubicación */}
      <div style={{ ...abs(414, 188, { width: u(258), height: u(254) }), borderRadius: u(18), background: "#E8E4F8", overflow: "hidden" }}>
        <svg viewBox="0 0 258 254" style={{ position: "absolute", inset: 0, width: "100%", height: "100%" }} fill="none" aria-hidden="true">
          <path d="M-10 70H270M-10 150H270M70 -10V260M170 -10V260" stroke="#fff" strokeWidth="14" />
          <path d="M-10 210 120 100 270 20" stroke="#F6F3FF" strokeWidth="9" />
        </svg>
        <svg viewBox="0 0 24 24" style={{ ...abs(104, 74, { width: u(54), height: u(54) }) }} aria-hidden="true">
          <path d="M12 2a7 7 0 0 0-7 7c0 5 7 13 7 13s7-8 7-13a7 7 0 0 0-7-7Z" fill="#6C4FD4" />
          <circle cx="12" cy="9" r="2.8" fill="#fff" />
        </svg>
      </div>
      <span style={{ ...abs(414, 458), fontSize: u(18), fontWeight: 600, color: "#17122F", lineHeight: 1.3 }}>Av. Colón 123</span>
      <span style={{ ...abs(414, 486), fontSize: u(17), color: "#8E89A3", lineHeight: 1.3 }}>Córdoba · Lun a Vie 9 a 18 h</span>

      {/* Botón de WhatsApp de la tienda */}
      <span className="cc-wa" style={{ ...abs(592, 540, { width: u(108), height: u(108) }), borderRadius: "50%", background: "linear-gradient(160deg, #4CCB5B, #2C9A3D)", boxShadow: `0 ${u(10)} ${u(26)} rgba(44,154,61,0.45)`, display: "flex", alignItems: "center", justifyContent: "center" }}>
        <WhatsAppGlifo size={62} />
      </span>

      <Pegatina className="cc-sticker" xd={738} y={34} giro={6}>
        <span style={{ fontSize: u(36), fontWeight: 800, lineHeight: 1.1 }}>Contacto</span>
        <span style={{ fontSize: u(14), fontWeight: 500, letterSpacing: "0.06em", opacity: 0.85, marginTop: u(4) }}>TE ESCRIBEN DIRECTO</span>
      </Pegatina>
      <AvisoOscuro className="cc-aviso" x={40} y={640} h={66} texto="Mensaje recibido" />

      <Toque clase="cc-ta" x={241} y={496} ini={7.3} dur={12} />
    </div>
  )
}
