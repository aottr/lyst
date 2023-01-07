<script setup>
const { isDarkMode } = useDarkMode();
</script>

<template>
  <Html :data-theme="isDarkMode ? 'dark' : 'light'"> </Html>
  <div class="flex flex-col min-h-screen">
    <Nav />
    <div class="container mx-auto p-4">
      <slot />
    </div>
    <Footer />
  </div>
</template>
