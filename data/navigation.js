const toolsData = require("./tools");
const guidesData = require("./guides");

const { tools } = toolsData;
const { guides } = guidesData;

const navigationSections = [
  {
    type: "link",
    label: "Locations",
    href: "/locations",
  },
  {
    type: "menu",
    label: "Tools",
    href: "/tools",
    description: "Open the preserved calculator experiences.",
    align: "end",
    items: tools.map((tool) => ({
      label: tool.name,
      href: `/tools/${tool.slug}`,
      description: tool.description,
    })),
  },
  {
    type: "menu",
    label: "Guides",
    href: "/guides",
    description: "Read the core concepts behind the data.",
    align: "end",
    items: guides.map((guide) => ({
      label: guide.h1,
      href: `/guides/${guide.slug}`,
      description: guide.description,
    })),
  },
];

module.exports = {
  navigationSections,
};
