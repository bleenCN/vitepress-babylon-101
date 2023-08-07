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
      {
        text: "babylonjs-101",
        link: "/zh/babylonjs-101/00-preface/",
        activeMatch: "^/zh/babylonjs-101",
      },
      {
        text: "Vitepress Examples",
        link: "/zh/vitepress-examples/markdown-examples",
      },
    ],

    sidebar: {
      "/zh/babylonjs-101": [
        {
          items: [
            { text: "前言", link: "/zh/babylonjs-101/00-preface/" },
            {
              text: "01 基础场景",
              link: "/zh/babylonjs-101/01-basic-scene/",
            },
            {
              text: "02 使用标准材质",
              link: "/zh/babylonjs-101/02-standard-materials/",
            },
            {
              text: "03 使用PBR材质",
              link: "/zh/babylonjs-101/03-PBR-materials/",
            },
            {
              text: "04 加载模型",
              link: "/zh/babylonjs-101/04-custom-models/",
            },
            {
              text: "05 动态光影",
              link: "/zh/babylonjs-101/05-lights-shadows/",
            },
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
      {
        icon: "github",
        link: "https://github.com/bleenCN/vitepress-babylon-101.git",
      },
    ],
  },
});
