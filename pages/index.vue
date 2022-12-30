<script setup lang="ts">
const lists = await $fetch('/api/wishlists');
</script>
<template>
  <Html>
    <Head>
      <Title>Wishlist</Title>
      <Meta name="description" content="Wishlist system" />
    </Head>
  </Html>
  <div class="container mx-auto p-4">
    <ListItem
      v-for="item in lists.data"
      :key="item.id"
      :name="item.name"
      :slug="item.slug"
      :id="item.id"></ListItem>
  </div>
</template>
