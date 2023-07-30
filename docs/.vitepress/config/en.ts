import { defineConfig } from "vitepress";

// https://vitepress.dev/reference/site-config
export default defineConfig({
  title: "Vue Babylonjs-101",
  description: "基于Vue的babylonjs-101教程",
  lang: "en",

  themeConfig: {
    i18nRouting: true,

    // https://vitepress.dev/reference/default-theme-config
    nav: [
      { text: "Home", link: "/en/" },
      { text: "babylonjs-101", link: "/en/babylonjs-101/BasicScene" },
      { text: "Vitepress Examples", link: "/en/vitepress-examples" },
    ],

    sidebar: {
      "babylonjs-101": [
        {
          text: "foreword",
          items: [],
        },
      ],
    },

    socialLinks: [
      { icon: "github", link: "https://github.com/vuejs/vitepress" },
    ],
  },
});
