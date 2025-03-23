import { defineStore } from "pinia";
import type { Card } from "~~/types/card";

export const useCardStore = defineStore("Card", () => {
  const newCard = ref<Card>();

  return { newCard };
});
