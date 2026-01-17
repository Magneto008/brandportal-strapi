export const populateSections = {
  on: {
    "section.page-header-section": {
      populate: "*",
    },
    "section.small-heading-section": {
      populate: "*",
    },
    "section.editorial-text-section": {
      populate: "*",
    },
    "section.text-section": {
      populate: "*",
    },
    "section.divider-section": {
      populate: "*",
    },
    "section.anchor-section": {
      populate: "*",
    },
    "section.accordion-start": {
      populate: "*",
    },
    "section.accordion-end": {
      populate: "*",
    },
    "section.list-section": {
      populate: "*",
    },
    "section.column-table": {
      populate: "*",
    },
    "section.markdown-section": {
      fields: ["title", "content", "maxWidth", "centered"],
    },
    "section.row-list-section": {
      populate: {
        items: true,
      },
    },
    "section.stacked-card-section": {
      populate: {
        cards: {
          populate: {
            image: true,
            ctaButton: true,
          },
        },
      },
    },
    "section.column-with-list": {
      populate: {
        columns: {
          populate: {
            groups: {
              populate: {
                items: true,
              },
            },
          },
        },
      },
    },
    "section.icon-link-section": {
      populate: {
        links: true,
      },
    },
    "section.downloads-section": {
      populate: {
        downloads: {
          populate: ["file"],
        },
      },
    },
    "section.image-section": {
      populate: ["image"],
    },
    "section.image-slider": {
      populate: {
        images: true,
      },
    },
    "section.image-info": {
      populate: {
        image: true,
        items: {
          populate: {
            list: true,
          },
        },
      },
    },
    "section.video-section": {
      populate: ["video"],
    },
    "section.card-items-section": {
      populate: {
        cards: {
          populate: ["image"],
        },
      },
    },
  },
};
