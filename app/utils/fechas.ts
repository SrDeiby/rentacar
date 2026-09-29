// Utilidades de fechas. Trabajamos con strings 'YYYY-MM-DD' para evitar
// problemas de zona horaria (Costa Rica es UTC-6).

export function aISO(fecha: Date): string {
  const y = fecha.getFullYear()
  const m = String(fecha.getMonth() + 1).padStart(2, '0')
  const d = String(fecha.getDate()).padStart(2, '0')
  return `${y}-${m}-${d}`
}

export function desdeISO(iso: string): Date {
  const [y, m, d] = iso.split('-').map(Number)
  return new Date(y!, m! - 1, d!)
}

export function hoyISO(): string {
  return aISO(new Date())
}

export function sumarDias(iso: string, dias: number): string {
  const f = desdeISO(iso)
  f.setDate(f.getDate() + dias)
  return aISO(f)
}

/** Días entre recogida y devolución (del 5 al 8 = 3 días de alquiler). */
export function diasEntre(desde: string, hasta: string): number {
  const ms = desdeISO(hasta).getTime() - desdeISO(desde).getTime()
  return Math.round(ms / 86_400_000)
}

/** Lista de fechas ISO desde..hasta, ambas incluidas. */
export function rangoFechas(desde: string, hasta: string): string[] {
  const fechas: string[] = []
  let actual = desde
  while (actual <= hasta) {
    fechas.push(actual)
    actual = sumarDias(actual, 1)
  }
  return fechas
}

export function formatoFecha(iso: string): string {
  return desdeISO(iso).toLocaleDateString('es-CR', {
    weekday: 'short',
    day: 'numeric',
    month: 'short',
    year: 'numeric'
  })
}
