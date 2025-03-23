<script lang="ts" setup>
import type { Card } from "~~/types/card";

const appConfig = useAppConfig();
const baseURL = ref("");

const newCard = ref<Card>({
  color: appConfig.ui.colors.primary,
  fName: "",
  lName: "",
  email: "",
  phone: "",
  co: "",
  avatar: "",
  title: "",
});

const url = computed(() => {
  const avatarStr =
    newCard.value.avatar && newCard.value.avatar !== ""
      ? `&avatar=${newCard.value.avatar}`
      : "";
  return `${baseURL.value}?color=${
    appConfig.ui.colors.primary
  }&type=view&fName=${formatFName()}&lName=${formatLName()}${avatarStr}&email=${
    newCard.value.email
  }&phone=${newCard.value.phone}&co=${formatCompany()}&title=${formatTitle()}`;
});

const formatEmail = () => {
  if (newCard.value.email) {
    newCard.value.email = newCard.value.email.replace(/ /g, "");
  }
};
const formatCompany = () => {
  if (newCard.value.co) {
    return newCard.value.co.replace(/ /g, "%20");
  }
};
const formatTitle = () => {
  if (newCard.value.title) {
    return newCard.value.title.replace(/ /g, "%20");
  }
};
const formatFName = () => {
  if (newCard.value.fName) {
    return newCard.value.fName.replace(/ /g, "%20");
  }
};
const formatLName = () => {
  if (newCard.value.lName) {
    return newCard.value.lName.replace(/ /g, "%20");
  }
};

watch(
  () => appConfig.ui.colors.primary,
  (newColor) => {
    newCard.value.color = newColor;
    console.log("Color Changed!");
  }
);

onMounted(() => {
  baseURL.value = window.location.href;
});
</script>

<template>
  <div class="flex flex-col justify-between gap-4 w-full">
    <QRCode :url />
    <h1 class="font-bold text-5xl text-(--ui-primary)">Create A Card</h1>

    <UForm
      :state="newCard"
      class="w-full flex flex-col gap-3"
      @submit="console.log('NewCard:', newCard)"
    >
      <UFormField label="First Name" name="fName" class="w-full">
        <UInput v-model="newCard.fName" class="w-full" />
      </UFormField>
      <UFormField label="Last Name" name="lName" class="w-full">
        <UInput v-model="newCard.lName" class="w-full" />
      </UFormField>
      <UFormField label="Avatar " name="avatar" class="w-full">
        <p class="text-xs text-gray-400 pb-1">Link to an image</p>
        <UInput v-model="newCard.avatar" class="w-full" />
      </UFormField>
      <UFormField label="Company" name="co" class="w-full">
        <UInput v-model="newCard.co" class="w-full" />
      </UFormField>
      <UFormField label="Title" name="title" class="w-full">
        <UInput v-model="newCard.title" class="w-full" />
      </UFormField>
      <UFormField label="Email" name="email" class="w-full">
        <UInput v-model="newCard.email" class="w-full" @change="formatEmail" />
      </UFormField>
      <UFormField label="Phone" name="email" class="w-full">
        <p class="text-xs text-gray-400 pb-1">10 Digit Phone Number</p>
        <UInput
          v-model="newCard.phone"
          :maxLength="10"
          type="tel"
          label="Phone"
          name="phone"
          class="w-full"
          @change="newCard.phone = newCard.phone.replace(/\D/g, '')"
        />
      </UFormField>

      <UButton type="submit" label="Submit" />
    </UForm>
  </div>
</template>

<style></style>
