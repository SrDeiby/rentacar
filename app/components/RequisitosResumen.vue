<script setup lang="ts">
// Versión corta de los requisitos para mostrar junto a cada carro
const { negocio } = useCatalogo()
const req = negocio.requisitos
</script>

<template>
  <aside class="req">
    <h3>Requisitos para alquilar</h3>
    <ul>
      <li v-for="r in req.generales" :key="r.titulo">
        <span>{{ r.icono }}</span> <b>{{ r.titulo }}:</b> {{ r.detalle.split('.')[0] }}.
      </li>
      <li v-for="g in req.grupos" :key="g.id">
        <span>📄</span> <b>{{ g.titulo }}:</b> {{ g.documentos.map((d) => d.titulo).join(', ') }}.
      </li>
    </ul>
    <NuxtLink to="/requisitos">Ver todos los requisitos →</NuxtLink>
  </aside>
</template>

<style scoped>
.req { background: var(--blanco); border: 1px solid var(--borde); border-radius: 14px; padding: 1rem 1.2rem; margin-top: 1rem; }
h3 { margin: 0 0 .6rem; font-size: 1.05rem; }
ul { list-style: none; padding: 0; margin: 0 0 .75rem; }
li { padding: .3rem 0; font-size: .92rem; color: var(--gris); }
li b { color: var(--texto); }
a { font-weight: 600; text-decoration: none; }
</style>
