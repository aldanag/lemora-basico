import { useRef } from "react"
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome"
import { faImage } from "@fortawesome/free-solid-svg-icons"
import { useReveal } from "../lib/motion"
import Button from "../components/Button"
import LinkTexto from "../components/LinkTexto"
import { PREMIUM_LANDING_LINK } from "../lib/planes"
import Tick from "../components/Tick"
import { WHATSAPP_TRIAL_LINK } from "../lib/planes"
import { ETIQUETA } from "../lib/pastillas"
import EscenaMarco from "../components/EscenaMarco"
import EscenaConfigura from "../components/escenas/EscenaConfigura"
import EscenaCargar from "../components/escenas/EscenaCargar"
import EscenaTurnosPanel from "../components/escenas/EscenaTurnosPanel"
import EscenaSlider from "../components/escenas/EscenaSlider"
import EscenaPedido from "../components/escenas/EscenaPedido"
import EscenaFavoritos from "../components/escenas/EscenaFavoritos"
import EscenaContacto from "../components/escenas/EscenaContacto"
import EscenaPreguntas from "../components/escenas/EscenaPreguntas"
import EscenaAds from "../components/escenas/EscenaAds"
import EscenaMetodos from "../components/escenas/EscenaMetodos"
import EscenaEstadisticas from "../components/escenas/EscenaEstadisticas"

// Imágenes de cada bloque: guardá los archivos en src/assets/basico/ con el nombre
// bloque-1 a bloque-11 (.webp, .png o .jpg, capturas de cualquier proporción, de 1000 px de ancho
// o más). La página las toma solas y respeta la proporción de cada una; mientras no estén, se ve
// un recuadro de ejemplo.
const fotos = import.meta.glob("../assets/basico/bloque-*.{webp,png,jpg}", {
  eager: true,
  import: "default",
})
const fotoDe = (n) => Object.entries(fotos).find(([ruta]) => ruta.includes(`bloque-${n}.`))?.[1]

