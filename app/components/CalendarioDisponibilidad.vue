<script setup lang="ts">
// Calendario de dos meses: primer clic = recogida, segundo clic = devolución.
// No deja escoger días pasados ni rangos que crucen fechas ocupadas.

interface Rango {
  desde: string | null
  hasta: string | null
}

const props = defineProps<{ ocupadas: string[] }>()
const rango = defineModel<Rango>({ required: true })

const ocupadas = computed(() => new Set(props.ocupadas))
const hoy = hoyISO()
const mensaje = ref('')

const inicio = new Date()
const mesBase = ref(new Date(inicio.getFullYear(), inicio.getMonth(), 1))

const nombresDias = ['Lu', 'Ma', 'Mi', 'Ju', 'Vi', 'Sá', 'Do']

function construirMes(offset: number) {
  const primero = new Date(mesBase.value.getFullYear(), mesBase.value.getMonth() + offset, 1)
  const texto = primero.toLocaleDateString('es-CR', { month: 'long', year: 'numeric' })
  const titulo = texto.charAt(0).toUpperCase() + texto.slice(1)
  const diasEnMes = new Date(primero.getFullYear(), primero.getMonth() + 1, 0).getDate()
  // getDay(): 0 = domingo. Lo convertimos para que la semana empiece en lunes.
  const vacios = (primero.getDay() + 6) % 7
  const celdas: (string | null)[] = Array(vacios).fill(null)
  for (let d = 1; d <= diasEnMes; d++) {
    celdas.push(aISO(new Date(primero.getFullYear(), primero.getMonth(), d)))
  }
  return { titulo, celdas }
}

const meses = computed(() => [construirMes(0), construirMes(1)])

const puedeRetroceder = computed(() => {
  const actual = new Date(inicio.getFullYear(), inicio.getMonth(), 1)
  return mesBase.value > actual
})

function moverMes(delta: number) {
  mesBase.value = new Date(mesBase.value.getFullYear(), mesBase.value.getMonth() + delta, 1)
}

function estado(fecha: string) {
  const { desde, hasta } = rango.value
  return {
    pasado: fecha < hoy,
    ocupado: ocupadas.value.has(fecha),
    inicio: fecha === desde,
    fin: fecha === hasta,
    enRango: !!desde && !!hasta && fecha > desde && fecha < hasta,
    hoy: fecha === hoy
  }
}

function rangoLibre(desde: string, hasta: string) {
  return rangoFechas(desde, hasta).every((f) => !ocupadas.value.has(f))
}

function seleccionar(fecha: string) {
  mensaje.value = ''
  const e = estado(fecha)
  if (e.pasado || e.ocupado) return

  const { desde, hasta } = rango.value
  // Empezar selección nueva
  if (!desde || hasta || fecha <= desde) {
    rango.value = { desde: fecha, hasta: null }
    return
  }
  // Completar el rango
  if (!rangoLibre(desde, fecha)) {
    mensaje.value = 'Ese rango incluye días en que el carro ya está reservado.'
    rango.value = { desde: fecha, hasta: null }
    return
  }
  rango.value = { desde, hasta: fecha }
}

function limpiar() {
  rango.value = { desde: null, hasta: null }
  mensaje.value = ''
}
</script>

<template>
  <div class="calendario">
    <div class="cal-nav">
      <button type="button" :disabled="!puedeRetroceder" aria-label="Mes anterior" @click="moverMes(-1)">‹</button>
      <span class="cal-ayuda">
        {{ !rango.desde ? 'Escogé el día de recogida' : !rango.hasta ? 'Ahora escogé el día de devolución' : 'Fechas seleccionadas' }}
      </span>
      <button type="button" aria-label="Mes siguiente" @click="moverMes(1)">›</button>
    </div>

    <div class="cal-meses">
      <div v-for="mes in meses" :key="mes.titulo" class="cal-mes">
        <h4>{{ mes.titulo }}</h4>
        <div class="cal-grid">
          <span v-for="n in nombresDias" :key="n" class="cal-dia-nombre">{{ n }}</span>
          <template v-for="(fecha, i) in mes.celdas" :key="fecha ?? `v${i}`">
            <span v-if="!fecha" />
            <button
              v-else
              type="button"
              class="cal-dia"
              :class="estado(fecha)"
              :disabled="estado(fecha).pasado || estado(fecha).ocupado"
              :title="estado(fecha).ocupado ? 'Reservado' : ''"
              @click="seleccionar(fecha)"
            >
              {{ Number(fecha.slice(8)) }}
            </button>
          </template>
        </div>
      </div>
    </div>

    <p v-if="mensaje" class="cal-error">{{ mensaje }}</p>

    <div class="cal-leyenda">
      <span><i class="lg libre" /> Disponible</span>
      <span><i class="lg ocupado" /> Reservado</span>
      <span><i class="lg elegido" /> Tu selección</span>
      <button v-if="rango.desde" type="button" class="link" @click="limpiar">Limpiar fechas</button>
    </div>
  </div>
</template>

<style scoped>
.calendario { background: var(--blanco); border: 1px solid var(--borde); border-radius: 14px; padding: 1rem; }
.cal-nav { display: flex; align-items: center; justify-content: space-between; margin-bottom: .5rem; }
.cal-nav button { width: 36px; height: 36px; border-radius: 50%; border: 1px solid var(--borde); background: var(--blanco); font-size: 1.3rem; cursor: pointer; }
.cal-nav button:disabled { opacity: .3; cursor: default; }
.cal-ayuda { font-weight: 600; color: var(--primario); font-size: .95rem; }
.cal-meses { display: grid; grid-template-columns: repeat(auto-fit, minmax(240px, 1fr)); gap: 1.25rem; }
.cal-mes h4 { text-align: center; margin: .25rem 0 .5rem; }
.cal-grid { display: grid; grid-template-columns: repeat(7, 1fr); gap: 3px; }
.cal-dia-nombre { text-align: center; font-size: .75rem; color: var(--gris); padding-bottom: 4px; }
.cal-dia { aspect-ratio: 1; border: none; border-radius: 8px; background: var(--libre); cursor: pointer; font-size: .9rem; color: var(--texto); }
.cal-dia:hover:not(:disabled) { outline: 2px solid var(--primario); }
.cal-dia.hoy { font-weight: 700; }
.cal-dia.pasado { background: transparent; color: #c5c9cf; cursor: default; }
.cal-dia.ocupado { background: var(--ocupado); color: #9b3b3b; text-decoration: line-through; cursor: not-allowed; }
.cal-dia.enRango { background: var(--rango); }
.cal-dia.inicio, .cal-dia.fin { background: var(--primario); color: #fff; font-weight: 700; }
.cal-error { color: #b42318; font-size: .9rem; margin: .75rem 0 0; }
.cal-leyenda { display: flex; flex-wrap: wrap; gap: 1rem; align-items: center; margin-top: .9rem; font-size: .85rem; color: var(--gris); }
.lg { display: inline-block; width: 12px; height: 12px; border-radius: 3px; vertical-align: middle; margin-right: 4px; }
.lg.libre { background: var(--libre); } .lg.ocupado { background: var(--ocupado); } .lg.elegido { background: var(--primario); }
.link { background: none; border: none; color: var(--primario); text-decoration: underline; cursor: pointer; margin-left: auto; }
</style>
