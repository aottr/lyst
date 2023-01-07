<script setup lang="ts">
const lists = await $fetch('/api/waitinglists');
</script>
<template>
  <Html>
    <Head>
      <Title>Waitinglist</Title>
      <Meta name="description" content="Waitinglist by AlexOttr" />
    </Head>
  </Html>
  <div>
    <ListItem
      v-for="item in lists.data"
      :key="item.id"
      :name="item.name"
      :slug="item.slug"
      :id="item.id"></ListItem>
  </div>
</template>
