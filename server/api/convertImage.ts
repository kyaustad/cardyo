export default defineEventHandler(async (event) => {
  const { Buffer } = await import("buffer");

  const query = getQuery(event);
  const imageUrl = query.url as string;

  if (!imageUrl) {
    throw createError({ statusCode: 400, statusMessage: "Missing image URL" });
  }

  try {
    const response: ArrayBuffer = await $fetch(imageUrl, {
      responseType: "arrayBuffer",
    });
    const buffer = Buffer.from(new Uint8Array(response));
    const base64 = buffer.toString("base64");

    return { base64 };
  } catch (error) {
    console.log("error:", error);
    throw createError({
      statusCode: 500,
      statusMessage: "Failed to fetch image",
    });
  }
});
