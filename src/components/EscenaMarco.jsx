import { cloneElement, useEffect, useRef, useState } from "react"

// Marco cuadrado de una escena animada (las imágenes de "Qué incluye"). La escena se mueve solo mientras está a la vista:
// recibe `activa` y la pone en su clase (*-activa), que dispara su bucle en CSS. Con "reducir movimiento" queda quieta.
export default function EscenaMarco({ escena, titulo }) {
  const ref = useRef(null)
  const [activa, setActiva] = useState(false)

  useEffect(() => {
    const el = ref.current
    if (!el || !("IntersectionObserver" in window)) return
    const io = new IntersectionObserver(([e]) => setActiva(e.isIntersecting), { threshold: 0.35 })
    io.observe(el)
    return () => io.disconnect()
  }, [])

  return (
    <div
      ref={ref}
      role="img"
      aria-label={titulo}
      className="@container relative mx-auto aspect-square w-full max-w-lg overflow-hidden rounded-[2rem] bg-lavender shadow-xl shadow-primary/15 ring-1 ring-primary/20"
    >
      {cloneElement(escena, { activa })}
    </div>
  )
}
