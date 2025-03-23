export default defineAppConfig({
  // https://ui3.nuxt.dev/getting-started/theme#design-system
  ui: {
    colors: {
      primary: "emerald",
      neutral: "zinc",
    },
    button: {
      slots: {
        base: "rounded-none border-none",
      },
      defaultVariants: {
        // Set default button color to neutral
        // color: 'neutral'
      },
    },
  },
});
