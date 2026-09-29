<script setup lang="ts">
const { carros, negocio } = useCatalogo()
const destacados = carros.slice(0, 3)

useSeoMeta({
  title: '',
  description: `Alquiler de carros en Liberia, Guanacaste. SUV 4x4, económicos y microbuses con entrega en el aeropuerto. Revisá disponibilidad y cotizá en línea.`,
  ogTitle: `${negocio.nombre} – Rent a car en Liberia`,
  ogDescription: 'Carros 4x4 y económicos con entrega en el aeropuerto de Liberia.',
  ogImage: '/img/og.svg'
})
</script>

<template>
  <div>
    <section class="hero">
      <div class="contenedor">
        <h1>Rent a car en Liberia, Guanacaste</h1>
        <p>SUV 4x4, carros económicos y microbuses con entrega en el Aeropuerto Daniel Oduber. Revisá qué días están libres y cotizá en segundos.</p>
        <div class="hero-btns">
          <NuxtLink to="/carros" class="btn btn-claro">Ver carros disponibles</NuxtLink>
          <a :href="`https://wa.me/${negocio.whatsapp}`" target="_blank" rel="noopener" class="btn">Escribinos por WhatsApp</a>
        </div>
      </div>
    </section>

    <section class="contenedor seccion">
      <h2>Carros destacados</h2>
      <div class="grid-carros">
        <CarCard v-for="c in destacados" :key="c.id" :carro="c" />
      </div>
      <p style="text-align:center;margin-top:1.5rem">
        <NuxtLink to="/carros" class="btn">Ver todo el catálogo</NuxtLink>
      </p>
    </section>

    <section class="contenedor seccion">
      <h2>¿Por qué alquilar con nosotros?</h2>
      <div class="beneficios">
        <div><span>✈️</span><h3>Entrega en el aeropuerto</h3><p>Te esperamos en LIR con el carro listo.</p></div>
        <div><span>🛡️</span><h3>Seguro incluido</h3><p>Seguro obligatorio incluido en todas las tarifas.</p></div>
        <div><span>📅</span><h3>Disponibilidad en línea</h3><p>Mirá qué días están libres antes de escribirnos.</p></div>
        <div><span>💬</span><h3>Atención por WhatsApp</h3><p>Respuesta rápida, en español o inglés.</p></div>
      </div>
    </section>
  </div>
</template>

<style scoped>
.hero { background: linear-gradient(135deg, #0e7c6b, #0a4f5f); color: #fff; padding: 4.5rem 0 4rem; }
.hero h1 { font-size: clamp(2rem, 5vw, 3rem); margin: 0 0 1rem; line-height: 1.15; max-width: 720px; }
.hero p { font-size: 1.15rem; max-width: 620px; opacity: .92; margin: 0 0 1.75rem; }
.hero-btns { display: flex; flex-wrap: wrap; gap: .75rem; }
.hero .btn:not(.btn-claro) { background: var(--acento); color: #1d2a2a; }
.beneficios { display: grid; grid-template-columns: repeat(auto-fit, minmax(220px, 1fr)); gap: 1rem; }
.beneficios div { background: var(--blanco); border: 1px solid var(--borde); border-radius: 14px; padding: 1.25rem; }
.beneficios span { font-size: 1.8rem; }
.beneficios h3 { margin: .4rem 0; font-size: 1.05rem; }
.beneficios p { margin: 0; color: var(--gris); font-size: .93rem; }
</style>
