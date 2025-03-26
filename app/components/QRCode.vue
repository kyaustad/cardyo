<script lang="ts" setup>
import { useClipboard } from "#imports";
import type { Card } from "~~/types/card";
import VCard from "vcard-creator";

const { url = "waiting", card } = defineProps<{
  url?: string;
  card?: Card;
}>();

const { copy } = useClipboard({
  source: url,
  legacy: true,
});

const downloadSVG = () => {
  const svg = document.getElementById("QRcode") as HTMLElement;
  console.log(svg);
  const serializer = new XMLSerializer();
  let svgStr = serializer.serializeToString(svg);

  svgStr = svgStr.replace(/var\(--ui-text-highlighted\)/g, "white");

  const svgBlob = new Blob([svgStr], { type: "image/svg+xml" });
  const svgUrl = URL.createObjectURL(svgBlob);

  const img = new Image();

  img.onload = () => {
    const canvas = document.createElement("canvas");
    canvas.width = 512;
    canvas.height = 512;
    const ctx = canvas.getContext("2d");

    ctx?.drawImage(img, 0, 0, canvas.width, canvas.height);

    const pngUrl = canvas.toDataURL("image/webp");

    const link = document.createElement("a");
    link.href = pngUrl;
    link.download = "qr-code.webp";
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
    URL.revokeObjectURL(svgUrl);
  };
  img.src = svgUrl;
};

const copyToClipboard = async () => {
  copy(url);
};

async function fetchImageBase64(url: string): Promise<string | null> {
  try {
    const response = await $fetch(`/api/convertImage`, { params: { url } });
    return response.base64;
  } catch (error) {
    console.error("Failed to convert image:", error);
    return null;
  }
}

const downloadVCard = async () => {
  if (!card) {
    return;
  }

  let avatar64 = null;

  if (card.avatar) {
    avatar64 = await fetchImageBase64(card.avatar);
    console.log(avatar64);
  }
  const vcard = new VCard();

  vcard
    .addName(card.lName, card.fName)
    .addCompany(card.co as string)
    .addJobtitle(card.title as string)
    .addEmail(card.email as string)
    .addPhoneNumber(card.phone, "WORK");
  if (avatar64) {
    vcard.addPhoto(avatar64);
  } else if (!avatar64 && card.avatar) {
    vcard.addPhotoURL(card.avatar);
  }

  const blob = new Blob([vcard.toString()], { type: "text/vcard" });
  const downloadUrl = URL.createObjectURL(blob);

  const a = document.createElement("a");
  a.href = downloadUrl;
  a.download = `${card.fName}_${card.lName}.vcf`;
  document.body.appendChild(a);
  a.click();
  document.body.removeChild(a);
  URL.revokeObjectURL(downloadUrl);
};
</script>

<template>
  <div
    class="flex flex-col items-center place-items-center justify-center w-full"
  >
    <Qrcode id="QRcode" :value="url" class="w-[90%] h-[90%]" variant="circle" />

    <div class="flex flex-row justify-between p-1 w-[100%] items-center">
      <UButton
        icon="i-lucide-download"
        variant="outline"
        label="QR Code"
        size="xs"
        @click="downloadSVG"
      />
      <UButton
        v-if="card"
        icon="i-lucide-square-user-round"
        variant="outline"
        label="Contact (.vcf)"
        size="xs"
        @click="downloadVCard"
      />
      <UPopover>
        <UButton
          size="xs"
          icon="i-lucide-link"
          label="Copy Link"
          variant="outline"
          @click="copyToClipboard"
        />

        <template #content>
          <p>Card link copied to clipboard!</p>
        </template>
      </UPopover>
    </div>
  </div>
</template>

<style></style>
