import { FontAwesomeIcon } from "@fortawesome/react-fontawesome"
import { faBagShopping, faBoxOpen, faCalendarCheck, faHouse, faImages, faPaintBrush, faPercent, faStar, faTags } from "@fortawesome/free-solid-svg-icons"
import { abs, AvisoOscuro, BotonTienda, Pegatina, raiz, Toque, u } from "./utiles"

// Escena "Tus turnos": el calendario de turnos del panel (atrás) y la reserva del cliente en la tienda (adelante), sobre fondo lila.
// Es la imagen anterior de Básico redibujada con movimiento. Lienzo de 768 px que escala con el ancho del marco (--u = 1 px del
// lienzo). Bucle de 12 s mientras está a la vista (`activa`): un toque elige el día, otro la hora, otro confirma; aparece "Turno
// reservado" y el turno nuevo (Camila) entra al calendario del panel. En reposo (o con "reducir movimiento") queda ya reservado
// (Mié 14, 11:30). Los nombres de los turnos son de ejemplo.
const DIAS = [
  ["Lun", 12],
  ["Mar", 13],
  ["Mié", 14],
  ["Jue", 15],
  ["Vie", 16],
]
const HORAS = ["10:00", "10:45", "11:30", "12:15", "15:00", "15:45"]
const COLS = [262, 328, 394, 460, 526, 592] // centros de las columnas del calendario (Lun 12 a Sáb 17)
const FILAS = [474, 523, 572, 622, 671] // centros de las filas (10:00, 11:00, 12:00, 15:00, 16:00)
const DIAS_CAL = ["Lun 12", "Mar 13", "Mié 14", "Jue 15", "Vie 16", "Sáb 17"]
const HORAS_CAL = ["10:00", "11:00", "12:00", "15:00", "16:00"]
// [columna, fila, nombre, claro]
const TURNOS = [
  [0, 0, "Lucía", true],
  [2, 0, "Marcos"],
  [1, 1, "Sofi"],
  [4, 1, "Valen"],
  [2, 2, "Bruno"],
  [3, 2, "Cami"],
  [0, 3, "Tomás", true],
  [4, 4, "Mica"],
]
// Menú del panel colapsado: solo íconos (Font Awesome), el de Turnos activo.
const MENU = [faHouse, faBoxOpen, faTags, faBagShopping, faCalendarCheck, faPercent, faStar, faPaintBrush, faImages]
const ACTIVO = 4

const caja = { boxSizing: "border-box", border: `${u(1.2)} solid #E4DFF3`, background: "#fff" }
const centro = { display: "flex", alignItems: "center", justifyContent: "center" }

