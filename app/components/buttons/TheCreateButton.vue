<script lang="ts" setup>
const url = ref("");

onMounted(() => {
  url.value = window.location.origin;
});
</script>

<template>
  <div>
    <a :href="`${url}`">
      <UButton
        icon="i-lucide-plus-circle"
        color="primary"
        variant="soft"
        size="lg"
        class="absolute left-4 top-4 cursor-pointer transition-all ease-in-out hover:scale-105 active:scale-95"
    /></a>
  </div>
</template>

<style></style>
