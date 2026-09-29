<script setup lang="ts">
const { negocio } = useCatalogo()

// Datos estructurados: le dicen a Google que esto es un negocio de alquiler de autos local
useHead({
  titleTemplate: (t) => (t ? `${t} | ${negocio.nombre}` : `${negocio.nombre} – Rent a car en Liberia`),
  script: [
    {
      type: 'application/ld+json',
      innerHTML: JSON.stringify({
        '@context': 'https://schema.org',
        '@type': 'AutoRental',
        name: negocio.nombre,
        telephone: negocio.telefono,
        email: negocio.email,
        address: {
          '@type': 'PostalAddress',
          streetAddress: negocio.direccion,
          addressLocality: negocio.ciudad,
          addressRegion: negocio.provincia,
          addressCountry: 'CR'
        },
        openingHours: 'Mo-Su 06:00-21:00',
        areaServed: ['Liberia', 'Guanacaste', 'Tamarindo', 'Playas del Coco']
      })
    }
  ]
})
</script>

<template>
  <div>
    <SiteHeader />
    <main>
      <NuxtPage />
    </main>
    <SiteFooter />
  </div>
</template>
