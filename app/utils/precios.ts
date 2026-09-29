export interface Extra {
  id: string
  nombre: string
  precio: number
  tipo: 'por_dia' | 'unico' | string
}

export interface Reglas {
  descuentoSemanal: number
  diasParaDescuento: number
  minimoDias: number
}

export interface LineaCotizacion {
  concepto: string
  monto: number
}

export interface Cotizacion {
  dias: number
  lineas: LineaCotizacion[]
  total: number
}

export function cotizar(
  precioDia: number,
  dias: number,
  extrasElegidos: Extra[],
  reglas: Reglas
): Cotizacion {
  const lineas: LineaCotizacion[] = []

  const base = precioDia * dias
  lineas.push({ concepto: `Alquiler (${dias} días × $${precioDia})`, monto: base })

  if (dias >= reglas.diasParaDescuento && reglas.descuentoSemanal > 0) {
    const pct = Math.round(reglas.descuentoSemanal * 100)
    lineas.push({ concepto: `Descuento semanal (${pct}%)`, monto: -base * reglas.descuentoSemanal })
  }

  for (const extra of extrasElegidos) {
    const monto = extra.tipo === 'por_dia' ? extra.precio * dias : extra.precio
    const detalle = extra.tipo === 'por_dia' ? ` (${dias} × $${extra.precio})` : ''
    lineas.push({ concepto: extra.nombre + detalle, monto })
  }

  const total = lineas.reduce((suma, l) => suma + l.monto, 0)
  return { dias, lineas, total: Math.round(total * 100) / 100 }
}

export function dinero(monto: number): string {
  return new Intl.NumberFormat('en-US', { style: 'currency', currency: 'USD' }).format(monto)
}
