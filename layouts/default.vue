<script setup>
const { isDarkMode } = useDarkMode();
</script>

<template>
  <Html :data-theme="isDarkMode ? 'dark' : 'light'"> </Html>
  <div>
    <Nav />
    <slot />
  </div>
</template>
