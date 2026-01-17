export type PageHeaderSection = {
  __component: "section.page-header-section";
  title: string;
};

export type SmallHeadingSection = {
  __component: "section.small-heading-section";
  text: string;
};

export type EditorialTextSection = {
  __component: "section.editorial-text-section";
  content: string;
};

export type TextSection = {
  __component: "section.text-section" | "section.markdown-section";
  title?: string;
  content?: string;
};

export type AnchorSection = {
  __component: "section.anchor-section";
  label: string;
};

export type ListSection = {
  __component: "section.list-section";
  title?: string;
  items?: { listItem: string }[];
};

export type RowListSection = {
  __component: "section.row-list-section";
  items?: { title?: string; content?: string }[];
};

export type ColumnWithListSection = {
  __component: "section.column-with-list";
  columns?: {
    title?: string;
    groups?: {
      title?: string;
      items?: { text: string }[];
    }[];
  }[];
};

export type ColumnTableSection = {
  __component: "section.column-table";
  leftColumnLabel?: string;
  rightColumnLabel?: string;
  rows?: { label?: string; content?: string }[];
};

export type CardItemsSection = {
  __component: "section.card-items-section";
  cards?: {
    title?: string;
    infoTitle?: string;
    infoItems?: string[];
  }[];
};

export type StackedCardSection = {
  __component: "section.stacked-card-section";
  cards?: {
    title?: string;
    content?: string;
    secondaryTitle?: string;
    secondaryContent?: string;
  }[];
};

export type DownloadsSection = {
  __component: "section.downloads-section";
  title?: string;
  downloads?: { title?: string }[];
};

export type IconLinkSection = {
  __component: "section.icon-link-section";
  title?: string;
  links?: { label?: string }[];
};

export type ImageInfoSection = {
  __component: "section.image-info";
  title?: string;
  content?: string;
};

export type AccordionStartSection = {
  __component: "section.accordion-start";
  title: string;
};

export type AccordionEndSection = {
  __component: "section.accordion-end";
};

export type NonSearchableSection = {
  __component: string;
};

export type SearchableSection =
  | PageHeaderSection
  | SmallHeadingSection
  | EditorialTextSection
  | TextSection
  | AnchorSection
  | ListSection
  | RowListSection
  | ColumnWithListSection
  | ColumnTableSection
  | CardItemsSection
  | StackedCardSection
  | DownloadsSection
  | IconLinkSection
  | ImageInfoSection
  | AccordionStartSection
  | AccordionEndSection;

