// Punto único de acceso a los datos. Hoy lee JSON; en el Nivel 2
// solo cambia este archivo para leer de Supabase y el resto queda igual.
import carrosData from '~/data/carros.json'
import reservasData from '~/data/reservas.json'
import negocioData from '~/data/negocio.json'

export interface Carro {
  id: number
  slug: string
  marca: string
  modelo: string
  anio: number
  categoria: string
  precioDia: number
  pasajeros: number
  maletas: number
  transmision: string
  traccion: string
  aire: boolean
  imagen: string
  descripcion: string
}

export interface Reserva {
  id: number
  carroId: number
  desde: string
  hasta: string
  estado: 'pendiente' | 'confirmada' | 'cancelada' | string
}

export function useCatalogo() {
  const carros = carrosData as Carro[]
  const reservas = reservasData as Reserva[]
  const negocio = negocioData

  const carroPorSlug = (slug: string) => carros.find((c) => c.slug === slug)

  /** Fechas ocupadas de un carro (pendientes y confirmadas bloquean). */
  const fechasOcupadas = (carroId: number): Set<string> => {
    const ocupadas = new Set<string>()
    reservas
      .filter((r) => r.carroId === carroId && r.estado !== 'cancelada')
      .forEach((r) => rangoFechas(r.desde, r.hasta).forEach((f) => ocupadas.add(f)))
    return ocupadas
  }

  const categorias = [...new Set(carros.map((c) => c.categoria))]

  return { carros, reservas, negocio, categorias, carroPorSlug, fechasOcupadas }
}
