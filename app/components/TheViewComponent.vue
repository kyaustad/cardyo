<script lang="ts" setup>
import type { Card } from "~~/types/card";

const url = ref("waiting");

const { urlCard } = defineProps<{
  urlCard: Card;
}>();

onMounted(() => {
  url.value = window.location.href;
});
</script>

<template>
  <div
    class="flex flex-col justify-between text-start items-start gap-4 bg-zinc-500/25 p-4 rounded-xl shadow-xl m-2 mt-0"
  >
    <QRCode :url="url" :card="urlCard" />

    <div class="flex flex-row justify-center w-full gap-4 items-center">
      <NuxtImg
        v-if="urlCard.avatar && urlCard.avatar !== ''"
        height="124"
        width="124"
        :src="`${urlCard.avatar}`"
        class="rounded-full"
      />
    </div>
    <h1
      v-if="
        urlCard.fName && urlCard.fName !== '' && urlCard.fName !== 'undefined'
      "
      class="font-bold text-5xl text-(--ui-primary)"
    >
      {{ urlCard.fName + " " + urlCard.lName }}
    </h1>
    <div
      v-if="urlCard.co && urlCard.co !== '' && urlCard.co !== 'undefined'"
      class="flex flex-row justify-between w-content gap-4 items-center cursor-pointer"
    >
      <p class="font-bold text-3xl text-contrast">
        {{ urlCard.co }}
      </p>
      <UIcon name="i-lucide-building" size="x-large" />
    </div>

    <p
      v-if="
        urlCard.title && urlCard.title !== '' && urlCard.title !== 'undefined'
      "
      class="font-bold text-2xl text-contrast"
    >
      {{ urlCard?.title }}
    </p>

    <div
      v-if="urlCard.email && urlCard.email !== ''"
      class="flex flex-row justify-between w-content gap-4 items-center cursor-pointer"
    >
      <a
        :href="`mailto:${urlCard.email}`"
        class="flex flex-row justify-between w-content gap-4 items-center cursor-pointer"
      >
        <p class="font-bold text-2xl text-contrast text-(--ui-primary)">
          {{ urlCard.email }}
        </p>
        <UIcon name="i-lucide-mail" size="large" class="text-(--ui-primary)" />
      </a>
    </div>
    <div
      v-if="urlCard.phone && urlCard.phone !== ''"
      class="flex flex-row justify-between w-content gap-4 items-center cursor-pointer"
    >
      <a
        :href="`tel:${urlCard.phone}`"
        class="flex flex-row justify-between w-content gap-4 items-center cursor-pointer"
      >
        <p class="font-bold text-2xl text-(--ui-primary)">
          {{ urlCard.phone }}
        </p>
        <UIcon name="i-lucide-phone" size="large" class="text-(--ui-primary)" />
      </a>
    </div>
  </div>
</template>

<style></style>