// Un bloque por funcionalidad. Las que van juntas se unifican en un solo bloque; `incluye` lista
// los nombres de las funciones del plan que cubre (los mismos que en la tarjeta de precios).
const bloques = [
  {
    n: 1,
    etiqueta: "Tu tienda",
    title: "Configurá tu tienda desde el panel.",
    body: "Subí tu logo, elegí tus colores y mirá al instante cómo queda tu tienda. Sin código y sin depender de nadie. Todo explicado paso a paso, simple.",
    incluye: [],
    sugerencia: "El panel con el logo cargándose, y cómo se ve la tienda",
    alt: "Panel de diseño de Lemora para cargar el logo y elegir el color de la marca, junto a cómo queda en la tienda",
  },
  {
    n: 2,
    etiqueta: "Tus productos y servicios",
    title: "Creá todos los productos y servicios que quieras.",
    body: "Cargás cada producto o servicio desde el panel, con sus fotos, su precio, stock y características, y aparece en tu tienda. Sin tope y sin ningún costo adicional.",
    incluye: ["Cargá productos o servicios ilimitados"],
    sugerencia: "El panel creando un producto o un servicio, y cómo se ve en la tienda",
    alt: "Listado de productos y servicios del panel de Lemora, junto a la ficha de un producto en la tienda",
  },
  {
    n: 3,
    etiqueta: "Tus turnos",
    title: "Tus clientes reservan turno en los horarios que vos elegís.",
    body: "Si tu tienda es de servicios, tus clientes reservan su turno desde la tienda. Gestioná todos tus turnos en tu calendario, desde el panel.",
    incluye: [
      "Reserva de turnos para servicios",
      "Horarios disponibles a tu elección",
      "Calendario de turnos en tu panel",
    ],
    sugerencia: "El calendario del panel con los turnos, y la reserva en la tienda",
    alt: "Calendario del panel de Lemora con los turnos reservados, junto a la pantalla donde un cliente reserva su turno",
  },
  {
    n: 4,
    etiqueta: "Que te vean",
    title: "Destacá tus ofertas y novedades apenas entran.",
    body: "Un carrusel y banners en tu tienda, para que lo que querés vender y promocionar sea lo primero que se vea.",
    incluye: ["Carrusel de hasta 6 slides", "8 banners promocionales"],
    sugerencia: "El carrusel con un banner de oferta arriba de los productos",
    alt: "Carrusel del panel de Lemora, junto a cómo se ven el carrusel y un banner promocional en la tienda",
  },
  {
    n: 10,
    etiqueta: "Tus cobros",
    title: "Cobrá por transferencia o en efectivo.",
    body: "Habilitás desde el panel los medios de pago que querés ofrecer: efectivo y transferencia o WhatsApp, sin comisiones por venta. Si querés cobrar con tarjeta y ofrecer cuotas, Mercado Pago llega con el plan Premium.",
    incluye: ["Pagos en efectivo y por transferencia"],
    link: { texto: "Ver Mercado Pago y cuotas en Premium", href: PREMIUM_LANDING_LINK },
    sugerencia: "El panel con los medios de pago y la tarjeta de Mercado Pago y cuotas de Premium",
    alt: "Panel de Lemora con los medios de pago de efectivo y transferencia, y la tarjeta de Mercado Pago y cuotas disponible en Premium",
  },
  {
    n: 5,
    etiqueta: "Que te compren",
    title: "Tus clientes arman el pedido y vos lo recibís en WhatsApp.",
    body: "Un carrito integrado suma las cantidades y calcula el total. El pedido te llega con todos los datos del cliente, sin intermediarios y sin comisiones por venta.",
    incluye: ["Carrito de compras", "Pedido directo a tu WhatsApp", "Gestión de pedidos"],
    sugerencia: "El carrito, o el pedido llegando por WhatsApp",
    alt: "Carrito de compras y el pedido nuevo en WhatsApp con los datos del cliente, los productos y el total",
  },
  {
    n: 6,
    etiqueta: "Que vuelvan",
    title: "Tus clientes guardan lo que les gusta.",
    body: "Con un toque, cada cliente marca sus productos favoritos para encontrarlos de nuevo cuando esté listo para comprar.",
    incluye: ["Agregar a favoritos"],
    sugerencia: "Los productos con el corazón de favoritos",
    alt: "Productos de una tienda con el botón de favoritos",
  },
  {
    n: 11,
    etiqueta: "Tus números",
    title: "Mirá cómo viene tu tienda.",
    body: "Un panel de estadísticas con lo que pasó en tu tienda, para decidir qué cargar y qué promocionar.",
    incluye: ["Ingresos de los últimos 30 días", "Pedidos por estado", "Productos más vendidos", "Ventas por categoría"],
    sugerencia: "El panel de estadísticas con ingresos, pedidos por estado y más vendidos",
    alt: "Panel de estadísticas de Lemora con los ingresos, los pedidos por estado, los productos más vendidos y las ventas por categoría",
  },
  {
    n: 8,
    etiqueta: "Menos preguntas",
    title: "Respondé las dudas una sola vez y mostrá que otros ya compraron.",
    body: "Preguntas frecuentes para que tus clientes encuentren todo sobre pedidos, pagos, envíos y devoluciones sin escribirte. Y reseñas de clientes en tu tienda, que funcionan como prueba social y les dan confianza para comprar.",
    incluye: ["Preguntas frecuentes", "Reseñas de clientes"],
    sugerencia: "Las preguntas frecuentes y las reseñas de clientes en una tienda",
    alt: "Preguntas frecuentes de una tienda con una respuesta desplegada, junto a las reseñas de clientes",
  },
  {
    n: 7,
    etiqueta: "Que te escriban",
    title: "Tus datos y tu WhatsApp, siempre a la vista.",
    body: "Una página de contacto con formulario y mapa de ubicación, además de un botón de WhatsApp presente en toda la tienda para contacto directo.",
    incluye: ["Página de contacto con formulario y mapa"],
    sugerencia: "La página de contacto con formulario, mapa, redes y botón de WhatsApp",
    alt: "Página de contacto de una tienda con formulario, mapa y botón de WhatsApp",
  },
  {
    n: 9,
    etiqueta: "Cuando crezcas",
    title: "Cuando tu tienda crezca, pasá a Premium.",
    body: "Sumá lo que necesitás para vender más: cobrá con Mercado Pago y en cuotas, vendé por mayor y por menor, conocé a tus clientes y poné tus propios mensajes en la barra de arriba, sin el aviso de Lemora.",
    incluye: [
      "Mercado Pago y venta en cuotas",
      "Venta mayorista o minorista",
      "Panel de clientes e inventario",
      "Marketing y ventana emergente al salir",
      "Barra promocional con tus mensajes, sin Lemora Ads",
    ],
    link: { texto: "Ver todo lo que incluye el plan Premium", href: PREMIUM_LANDING_LINK },
    sugerencia: "La barra promocional con el aviso de Lemora y con mensajes propios",
    alt: "Barra promocional de una tienda: el aviso de Lemora en el plan Básico y los mensajes propios con Premium",
  },
]

// Cada bloque tiene su escena animada (en vez de una captura fija). Si falta una, se usa la captura bloque-N.
const ESCENAS = {
  1: <EscenaConfigura />,
  2: <EscenaCargar />,
  3: <EscenaTurnosPanel />,
  4: <EscenaSlider />,
  5: <EscenaPedido />,
  6: <EscenaFavoritos />,
  7: <EscenaContacto />,
  8: <EscenaPreguntas />,
  9: <EscenaAds />,
  10: <EscenaMetodos />,
  11: <EscenaEstadisticas />,
}

