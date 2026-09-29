<script setup lang="ts">
import type { Carro } from '~/composables/useCatalogo'
defineProps<{ carro: Carro }>()
</script>

<template>
  <article class="card">
    <NuxtLink :to="`/carros/${carro.slug}`" class="card-img">
      <img :src="carro.imagen" :alt="`${carro.marca} ${carro.modelo} en alquiler en Liberia`" loading="lazy" />
      <span class="chip">{{ carro.categoria }}</span>
    </NuxtLink>
    <div class="card-body">
      <h3>{{ carro.marca }} {{ carro.modelo }} <small>{{ carro.anio }}</small></h3>
      <ul class="specs">
        <li>👤 {{ carro.pasajeros }}</li>
        <li>🧳 {{ carro.maletas }}</li>
        <li>⚙️ {{ carro.transmision }}</li>
        <li>🛞 {{ carro.traccion }}</li>
      </ul>
      <div class="card-foot">
        <p class="precio"><b>{{ dinero(carro.precioDia) }}</b> / día</p>
        <NuxtLink :to="`/carros/${carro.slug}`" class="btn">Ver fechas</NuxtLink>
      </div>
    </div>
  </article>
</template>

<style scoped>
.card { background: var(--blanco); border: 1px solid var(--borde); border-radius: 16px; overflow: hidden; display: flex; flex-direction: column; transition: transform .15s, box-shadow .15s; }
.card:hover { transform: translateY(-3px); box-shadow: 0 10px 25px rgba(0,0,0,.08); }
.card-img { position: relative; display: block; background: #eef4f3; }
.card-img img { width: 100%; aspect-ratio: 16/10; object-fit: cover; display: block; }
.chip { position: absolute; top: 10px; left: 10px; background: rgba(255,255,255,.92); padding: .2rem .6rem; border-radius: 999px; font-size: .78rem; font-weight: 600; }
.card-body { padding: 1rem 1.1rem 1.1rem; display: flex; flex-direction: column; flex: 1; }
h3 { margin: 0 0 .5rem; font-size: 1.15rem; }
h3 small { color: var(--gris); font-weight: 400; }
.specs { list-style: none; padding: 0; margin: 0 0 1rem; display: flex; flex-wrap: wrap; gap: .4rem .9rem; font-size: .88rem; color: var(--gris); }
.card-foot { margin-top: auto; display: flex; align-items: center; justify-content: space-between; gap: .5rem; }
.precio { margin: 0; } .precio b { font-size: 1.3rem; color: var(--primario); }
</style>
