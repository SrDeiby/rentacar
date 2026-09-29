<script setup lang="ts">
const route = useRoute()
const { carroPorSlug } = useCatalogo()

const carro = carroPorSlug(String(route.params.slug))
if (!carro) {
  throw createError({ statusCode: 404, statusMessage: 'Carro no encontrado', fatal: true })
}

const nombre = `${carro.marca} ${carro.modelo} ${carro.anio}`
useSeoMeta({
  title: `Alquiler ${nombre} en Liberia`,
  description: `Alquilá un ${nombre} (${carro.categoria}) en Liberia, Guanacaste desde ${dinero(carro.precioDia)} por día. ${carro.descripcion}`,
  ogTitle: `Alquiler ${nombre} en Liberia`,
  ogImage: carro.imagen
})
</script>

<template>
  <section v-if="carro" class="contenedor seccion">
    <NuxtLink to="/carros" class="volver">← Todos los carros</NuxtLink>

    <div class="detalle">
      <div class="info">
        <img :src="carro.imagen" :alt="`${nombre} en alquiler en Liberia`" class="foto" />
        <span class="chip">{{ carro.categoria }}</span>
        <h1>Alquiler {{ carro.marca }} {{ carro.modelo }} <small>{{ carro.anio }}</small></h1>
        <p class="precio"><b>{{ dinero(carro.precioDia) }}</b> por día</p>
        <p>{{ carro.descripcion }}</p>
        <ul class="specs">
          <li><span>Pasajeros</span><b>{{ carro.pasajeros }}</b></li>
          <li><span>Maletas</span><b>{{ carro.maletas }}</b></li>
          <li><span>Transmisión</span><b>{{ carro.transmision }}</b></li>
          <li><span>Tracción</span><b>{{ carro.traccion }}</b></li>
          <li><span>Aire acondicionado</span><b>{{ carro.aire ? 'Sí' : 'No' }}</b></li>
        </ul>
        <RequisitosResumen />
      </div>

      <!-- El calendario depende de la fecha de hoy: se dibuja solo en el navegador -->
      <ClientOnly>
        <Cotizador :carro="carro" />
        <template #fallback>
          <div class="cargando">Cargando disponibilidad…</div>
        </template>
      </ClientOnly>
    </div>
  </section>
</template>

<style scoped>
.volver { display: inline-block; margin-bottom: 1rem; text-decoration: none; font-weight: 500; }
.detalle { display: grid; grid-template-columns: 1fr 1.15fr; gap: 2rem; align-items: start; }
@media (max-width: 900px) { .detalle { grid-template-columns: 1fr; } }
.foto { width: 100%; border-radius: 16px; background: #eef4f3; aspect-ratio: 16/10; object-fit: cover; }
.chip { display: inline-block; margin-top: 1rem; background: var(--libre); color: var(--primario); padding: .2rem .7rem; border-radius: 999px; font-size: .82rem; font-weight: 600; }
h1 { margin: .5rem 0 .25rem; font-size: 1.8rem; }
h1 small { color: var(--gris); font-weight: 400; }
.precio { margin: 0 0 .75rem; } .precio b { font-size: 1.6rem; color: var(--primario); }
.specs { list-style: none; padding: 0; margin: 1rem 0 0; background: var(--blanco); border: 1px solid var(--borde); border-radius: 14px; }
.specs li { display: flex; justify-content: space-between; padding: .6rem 1rem; border-bottom: 1px solid var(--borde); }
.specs li:last-child { border-bottom: none; }
.specs span { color: var(--gris); }
.cargando { background: var(--blanco); border: 1px solid var(--borde); border-radius: 14px; padding: 3rem; text-align: center; color: var(--gris); }
</style>
