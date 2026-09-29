<script setup lang="ts">
import type { Carro } from '~/composables/useCatalogo'

const props = defineProps<{ carro: Carro }>()
const { negocio, fechasOcupadas } = useCatalogo()

const rango = ref<{ desde: string | null; hasta: string | null }>({ desde: null, hasta: null })
const extrasIds = ref<string[]>([])
const nombre = ref('')

const ocupadas = computed(() => [...fechasOcupadas(props.carro.id)])
const extras = negocio.extras as Extra[]

const dias = computed(() =>
  rango.value.desde && rango.value.hasta ? diasEntre(rango.value.desde, rango.value.hasta) : 0
)
const cumpleMinimo = computed(() => dias.value >= negocio.reglas.minimoDias)

const cotizacion = computed(() => {
  if (!dias.value) return null
  const elegidos = extras.filter((e) => extrasIds.value.includes(e.id))
  return cotizar(props.carro.precioDia, dias.value, elegidos, negocio.reglas)
})

const enlaceWhatsApp = computed(() => {
  if (!cotizacion.value || !rango.value.desde || !rango.value.hasta) return '#'
  const c = cotizacion.value
  const lineas = [
    `¡Hola ${negocio.nombre}! Quiero reservar:`,
    '',
    `🚗 ${props.carro.marca} ${props.carro.modelo} ${props.carro.anio}`,
    `📅 Recogida: ${formatoFecha(rango.value.desde)}`,
    `📅 Devolución: ${formatoFecha(rango.value.hasta)}`,
    `🗓️ ${c.dias} días`,
    ...c.lineas.map((l) => `• ${l.concepto}: ${dinero(l.monto)}`),
    `💰 Total estimado: ${dinero(c.total)}`,
    nombre.value ? `\nA nombre de: ${nombre.value}` : ''
  ]
  return `https://wa.me/${negocio.whatsapp}?text=${encodeURIComponent(lineas.join('\n'))}`
})
</script>

<template>
  <section class="cotizador">
    <h2>Disponibilidad y precio</h2>

    <CalendarioDisponibilidad v-model="rango" :ocupadas="ocupadas" />

    <div class="panel">
      <h3>Extras</h3>
      <label v-for="e in extras" :key="e.id" class="extra">
        <input v-model="extrasIds" type="checkbox" :value="e.id" />
        <span>{{ e.nombre }}</span>
        <small>{{ dinero(e.precio) }}{{ e.tipo === 'por_dia' ? ' / día' : '' }}</small>
      </label>
    </div>

    <div class="panel resumen">
      <h3>Tu cotización</h3>
      <p v-if="!rango.desde" class="vacio">Escogé las fechas en el calendario para ver el precio.</p>
      <p v-else-if="!rango.hasta" class="vacio">Recogida: <b>{{ formatoFecha(rango.desde) }}</b>. Falta la devolución.</p>

      <template v-else-if="cotizacion">
        <p class="fechas">
          {{ formatoFecha(rango.desde) }} → {{ formatoFecha(rango.hasta) }}
        </p>
        <ul>
          <li v-for="l in cotizacion.lineas" :key="l.concepto" :class="{ desc: l.monto < 0 }">
            <span>{{ l.concepto }}</span><span>{{ dinero(l.monto) }}</span>
          </li>
        </ul>
        <div class="total"><span>Total estimado</span><span>{{ dinero(cotizacion.total) }}</span></div>

        <p v-if="!cumpleMinimo" class="aviso">
          El alquiler mínimo es de {{ negocio.reglas.minimoDias }} días.
        </p>
        <template v-else>
          <input v-model="nombre" class="input" type="text" placeholder="Tu nombre (opcional)" />
          <a :href="enlaceWhatsApp" target="_blank" rel="noopener" class="btn btn-wa">
            Reservar por WhatsApp
          </a>
          <p class="nota">
            El precio es un estimado. La reserva se confirma por WhatsApp.
            Revisá los <NuxtLink to="/requisitos">requisitos</NuxtLink> antes de reservar.
          </p>
        </template>
      </template>
    </div>
  </section>
</template>

<style scoped>
.cotizador { display: grid; gap: 1rem; }
.cotizador h2 { margin: 0; }
.panel { background: var(--blanco); border: 1px solid var(--borde); border-radius: 14px; padding: 1rem 1.25rem; }
.panel h3 { margin: 0 0 .75rem; font-size: 1.05rem; }
.extra { display: flex; gap: .6rem; align-items: center; padding: .35rem 0; cursor: pointer; }
.extra small { margin-left: auto; color: var(--gris); white-space: nowrap; }
.vacio { color: var(--gris); margin: 0; }
.fechas { font-weight: 600; margin: 0 0 .75rem; }
ul { list-style: none; padding: 0; margin: 0; }
li { display: flex; justify-content: space-between; gap: 1rem; padding: .35rem 0; border-bottom: 1px dashed var(--borde); font-size: .93rem; }
li.desc { color: #1a7f37; }
.total { display: flex; justify-content: space-between; font-size: 1.25rem; font-weight: 800; margin: .9rem 0; }
.aviso { color: #b42318; margin: 0; }
.input { width: 100%; padding: .7rem .8rem; border: 1px solid var(--borde); border-radius: 10px; font: inherit; margin-bottom: .6rem; }
.btn-wa { background: #25d366; color: #fff; width: 100%; text-align: center; }
.btn-wa:hover { background: #1ebe5a; }
.nota { font-size: .8rem; color: var(--gris); margin: .6rem 0 0; }
</style>
