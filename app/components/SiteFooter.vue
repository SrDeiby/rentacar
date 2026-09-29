<script setup lang="ts">
const { negocio } = useCatalogo()
</script>

<template>
  <footer class="footer">
    <div class="contenedor footer-in">
      <div>
        <strong>{{ negocio.nombre }}</strong>
        <p>{{ negocio.direccion }}</p>
      </div>
      <div>
        <p>📞 {{ negocio.telefono }}</p>
        <p>✉️ {{ negocio.email }}</p>
        <p>🕒 {{ negocio.horario }}</p>
      </div>
    </div>
    <p class="copy">© {{ new Date().getFullYear() }} {{ negocio.nombre }} · Liberia, Guanacaste, Costa Rica</p>
  </footer>
</template>

<style scoped>
.footer { background: #0f2e2b; color: #cfe3df; margin-top: 4rem; padding: 2.5rem 0 1rem; }
.footer-in { display: grid; grid-template-columns: repeat(auto-fit, minmax(240px, 1fr)); gap: 1.5rem; }
.footer p { margin: .3rem 0; font-size: .92rem; }
.footer strong { color: #fff; font-size: 1.1rem; }
.copy { text-align: center; font-size: .8rem; opacity: .7; margin-top: 2rem !important; }
</style>
