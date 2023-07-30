import { defineConfig } from "vitepress";

// https://vitepress.dev/reference/site-config
export default defineConfig({
  title: "Vue Babylonjs-101",
  description: "基于Vue的babylonjs-101教程",
  lang: "zh",

  themeConfig: {
    i18nRouting: true,

    // https://vitepress.dev/reference/default-theme-config
    nav: [
      { text: "Home", link: "/zh/" },
      { text: "babylonjs-101", link: "/zh/babylonjs-101/BasicScene" },
      {
        text: "Vitepress Examples",
        link: "/zh/vitepress-examples/markdown-examples",
      },
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
      "/zh/vitepress-examples": [
        {
          text: "文档编写教程",
          items: [
            {
              text: "md文档使用",
              link: "/zh/vitepress-examples/markdown-examples",
            },
            {
              text: "vitepress API 使用",
              link: "/zh/vitepress-examples/api-examples",
            },
          ],
        },
      ],
    },

    socialLinks: [
      { icon: "github", link: "https://github.com/vuejs/vitepress" },
    ],
  },
});