export default function EscenaTurnosPanel({ activa = false }) {
  return (
    <div aria-hidden="true" className={`absolute inset-0 overflow-hidden ${activa ? "tp-activa" : ""}`} style={raiz}>
      {/* Trazos decorativos de fondo */}
      <svg viewBox="0 0 768 768" className="absolute inset-0 h-full w-full" fill="none">
        <path d="M-20 300C40 220 110 230 130 300" stroke="#CBC0F2" strokeWidth="26" strokeLinecap="round" opacity="0.7" />
        <path d="M200 -20C240 40 300 60 330 100" stroke="#CBC0F2" strokeWidth="26" strokeLinecap="round" opacity="0.7" />
      </svg>

      {/* Panel de administración (cortado por el borde de abajo) */}
      <div style={{ ...abs(61, 328, { width: u(581), height: u(460) }), background: "#fff", borderTopLeftRadius: u(14), borderTopRightRadius: u(14), boxShadow: `0 ${u(14)} ${u(36)} rgba(94,70,190,0.2)` }} />
      <div style={{ ...abs(61, 328, { width: u(58), height: u(460) }), borderRight: `${u(1)} solid #EEEBF5`, borderTopLeftRadius: u(14), boxSizing: "border-box" }} />
      <span style={{ ...abs(75, 339, { width: u(30), height: u(30) }), background: "#6C4FD4", borderRadius: u(8), ...centro, color: "#fff", fontSize: u(18), fontWeight: 800 }}>L</span>
      <div style={{ ...abs(61, 378, { width: u(58), height: u(1) }), background: "#EEEBF5" }} />
      {MENU.map((icono, i) => (
        <span key={i}>
          {i === ACTIVO && <span style={{ ...abs(71, 400 + i * 42 - 4, { width: u(38), height: u(38) }), background: "#E2D9FF", borderRadius: u(10) }} />}
          <span style={{ ...abs(71, 400 + i * 42 - 4, { width: u(38), height: u(38) }), ...centro, color: i === ACTIVO ? "#6C4FD4" : "#6B6679" }}>
            <FontAwesomeIcon icon={icono} style={{ width: u(17), height: u(17) }} aria-hidden="true" />
          </span>
        </span>
      ))}

      {/* Calendario de turnos */}
      <div style={{ ...abs(119, 328, { width: u(523), height: u(42) }), borderBottom: `${u(1)} solid #EEEBF5`, boxSizing: "border-box" }} />
      <span style={{ ...abs(140, 340), fontSize: u(15), fontWeight: 700, color: "#17122F", lineHeight: 1.2 }}>Turnos</span>
      <span style={{ ...abs(140, 387, { width: u(59), height: u(24) }), background: "#6C4FD4", borderRadius: u(12), ...centro, color: "#fff", fontSize: u(11), fontWeight: 600 }}>Semana</span>
      <span style={{ ...abs(205, 387, { width: u(41), height: u(24) }), ...caja, borderRadius: u(12), ...centro, color: "#17122F", fontSize: u(11), fontWeight: 600 }}>Mes</span>
      <div style={{ ...abs(140, 424, { width: u(486), height: u(360) }), border: `${u(1)} solid #EEEBF5`, borderRadius: u(10), boxSizing: "border-box" }} />
      {DIAS_CAL.map((d, i) => (
        <span key={d} style={{ ...abs(COLS[i] - 30, 438, { width: u(60) }), textAlign: "center", fontSize: u(11), fontWeight: 600, color: "#6B6679", lineHeight: 1.2 }}>{d}</span>
      ))}
      {HORAS_CAL.map((h, j) => (
        <span key={h} style={{ ...abs(150, FILAS[j] - 7), fontSize: u(11), fontWeight: 500, color: "#6B6679", lineHeight: 1.2 }}>{h}</span>
      ))}
      {FILAS.map((y, j) =>
        COLS.map((x, i) => <span key={`${i}-${j}`} style={{ ...abs(x - 28, y - 22, { width: u(56), height: u(44) }), background: "#F3F0FF", borderRadius: u(6) }} />),
      )}
      {TURNOS.map(([i, j, nombre, claro]) => (
        <span key={nombre} style={{ ...abs(COLS[i] - 25, FILAS[j] - 18, { width: u(50), height: u(37) }), background: claro ? "#B9ABF0" : "#6C4FD4", color: claro ? "#17122F" : "#fff", borderRadius: u(6), ...centro, fontSize: u(11), fontWeight: 700 }}>{nombre}</span>
      ))}
      {/* El turno nuevo entra al calendario cuando se confirma (Mié 14, 11:00) */}
      <span className="tp-nuevo" style={{ ...abs(COLS[2] - 25, FILAS[1] - 18, { width: u(50), height: u(37) }), background: "#6C4FD4", boxShadow: "0 0 0 2.5px #FF9A52", color: "#fff", borderRadius: u(6), ...centro, fontSize: u(11), fontWeight: 700 }}>Camila</span>

      {/* Reserva del cliente en la tienda */}
      <div style={{ ...abs(339, 145, { width: u(384), height: u(271) }), background: "#fff", borderRadius: u(24), boxShadow: `0 ${u(16)} ${u(40)} rgba(94,70,190,0.22)` }} />
      <span style={{ ...abs(365, 166), fontSize: u(23), fontWeight: 700, color: "#17122F", lineHeight: 1.2, whiteSpace: "nowrap" }}>Reservá tu turno</span>
      {DIAS.map(([dia, n], i) => {
        const x = 365 + i * 67.5
        const contenido = (c1, c2) => (
          <>
            <span style={{ fontSize: u(11), fontWeight: 500, color: c1, lineHeight: 1.1 }}>{dia}</span>
            <span style={{ fontSize: u(19), fontWeight: 600, color: c2, lineHeight: 1.1, marginTop: u(2) }}>{n}</span>
          </>
        )
        const col = { ...centro, flexDirection: "column" }
        return (
          <div key={dia}>
            <div style={{ ...abs(x, 207, { width: u(60), height: u(49) }), ...caja, borderRadius: u(10), ...col }}>{contenido("#7A7590", "#17122F")}</div>
            {(i === 0 || i === 2) && (
              <div className={i === 0 ? "tp-d0" : "tp-d2"} style={{ ...abs(x, 207, { width: u(60), height: u(49) }), background: "#6C4FD4", borderRadius: u(10), ...col, opacity: i === 2 ? 1 : 0 }}>
                {contenido("#E6E0FF", "#fff")}
              </div>
            )}
          </div>
        )
      })}
      {HORAS.map((h, i) => {
        const x = 365 + (i % 3) * 113
        const y = 267 + Math.floor(i / 3) * 41
        return (
          <div key={h}>
            <div style={{ ...abs(x, y, { width: u(105), height: u(33) }), ...caja, borderRadius: u(8), ...centro, color: "#17122F", fontSize: u(15), fontWeight: 500 }}>{h}</div>
            {i === 2 && (
              <div className="tp-h" style={{ ...abs(x, y, { width: u(105), height: u(33) }), background: "#6C4FD4", borderRadius: u(8), ...centro, color: "#fff", fontSize: u(15), fontWeight: 500 }}>{h}</div>
            )}
          </div>
        )
      })}
      <BotonTienda className="tp-boton" x={365} y={351} w={332} h={44} size={17} tono="panel" style={{ borderRadius: u(22) }}>
        Confirmar turno
      </BotonTienda>

      <AvisoOscuro className="tp-aviso" x={96} y={222} h={64} texto="Turno reservado" />
      <Pegatina className="tp-sticker" xd={740} y={546} giro={6}>
        <span style={{ fontSize: u(36), fontWeight: 800, lineHeight: 1.1 }}>Tus horarios</span>
        <span style={{ fontSize: u(14), fontWeight: 500, letterSpacing: "0.06em", opacity: 0.85, marginTop: u(4) }}>VOS ELEGÍS CUÁNDO</span>
      </Pegatina>

      <Toque clase="tp-ta" x={530} y={232} ini={1.58} dur={12} />
      <Toque clase="tp-tb" x={643} y={284} ini={3.26} dur={12} />
      <Toque clase="tp-tc" x={531} y={373} ini={5.3} dur={12} />
    </div>
  )
}
