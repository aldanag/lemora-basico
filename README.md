# Lemora · plan Básico

Sitio del plan Básico de Lemora: tu tienda online completa desde $12.490 al mes, con los pedidos directo en WhatsApp. Es un sitio de una sola página que vive en la raíz (`/`); sale de la misma base que la landing, pero se mantiene por separado.

Hecho con React 19, Vite, Tailwind CSS v4 y GSAP.

## Secciones

Hero · Ejemplos · Para quién · Así se ve (panel y tienda) · Qué incluye · Precio · Cómo empezar · ¿Básico o Premium? · Prueba gratis · Preguntas frecuentes · Footer

## Imágenes

- `src/assets/basico/panel-1` a `panel-12`: capturas del panel (menú clickeable de "Así se ve").
- `src/assets/basico/tienda-1` a `tienda-3`: capturas de la tienda terminada (pestaña "Tu tienda"; todavía faltan).
- `src/assets/basico/bloque-1` a `bloque-9`: imágenes de cada bloque de "Qué incluye".
- `src/assets/basico/ejemplo-1` a `ejemplo-3`: tiendas de ejemplo.

## Cómo correrla

```bash
npm install
npm run dev      # servidor local en http://localhost:5173
npm run build    # genera dist/
npm run lint     # oxlint
```

## Diseño

Colores, tipografías y reglas de uso: ver [DESIGN.md](DESIGN.md). Los tokens viven en `src/index.css` (`@theme`).

- **Motion:** GSAP con `useGSAP` y ScrollTrigger (`src/lib/motion.js`). Con "reducir movimiento" quedan solo fundidos.
- **Íconos:** Font Awesome (solo los que se usan) más SVG propios.
