<script setup lang="ts">
const { negocio } = useCatalogo()
const abierto = ref(false)
const route = useRoute()
watch(() => route.path, () => (abierto.value = false))
</script>

<template>
  <header class="header">
    <div class="contenedor header-in">
      <NuxtLink to="/" class="logo">🚙 {{ negocio.nombre }}</NuxtLink>
      <button class="menu-btn" aria-label="Menú" @click="abierto = !abierto">☰</button>
      <nav :class="{ abierto }">
        <NuxtLink to="/">Inicio</NuxtLink>
        <NuxtLink to="/carros">Carros</NuxtLink>
        <NuxtLink to="/requisitos">Requisitos</NuxtLink>
        <NuxtLink to="/rent-a-car-liberia">Rent a car Liberia</NuxtLink>
        <a :href="`https://wa.me/${negocio.whatsapp}`" target="_blank" rel="noopener" class="btn btn-sm">WhatsApp</a>
      </nav>
    </div>
  </header>
</template>

<style scoped>
.header { background: var(--blanco); border-bottom: 1px solid var(--borde); position: sticky; top: 0; z-index: 10; }
.header-in { display: flex; align-items: center; justify-content: space-between; height: 64px; }
.logo { font-weight: 800; font-size: 1.1rem; color: var(--texto); text-decoration: none; }
nav { display: flex; gap: 1.25rem; align-items: center; }
nav a:not(.btn) { color: var(--texto); text-decoration: none; font-weight: 500; }
nav a.router-link-exact-active:not(.btn) { color: var(--primario); }
.menu-btn { display: none; background: none; border: none; font-size: 1.5rem; cursor: pointer; }
@media (max-width: 720px) {
  .menu-btn { display: block; }
  nav { display: none; position: absolute; top: 64px; left: 0; right: 0; background: var(--blanco); flex-direction: column; padding: 1rem; border-bottom: 1px solid var(--borde); }
  nav.abierto { display: flex; }
}
</style>