function Bloque({ bloque, invertido }) {
  const foto = fotoDe(bloque.n)
  const escena = ESCENAS[bloque.n]
  return (
    <div className="grid items-center gap-8 md:grid-cols-2 md:gap-14">
      <div data-reveal className={invertido ? "md:order-2" : ""}>
        <span className={ETIQUETA}>
          {bloque.etiqueta}
        </span>
        <h3 className="mt-3 text-balance text-[clamp(22px,6.4vw,26px)] font-bold leading-[1.1] text-ink md:text-[30px]">
          {bloque.title}
        </h3>
        <p className="mt-3 text-base text-ink-soft">{bloque.body}</p>
        {bloque.incluye.length > 0 && (
          <ul className="mt-5 space-y-2">
            {bloque.incluye.map((t) => (
              <li key={t} className="flex items-center gap-2.5 text-[15px] font-semibold text-ink">
                <Tick />
                {t}
              </li>
            ))}
          </ul>
        )}
        {bloque.link && (
          <LinkTexto suelto href={bloque.link.href} external className="mt-2">
            {bloque.link.texto}
          </LinkTexto>
        )}
      </div>
      <div data-reveal className={invertido ? "md:order-1" : ""}>
        {escena ? (
          <EscenaMarco escena={escena} titulo={bloque.alt} />
        ) : (
        <div className="group mx-auto w-full max-w-lg overflow-hidden rounded-[2rem] bg-white shadow-xl shadow-ink/10 ring-1 ring-ink/10">
          {foto ? (
            <img
              src={foto}
              alt={bloque.alt}
              loading="lazy"
              decoding="async"
              className="block h-auto w-full transition-transform duration-700 ease-out group-hover:scale-[1.02] motion-reduce:transition-none motion-reduce:group-hover:scale-100"
            />
          ) : (
            <div
              role="img"
              aria-label={`Lugar para la captura ${bloque.n}: ${bloque.sugerencia}`}
              className="flex aspect-[4/3] w-full flex-col items-center justify-center gap-3 bg-primary-tint p-8 text-center text-primary"
            >
              <FontAwesomeIcon icon={faImage} className="h-12 w-12" aria-hidden="true" />
              <p className="text-sm font-bold uppercase tracking-[0.09em]">Captura {bloque.n}</p>
              <p className="max-w-[16rem] text-[15px] leading-snug text-ink-soft">
                {bloque.sugerencia}
              </p>
              <p className="text-xs font-semibold text-ink-muted">
                Cualquier proporción · 1000 px de ancho o más
              </p>
            </div>
          )}
        </div>
        )}
      </div>
    </div>
  )
}

// Llamado a la acción entre bloques. `tono` cambia el fondo para no repetir el mismo panel.
function Cta({ titulo, texto, tono = "lilac" }) {
  const fondo = tono === "lilac" ? "bg-lilac" : "bg-mist"
  return (
    <div
      data-reveal
      className={`flex flex-col items-center gap-5 rounded-[2rem] px-6 py-8 text-center md:flex-row md:justify-between md:px-10 md:text-left ${fondo}`}
    >
      <div>
        <p className="text-[clamp(20px,5.6vw,24px)] font-bold leading-tight text-ink">{titulo}</p>
        <p className="mt-1 text-base text-ink">{texto}</p>
      </div>
      <Button
        href={WHATSAPP_TRIAL_LINK}
        external
        size="lg"
        className="w-full max-w-xs flex-none sm:w-56"
      >
        Probar gratis 1 mes
      </Button>
    </div>
  )
}

export default function BasicoIncluye() {
  const root = useRef(null)
  useReveal(root)

  return (
    <section id="incluye" ref={root} className="bg-white py-16">
      <div className="mx-auto max-w-6xl px-4 md:px-6">
        <div className="text-center">
          <span
            data-reveal
            className={ETIQUETA}
          >
            Qué incluye
          </span>
          <h2
            data-words
            className="mx-auto mt-4 max-w-2xl text-balance text-[clamp(25px,8.2vw,32px)] font-bold text-ink md:text-[34px]"
          >
            Todo lo que necesitás para empezar a vender.
          </h2>
          <p data-reveal className="mx-auto mt-3 max-w-xl text-balance text-base text-ink-soft">
            Cada parte del plan, explicada. Sin costos extra por producto y sin comisiones por
            venta.
          </p>
        </div>

        <div className="mt-12 flex flex-col gap-14 md:gap-20">
          {bloques.map((b, i) => (
            <div key={b.n} className="contents">
              <Bloque bloque={b} invertido={i % 2 === 1} />
              {i === 3 && (
                <Cta
                  titulo="Probá todo esto gratis durante 1 mes."
                  texto="No te pedimos tarjeta y no tenés compromiso de adquirir nuestros planes."
                />
              )}
              {i === 9 && (
                <Cta
                  titulo="¿Te convence? Empezá hoy."
                  texto="Escribinos por WhatsApp y empezá tu mes de prueba."
                  tono="gris"
                />
              )}
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
