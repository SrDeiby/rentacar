# Pura Vida Rent a Car (plantilla Nuxt)

Plantilla de sitio para Rent a Car: catálogo, página por carro, calendario de
disponibilidad, cotizador y reserva por WhatsApp. Se genera como sitio estático
(HTML por página) para que Google lo indexe bien.

## Requisitos
- Node.js 20 o superior (recomendado 22 LTS)
- VS Code con la extensión **Vue - Official**

## Comandos
```bash
npm install        # instala dependencias (solo la primera vez)
npm run dev        # servidor de desarrollo en http://localhost:3000
npm run generate   # genera el sitio estático en .output/public
npx serve .output/public   # previsualiza el sitio generado
```

## Estructura
```
app/
  app.vue                       Layout general + datos schema.org (SEO local)
  assets/css/main.css           Colores y estilos globales (variables --primario, etc.)
  components/
    SiteHeader.vue / SiteFooter.vue
    CarCard.vue                 Tarjeta de carro del catálogo
    CalendarioDisponibilidad.vue  Calendario de 2 meses con fechas bloqueadas
    Cotizador.vue               Extras, cálculo del total y botón de WhatsApp
  composables/useCatalogo.ts    ÚNICO lugar que lee los datos (luego → Supabase)
  data/
    negocio.json                Nombre, WhatsApp, dirección, extras y reglas de precio
    carros.json                 Catálogo de carros
    reservas.json               Fechas ocupadas por carro
  pages/
    index.vue                   /
    carros/index.vue            /carros
    carros/[slug].vue           /carros/toyota-rav4-2022 ...
    rent-a-car-liberia.vue      /rent-a-car-liberia (página SEO local)
  utils/fechas.ts, precios.ts   Lógica de fechas y cotización (auto-importadas)
public/                         Imágenes, favicon, robots.txt
nuxt.config.ts                  Dominio del sitio, sitemap y rutas a pre-generar
```

## Cómo adaptarlo a un cliente
1. `app/data/negocio.json`: nombre, WhatsApp (formato `506XXXXXXXX`), dirección, extras.
2. `app/data/carros.json`: sus carros. El `slug` es la URL; sin espacios ni tildes.
3. Fotos en `public/img/carros/` y actualizar el campo `imagen`.
4. Colores en `app/assets/css/main.css`.
5. Dominio real en `nuxt.config.ts` → `site.url`.

## Bloquear fechas
Agregar un objeto a `app/data/reservas.json`:
```json
{ "id": 110, "carroId": 1, "desde": "2026-12-20", "hasta": "2026-12-27", "estado": "confirmada" }
```
`pendiente` y `confirmada` bloquean; `cancelada` no. Luego volver a publicar.

## Publicar gratis (Netlify)
- Build command: `npm run generate`
- Publish directory: `.output/public`
