import imagen from "../../assets/escenas/premium-6.webp"
import CarruselAnimado from "./CarruselAnimado"

// Bloque "Que te vean": la misma imagen que Premium ("Más espacio para tus promociones"): el panel del carrusel, el slider de la
// tienda que pasa de una lámina a otra y el banner de abajo. El slider se mueve solo mientras está a la vista (`activa`).
export default function EscenaSlider({ activa = false }) {
  return (
    <div className="absolute inset-0">
      <img src={imagen} alt="" className="absolute inset-0 h-full w-full object-contain" />
      <CarruselAnimado activa={activa} />
    </div>
  )
}
