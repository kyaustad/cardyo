<script lang="ts" setup>
import { useClipboard } from "#imports";

const { url = "waiting" } = defineProps<{
  url?: string;
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
</script>

<template>
  <div
    class="flex flex-col items-center place-items-center justify-center w-full"
  >
    <Qrcode id="QRcode" :value="url" class="w-[90%] h-[90%]" variant="circle" />

    <div class="flex flex-row justify-between p-1 w-[90%] items-center">
      <UButton
        icon="i-lucide-download"
        variant="outline"
        label="Download QR Code"
        size="xs"
        @click="downloadSVG"
      />
      <UPopover>
        <UButton
          size="xs"
          icon="i-lucide-link"
          label="Copy Card Link"
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
