<script setup lang="ts">
const { negocio } = useCatalogo()
const req = negocio.requisitos

const grupoActivo = ref(req.grupos[0]!.id)
const grupo = computed(() => req.grupos.find((g) => g.id === grupoActivo.value)!)

useSeoMeta({
  title: 'Requisitos para alquilar un carro',
  description: `Requisitos para alquilar un carro en ${negocio.ciudad}: pasaporte o cédula, licencia de conducir, tarjeta de crédito para el depósito y edad mínima.`
})

// Preguntas frecuentes marcadas para Google (pueden salir como resultado enriquecido)
useHead({
  script: [
    {
      type: 'application/ld+json',
      innerHTML: JSON.stringify({
        '@context': 'https://schema.org',
        '@type': 'FAQPage',
        mainEntity: req.preguntas.map((p) => ({
          '@type': 'Question',
          name: p.pregunta,
          acceptedAnswer: { '@type': 'Answer', text: p.respuesta }
        }))
      })
    }
  ]
})
</script>

<template>
  <section class="contenedor seccion">
    <h1>Requisitos para alquilar</h1>
    <p class="lead">{{ req.intro }}</p>

    <h2>Para todos los conductores</h2>
    <div class="tarjetas">
      <div v-for="r in req.generales" :key="r.titulo" class="tarjeta">
        <span class="icono">{{ r.icono }}</span>
        <div>
          <h3>{{ r.titulo }}</h3>
          <p>{{ r.detalle }}</p>
        </div>
      </div>
    </div>

    <h2>Documentos según tu caso</h2>
    <div class="tabs" role="tablist">
      <button
        v-for="g in req.grupos"
        :key="g.id"
        role="tab"
        :aria-selected="grupoActivo === g.id"
        :class="{ activo: grupoActivo === g.id }"
        @click="grupoActivo = g.id"
      >
        {{ g.titulo }}
      </button>
    </div>
    <ul class="checklist">
      <li v-for="d in grupo.documentos" :key="d.titulo">
        <span class="icono">{{ d.icono }}</span>
        <div>
          <strong>{{ d.titulo }}</strong>
          <p>{{ d.detalle }}</p>
        </div>
      </li>
    </ul>

    <div class="deposito">
      <div>
        <h2>{{ req.deposito.titulo }}</h2>
        <p>{{ req.deposito.detalle }}</p>
      </div>
      <ul>
        <li v-for="m in req.deposito.montos" :key="m.concepto">
          <span>{{ m.concepto }}</span><b>{{ dinero(m.monto) }}</b>
        </li>
      </ul>
    </div>

    <h2>Preguntas frecuentes</h2>
    <div class="faq">
      <details v-for="p in req.preguntas" :key="p.pregunta">
        <summary>{{ p.pregunta }}</summary>
        <p>{{ p.respuesta }}</p>
      </details>
    </div>

    <div class="cta">
      <p>¿Tenés todo listo?</p>
      <NuxtLink to="/carros" class="btn">Ver carros disponibles</NuxtLink>
      <a :href="`https://wa.me/${negocio.whatsapp}`" target="_blank" rel="noopener" class="btn btn-claro">Consultar por WhatsApp</a>
    </div>
  </section>
</template>

<style scoped>
h1 { margin: 0 0 .5rem; }
.lead { font-size: 1.1rem; color: var(--gris); max-width: 720px; margin: 0 0 1rem; }
h2 { font-size: 1.35rem !important; margin: 2.25rem 0 1rem !important; }
.icono { font-size: 1.6rem; line-height: 1; }
.tarjetas { display: grid; grid-template-columns: repeat(auto-fit, minmax(260px, 1fr)); gap: 1rem; }
.tarjeta { display: flex; gap: .9rem; background: var(--blanco); border: 1px solid var(--borde); border-radius: 14px; padding: 1.1rem; }
.tarjeta h3 { margin: 0 0 .25rem; font-size: 1.05rem; }
.tarjeta p { margin: 0; color: var(--gris); font-size: .93rem; }
.tabs { display: flex; gap: .5rem; flex-wrap: wrap; margin-bottom: 1rem; }
.tabs button { border: 1px solid var(--borde); background: var(--blanco); padding: .6rem 1.1rem; border-radius: 999px; font: inherit; font-weight: 600; cursor: pointer; }
.tabs button.activo { background: var(--primario); border-color: var(--primario); color: #fff; }
.checklist { list-style: none; padding: 0; margin: 0; background: var(--blanco); border: 1px solid var(--borde); border-radius: 14px; }
.checklist li { display: flex; gap: .9rem; padding: 1rem 1.2rem; border-bottom: 1px solid var(--borde); }
.checklist li:last-child { border-bottom: none; }
.checklist p { margin: .15rem 0 0; color: var(--gris); font-size: .93rem; }
.deposito { display: grid; grid-template-columns: 1.3fr 1fr; gap: 1.5rem; align-items: center; background: var(--libre); border-radius: 16px; padding: .5rem 1.5rem 1.5rem; margin-top: 2.25rem; }
@media (max-width: 720px) { .deposito { grid-template-columns: 1fr; } }
.deposito p { margin: 0; }
.deposito ul { list-style: none; padding: 0; margin: 0; background: var(--blanco); border-radius: 12px; }
.deposito li { display: flex; justify-content: space-between; gap: 1rem; padding: .8rem 1rem; border-bottom: 1px solid var(--borde); }
.deposito li:last-child { border-bottom: none; }
.deposito b { color: var(--primario); }
.faq details { background: var(--blanco); border: 1px solid var(--borde); border-radius: 12px; padding: .9rem 1.1rem; margin-bottom: .6rem; }
.faq summary { font-weight: 600; cursor: pointer; }
.faq p { margin: .6rem 0 0; color: var(--gris); }
.cta { text-align: center; margin-top: 2.5rem; display: flex; flex-wrap: wrap; justify-content: center; align-items: center; gap: .75rem; }
.cta p { width: 100%; margin: 0; font-weight: 600; font-size: 1.1rem; }
.cta .btn-claro { border: 1px solid var(--primario); }
</style>
