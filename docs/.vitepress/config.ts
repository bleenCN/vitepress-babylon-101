import { defineConfig } from "vitepress";

// https://vitepress.dev/reference/site-config
export default defineConfig({
  title: "Vue Babylonjs-101",
  description: "基于Vue的babylonjs-101教程",
  srcDir: "./src",
  lang: "zh",

  locales: {
    zh: {
      label: "中文",
      lang: "zh",
      dir: "zh",
    },
    en: {
      label: "English",
      lang: "en",
      dir: "en",
    },
  },

  themeConfig: {
    i18nRouting: true,

    // https://vitepress.dev/reference/default-theme-config
    nav: [
      { text: "Home", link: "/" },
      { text: "babylonjs-101", link: "/babylonjs-101/BasicScene" },
      { text: "Vitepress Examples", link: "/vitepress-examples" },
    ],

    sidebar: {
      "babylonjs-101": [
        {
          text: "前言",
          items: [
            { text: "md文档使用", link: "/markdown-examples" },
            { text: "vitepress API 使用", link: "/api-examples" },
          ],
        },
      ],
      "vitepress-examples": [
        {
          text: "文档编写教程",
          items: [
            { text: "md文档使用", link: "/markdown-examples" },
            { text: "vitepress API 使用", link: "/api-examples" },
          ],
        },
      ],
    },

    socialLinks: [
      { icon: "github", link: "https://github.com/vuejs/vitepress" },
    ],
  },
});
