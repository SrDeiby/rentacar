import carros from './app/data/carros.json'

export default defineNuxtConfig({
  compatibilityDate: '2025-07-15',
  devtools: { enabled: true },

  modules: ['@nuxtjs/sitemap'],

  css: ['~/assets/css/main.css'],

  // Cambiar por el dominio real del cliente
  site: {
    url: 'https://www.rentacarliberia-demo.com',
    name: 'Pura Vida Rent a Car'
  },

  app: {
    head: {
      htmlAttrs: { lang: 'es' },
      meta: [{ name: 'viewport', content: 'width=device-width, initial-scale=1' }],
      link: [{ rel: 'icon', type: 'image/svg+xml', href: '/favicon.svg' }]
    }
  },

  // Genera un HTML por cada carro al correr `npm run generate`
  nitro: {
    prerender: {
      crawlLinks: true,
      routes: ['/', '/carros', '/rent-a-car-liberia', '/requisitos',...carros.map((c) => `/carros/${c.slug}`)]
    }
  }
})
