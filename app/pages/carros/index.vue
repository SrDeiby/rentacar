<script setup lang="ts">
const { carros, categorias } = useCatalogo()

const categoria = ref('Todas')
const orden = ref<'precio-asc' | 'precio-desc'>('precio-asc')

const lista = computed(() => {
  const filtrados = categoria.value === 'Todas' ? carros : carros.filter((c) => c.categoria === categoria.value)
  return [...filtrados].sort((a, b) =>
    orden.value === 'precio-asc' ? a.precioDia - b.precioDia : b.precioDia - a.precioDia
  )
})

useSeoMeta({
  title: 'Carros en alquiler',
  description: 'Catálogo de carros en alquiler en Liberia: SUV 4x4, económicos y microbuses. Precios por día y disponibilidad en línea.'
})
</script>

<template>
  <section class="contenedor seccion">
    <h1>Carros en alquiler</h1>

    <div class="filtros">
      <div class="chips">
        <button
          v-for="cat in ['Todas', ...categorias]"
          :key="cat"
          :class="{ activo: categoria === cat }"
          @click="categoria = cat"
        >
          {{ cat }}
        </button>
      </div>
      <select v-model="orden" aria-label="Ordenar">
        <option value="precio-asc">Precio: menor a mayor</option>
        <option value="precio-desc">Precio: mayor a menor</option>
      </select>
    </div>

    <div class="grid-carros">
      <CarCard v-for="c in lista" :key="c.id" :carro="c" />
    </div>
  </section>
</template>

<style scoped>
h1 { margin: 0 0 1.25rem; }
.filtros { display: flex; flex-wrap: wrap; gap: 1rem; justify-content: space-between; align-items: center; margin-bottom: 1.5rem; }
.chips { display: flex; flex-wrap: wrap; gap: .5rem; }
.chips button { border: 1px solid var(--borde); background: var(--blanco); padding: .45rem .9rem; border-radius: 999px; cursor: pointer; font: inherit; font-size: .9rem; }
.chips button.activo { background: var(--primario); color: #fff; border-color: var(--primario); }
select { padding: .5rem .7rem; border-radius: 10px; border: 1px solid var(--borde); font: inherit; background: var(--blanco); }
</style>
