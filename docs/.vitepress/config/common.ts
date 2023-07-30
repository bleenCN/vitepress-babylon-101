import { defineConfig } from "vitepress";

// https://vitepress.dev/reference/site-config
export default defineConfig({
  srcDir: "./src",
  cleanUrls: true,
  rewrites: {
    "/zh/": "/",
  },
});
