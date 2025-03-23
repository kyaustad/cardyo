<script setup lang="ts">
import colors from "tailwindcss/colors";
import { omit } from "#ui/utils";

const appConfig = useAppConfig();

const neutralColors = ["slate", "gray", "zinc", "neutral", "stone"];

const colorsToOmit = [
  "inherit",
  "current",
  "transparent",
  "black",
  "white",
  ...neutralColors,
];
// eslint-disable-next-line @typescript-eslint/no-explicit-any
const primaryColors = Object.keys(omit(colors, colorsToOmit as any));
const primary = computed({
  get() {
    return appConfig.ui.colors.primary;
  },
  set(option) {
    appConfig.ui.colors.primary = option;

    window.localStorage.setItem("nuxt-ui-primary", appConfig.ui.colors.primary);
  },
});

function handleColorChange(color: string) {
  primary.value = color;
}
</script>

<template>
  <UPopover :ui="{ content: 'w-72 px-6 py-4 flex flex-col gap-4' }">
    <template #default="{ open }">
      <UButton
        icon="i-lucide-swatch-book"
        color="primary"
        :variant="open ? 'ghost' : 'soft'"
        size="lg"
        class="absolute right-20 top-4 cursor-pointer transition-all ease-in-out hover:scale-105 active:scale-95"
        aria-label="Color picker"
        :ui="{ leadingIcon: 'text-(--ui-primary)' }"
      />
    </template>

    <template #content>
      <fieldset>
        <legend class="text-[11px] leading-none font-semibold mb-2">
          Primary
        </legend>

        <div class="grid grid-cols-3 gap-1 -mx-2">
          <ButtonsThemePickerButton
            v-for="color in primaryColors"
            :key="color"
            :label="color"
            :chip="color"
            :selected="primary === color"
            @click="handleColorChange(color)"
          />
        </div>
      </fieldset>
    </template>
  </UPopover>
</template>
