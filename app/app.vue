<script setup>
useHead({
  title: 'Hyper-Futuristic Portfolio | Robert Catalin Crisan',
  meta: [
    { name: 'viewport', content: 'width=device-width, initial-scale=1' },
    { name: 'description', content: 'Portfolio of Robert Catalin Crisan - Game Developer and Technical Programmer' }
  ],
  htmlAttrs: {
    lang: 'en'
  }
})
</script>

<template>
  <UApp>
    <div class="portfolio-root">
      <NuxtPage />
    </div>
  </UApp>
</template>

<style>
/* Reset some default Nuxt Starter styles that might interfere */
body {
  margin: 0;
  padding: 0;
  overflow-x: hidden;
  background: #05070f;
}

.portfolio-root {
  min-height: 100vh;
}
</style>
