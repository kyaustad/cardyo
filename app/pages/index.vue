<script setup lang="ts">
const route = useRoute();
const appConfig = useAppConfig();
const type = ref<string | undefined>();
const info = ref();

onMounted(() => {
  type.value = route.query.type as string;
  info.value = route.query;
  if (type.value === "view") {
    const color = route.query.color as string;
    console.log("Type:", type.value);

    if (color) {
      appConfig.ui.colors.primary = color;
    }
  } else if (!type.value || type.value !== "view") {
    console.log("View Mode", type.value);
  }

  console.log("INFO:", info.value);
});
</script>

<template>
  <div class="flex flex-col items-center justify-center gap-4 h-screen">
    <NuxtPwaManifest />
    <div class="flex flex-col items-center gap-2 mt-60 pb-10">
      <TheViewComponent v-if="type && type === 'view'" :url-card="info" />
      <TheCreateComponent v-else />
    </div>
  </div>
</template>
