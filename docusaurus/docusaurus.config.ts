import { themes as prismThemes } from "prism-react-renderer";
import type { Config } from "@docusaurus/types";
import type * as Preset from "@docusaurus/preset-classic";

const config: Config = {
  title: "ワーク原理主義",
  tagline: "日々の無意味な実践",
  favicon: "img/favicon.ico",

  url: "https://nakawodayo.github.io",
  baseUrl: "/work-principle/",

  organizationName: "nakawodayo",
  projectName: "work-principle",

  onBrokenLinks: "throw",
  onBrokenMarkdownLinks: "warn",

  plugins: [
    [
      "@docusaurus/plugin-client-redirects",
      {
        redirects: [
          {
            to: "/work-principle/docs", // リダイレクト先
            from: "/", // リダイレクト元
          },
        ],
      },
    ],
  ],

  i18n: {
    defaultLocale: "ja",
    locales: ["ja"],
  },

  presets: [
    [
      "classic",
      {
        docs: {
          sidebarPath: "./sidebars.ts",
          editUrl: "https://github.com/nakawodayo/work-principle/tree/main/",
        },
        // blog: false,
        theme: {
          customCss: "./src/css/custom.css",
        },
      } satisfies Preset.Options,
    ],
  ],

  themeConfig: {
    image: "img/docusaurus-social-card.jpg",
    navbar: {
      title: "ワーク原理主義",
      logo: {
        alt: "Work Principle Logo",
        src: "img/logo.svg",
      },
      items: [
        {
          type: "docSidebar",
          sidebarId: "tutorialSidebar",
          position: "left",
          label: "Docs",
        },
        {
          to: "/blog",
          label: "Blog",
          position: "left",
        },
        {
          href: "https://github.com/nakawodayo/work-principle",
          label: "GitHub",
          position: "right",
        },
      ],
    },
    footer: {
      style: "dark",
      links: [
        {
          title: "Docs",
          items: [
            {
              label: "Docs",
              to: "/docs/",
            },
          ],
        },
        {
          title: "Community",
          items: [
            {
              label: "Discord",
              href: "https://discord.gg/XBt9Wr7Emu",
            },
            {
              html: "<span>Instagram (coming soon...)</span>",
            },
          ],
        },
        {
          title: "散策者",
          items: [
            {
              label: "HP",
              href: "https://sansakusya.com/",
            },
            {
              label: "X",
              href: "https://x.com/the_Sansakusya/",
            },
            {
              label: "Instagram",
              href: "https://www.instagram.com/the_sansakusya/",
            },
          ],
        },
        {
          title: "企画協力",
          items: [
            {
              label: "WAKABACHO WHARF",
              href: "https://wharf-site.amebaownd.com/",
            },
          ],
        },
        {
          title: "More",
          items: [
            {
              label: "GitHub",
              href: "https://github.com/nakawodayo/work-principle",
            },
          ],
        },
      ],
      copyright: `Copyright © ${new Date().getFullYear()} ワーク原理主義.`,
    },
    prism: {
      theme: prismThemes.github,
      darkTheme: prismThemes.dracula,
    },
  } satisfies Preset.ThemeConfig,
};

export default config;
