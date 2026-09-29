<script setup lang="ts">
// Página "de aterrizaje" local: apunta a la búsqueda "rent a car Liberia".
// Se pueden duplicar para Tamarindo, Playas del Coco, aeropuerto, etc.
const { carros, negocio } = useCatalogo()
const desde = Math.min(...carros.map((c) => c.precioDia))

useSeoMeta({
  title: 'Rent a car en Liberia, Guanacaste',
  description: `Rent a car en Liberia desde ${dinero(desde)} por día. Entrega en el Aeropuerto Internacional Daniel Oduber (LIR), SUV 4x4 y carros económicos.`
})
</script>

<template>
  <div>
  <section class="contenedor seccion texto">
    <h1>Rent a car en Liberia, Guanacaste</h1>
    <p class="lead">
      ¿Llegás al Aeropuerto Internacional Daniel Oduber (LIR)? En {{ negocio.nombre }} te entregamos el carro
      en el aeropuerto o en tu hotel en Liberia, con tarifas desde <b>{{ dinero(desde) }} por día</b>.
    </p>

    <h2>¿Qué carro necesito para Guanacaste?</h2>
    <p>
      Si vas a quedarte en Liberia o viajar por carretera pavimentada a Tamarindo, Playas del Coco o Playa Hermosa,
      un carro económico es suficiente. Para visitar el Parque Nacional Rincón de la Vieja, Playa Avellanas o
      caminos de lastre en época lluviosa (mayo a noviembre), recomendamos un SUV 4x4.
    </p>

    <h2>Lugares a los que te llevan nuestros carros</h2>
    <ul>
      <li>Aeropuerto de Liberia (LIR) → Tamarindo: aprox. 1 hora</li>
      <li>Liberia → Rincón de la Vieja: aprox. 45 minutos</li>
      <li>Liberia → Playas del Coco: aprox. 35 minutos</li>
      <li>Liberia → Monteverde: aprox. 3 horas</li>
    </ul>

    <h2>Nuestra flota</h2>
  </section>

  <section class="contenedor">
    <div class="grid-carros">
      <CarCard v-for="c in carros" :key="c.id" :carro="c" />
    </div>
  </section>
  </div>
</template>

<style scoped>
.texto { max-width: 780px; }
.lead { font-size: 1.15rem; }
.texto h2 { font-size: 1.35rem; margin: 2rem 0 .5rem; }
</style>
