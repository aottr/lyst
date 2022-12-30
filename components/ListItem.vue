<script setup lang="ts">
interface ListItemProps {
  name: string;
  slug: string;
}
const props = defineProps<ListItemProps>();
</script>
<template>
  <NuxtLink :to="`/lists/${slug}`" class="btn btn-lg btn-block mb-4">{{
    name
  }}</NuxtLink>
</template>
