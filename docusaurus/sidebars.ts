import type { SidebarsConfig } from "@docusaurus/plugin-content-docs";

const sidebars: SidebarsConfig = {
  tutorialSidebar: [
    {
      type: "doc",
      id: "index",
      label: "ワーク原理主義とは",
    },
    {
      type: "category",
      label: "ワーク原理主義宣言",
      items: ["ワーク原理主義宣言/current"],
    },
    {
      type: "category",
      label: "ガイドライン",
      items: [
        "クリエーションガイドライン/current",
        "振り返りガイドライン/current",
      ],
    },
    {
      type: "link",
      label: "ワークデータベース",
      href: "https://aerial-spleen-476.notion.site/1b18b57500e9805baad1e40abfb3d4fb?v=1b18b57500e9806e870b000c2799712b&pvs=4",
    },
  ],
};

export default sidebars;
