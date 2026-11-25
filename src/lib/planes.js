// Datos compartidos de los planes (precios, funciones y links). Los usan la landing y /basico.

// Página con todos los planes (la landing de Lemora). TODO: cambiar a https://lemora.lat/#planes
// cuando lemora.lat sirva la landing.
export const LANDING_PLANES = "https://landing-lemora.vercel.app/#planes"

// Landing del plan Premium (el sitio de `web-premium`, que se publica aparte). TODO: cambiar por el dominio definitivo.
export const PREMIUM_LANDING_LINK = "https://lemora-premium.vercel.app"

export const WHATSAPP_TRIAL_LINK =
  "https://wa.me/543515957014?text=Hola,%20quiero%20probar%20Lemora%20gratis"

export const BASICO_CHECKOUT_LINK =
  "https://www.mercadopago.com.ar/subscriptions/checkout?preapproval_plan_id=d37372dd19924098bcfeb189bbb8fbcf"

// Los planes anuales todavía no tienen link de suscripción propio en MercadoPago:
// por ahora el botón abre un WhatsApp con el plan elegido.
// TODO: reemplazar por los links reales de suscripción anual.
export const anualLink = (plan) =>
  `https://wa.me/543515957014?text=${encodeURIComponent(`Hola, quiero contratar el plan ${plan} anual de Lemora`)}`

export const peso = (n) => `$${Math.round(n).toLocaleString("es-AR")}`

// TODO: reemplazar por la URL real de una tienda de ejemplo.
export const EJEMPLO_WEB_LINK = "#"

// Las funciones que se comparan entre planes van en el mismo orden en las dos listas
// (carrusel, banners y barra promocional); las exclusivas de Premium llevan isNew
// (resaltadas).
// actions[0] es el botón principal (lima); actions[1], si existe, el secundario.
export const plans = [
  {
    name: "Básico",
    badge: "1 mes gratis",
    mensual: 12490,
    anual: 124900,
    commitment: "Contratación mínima: 1 mes",
    features: [
      "Cargá productos o servicios ilimitados",
      "Gestión de pedidos",
      "Carrusel de hasta 6 slides",
      "8 banners promocionales",
      "Página de contacto con formulario y mapa",
      "Agregar a favoritos",
      "Preguntas frecuentes",
      "Reseñas de clientes",
      "Cupones y descuentos automáticos",
      "Incluye Lemora Ads en barra promocional",
    ],
    actions: [
      {
        label: "Probar gratis 1 mes",
        href: WHATSAPP_TRIAL_LINK,
        external: true,
        note: "No te pedimos la tarjeta",
      },
      {
        label: "Suscribirme",
        href: BASICO_CHECKOUT_LINK,
        external: true,
      },
    ],
  },
  {
    name: "Premium",
    crown: true,
    mensual: 18990,
    anual: 189900,
    commitment: "Contratación mínima: 3 meses",
    intro: "Todo lo del plan Básico y además:",
    features: [
      { text: "Gestión de inventario por categorías", isNew: true },
      { text: "Panel para gestión de clientes", isNew: true },
      { text: "Nuevo menú por categorías", isNew: true },
      { text: "Página dedicada para cada categoría", isNew: true },
      { text: "Mercado Pago y cuotas, además de efectivo y transferencia", isNew: true },
      { text: "Ventana emergente al salir", isNew: true },
      { text: "Barra promocional con tus propios mensajes, sin Lemora Ads", isNew: true },
    ],
    // TODO: reemplazar por el link real de suscripción de MercadoPago del plan Premium.
    actions: [{ label: "Suscribirme", href: "#registro", external: false }],
    featured: true,
  },
]
