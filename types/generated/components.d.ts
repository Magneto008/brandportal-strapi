import type { Schema, Struct } from '@strapi/strapi';

export interface ContentAuthActions extends Struct.ComponentSchema {
  collectionName: 'components_content_auth_actions';
  info: {
    displayName: 'authActions';
  };
  attributes: {
    label: Schema.Attribute.String;
    order: Schema.Attribute.Integer;
    requiresAuth: Schema.Attribute.Boolean & Schema.Attribute.DefaultTo<false>;
    type: Schema.Attribute.Enumeration<['login', 'logout']>;
    visible: Schema.Attribute.Boolean & Schema.Attribute.DefaultTo<true>;
  };
}

export interface ContentCard extends Struct.ComponentSchema {
  collectionName: 'components_content_cards';
  info: {
    displayName: 'card';
  };
  attributes: {
    ctaLabel: Schema.Attribute.String;
    description: Schema.Attribute.Text;
    image: Schema.Attribute.Media<'images'>;
    imageAlt: Schema.Attribute.String;
    isFeatured: Schema.Attribute.Boolean;
    title: Schema.Attribute.String;
    url: Schema.Attribute.String;
  };
}

export interface ContentCardWithInfo extends Struct.ComponentSchema {
  collectionName: 'components_content_card_with_infos';
  info: {
    displayName: 'card-with-info';
  };
  attributes: {
    ctaLabel: Schema.Attribute.String;
    ctaVariant: Schema.Attribute.Enumeration<['link', 'download']> &
      Schema.Attribute.DefaultTo<'link'>;
    image: Schema.Attribute.Media<'images'>;
    infoItems: Schema.Attribute.JSON;
    infoTitle: Schema.Attribute.String &
      Schema.Attribute.DefaultTo<'Additional Information'>;
    title: Schema.Attribute.String;
    url: Schema.Attribute.String;
  };
}

export interface ContentDownloadItem extends Struct.ComponentSchema {
  collectionName: 'components_content_download_items';
  info: {
    displayName: 'download-item';
  };
  attributes: {
    file: Schema.Attribute.Media<'files'>;
    fileTypes: Schema.Attribute.String;
    title: Schema.Attribute.String;
    versions: Schema.Attribute.String;
  };
}

export interface ContentFooterItem extends Struct.ComponentSchema {
  collectionName: 'components_content_footer_items';
  info: {
    displayName: 'footerItem';
  };
  attributes: {
    externalLink: Schema.Attribute.String;
    label: Schema.Attribute.String;
  };
}

export interface ContentLanguageItem extends Struct.ComponentSchema {
  collectionName: 'components_content_language_items';
  info: {
    displayName: 'languageItem';
  };
  attributes: {
    countryCode: Schema.Attribute.String;
    label: Schema.Attribute.String;
    order: Schema.Attribute.Integer;
  };
}

export interface ContentList extends Struct.ComponentSchema {
  collectionName: 'components_content_lists';
  info: {
    displayName: 'list';
  };
  attributes: {
    listItem: Schema.Attribute.String;
  };
}

export interface ContentLoginPageHeader extends Struct.ComponentSchema {
  collectionName: 'components_content_login_page_headers';
  info: {
    displayName: 'login-page-header';
  };
  attributes: {
    subtitle: Schema.Attribute.String;
    title: Schema.Attribute.String & Schema.Attribute.Required;
  };
}

export interface ContentMarketConfig extends Struct.ComponentSchema {
  collectionName: 'components_content_market_configs';
  info: {
    displayName: 'Market Config';
    icon: 'bulletList';
  };
  attributes: {
    markets: Schema.Attribute.JSON;
  };
}

export interface ContentNavItems extends Struct.ComponentSchema {
  collectionName: 'components_content_nav_items';
  info: {
    displayName: 'navItem';
  };
  attributes: {
    href: Schema.Attribute.String;
    label: Schema.Attribute.String;
    order: Schema.Attribute.Integer;
    requiresAuth: Schema.Attribute.Boolean & Schema.Attribute.DefaultTo<false>;
    visible: Schema.Attribute.Boolean & Schema.Attribute.DefaultTo<true>;
  };
}

export interface ContentStackedCard extends Struct.ComponentSchema {
  collectionName: 'components_content_stacked_cards';
  info: {
    displayName: 'stacked-card';
  };
  attributes: {
    content: Schema.Attribute.RichText;
    ctaButton: Schema.Attribute.Component<'shared.icon-link', true>;
    image: Schema.Attribute.Media<'images'> & Schema.Attribute.Required;
    secondaryContent: Schema.Attribute.RichText;
    secondaryTitle: Schema.Attribute.String;
    title: Schema.Attribute.String;
  };
}

export interface SectionAccordionEnd extends Struct.ComponentSchema {
  collectionName: 'components_section_accordion_ends';
  info: {
    displayName: 'accordion-end';
  };
  attributes: {};
}

export interface SectionAccordionStart extends Struct.ComponentSchema {
  collectionName: 'components_section_accordion_starts';
  info: {
    displayName: 'accordion-start';
  };
  attributes: {
    title: Schema.Attribute.String & Schema.Attribute.Required;
  };
}

export interface SectionAnchorSection extends Struct.ComponentSchema {
  collectionName: 'components_section_anchor_sections';
  info: {
    displayName: 'anchor-section';
  };
  attributes: {
    label: Schema.Attribute.String & Schema.Attribute.Required;
  };
}

export interface SectionCardItemsSection extends Struct.ComponentSchema {
  collectionName: 'components_section_card_items_sections';
  info: {
    displayName: 'card-items-section';
  };
  attributes: {
    cards: Schema.Attribute.Component<'content.card-with-info', true>;
  };
}

export interface SectionColumnTable extends Struct.ComponentSchema {
  collectionName: 'components_section_column_tables';
  info: {
    displayName: 'Column Table';
  };
  attributes: {
    columns: Schema.Attribute.Enumeration<['two', 'stacked']>;
    leftColumnLabel: Schema.Attribute.String;
    rightColumnLabel: Schema.Attribute.String;
    rows: Schema.Attribute.Component<'shared.rows', true>;
  };
}

export interface SectionColumnWithList extends Struct.ComponentSchema {
  collectionName: 'components_section_column_with_lists';
  info: {
    displayName: 'Column With List';
  };
  attributes: {
    columns: Schema.Attribute.Component<'ui.spec-column', true>;
    columnsPerRow: Schema.Attribute.Enumeration<['two', 'three', 'four']>;
  };
}

export interface SectionDividerSection extends Struct.ComponentSchema {
  collectionName: 'components_section_divider_sections';
  info: {
    displayName: 'divider-section';
  };
  attributes: {
    marginBottom: Schema.Attribute.Integer;
    marginTop: Schema.Attribute.Integer;
    style: Schema.Attribute.Enumeration<['line', 'space']> &
      Schema.Attribute.DefaultTo<'line'>;
  };
}

export interface SectionDownloadsSection extends Struct.ComponentSchema {
  collectionName: 'components_section_downloads_sections';
  info: {
    displayName: 'downloads-section';
  };
  attributes: {
    downloads: Schema.Attribute.Component<'content.download-item', true>;
    title: Schema.Attribute.String;
  };
}

export interface SectionEditorialTextSection extends Struct.ComponentSchema {
  collectionName: 'components_section_editorial_text_sections';
  info: {
    displayName: 'editorial-text-section';
    icon: 'pencil';
  };
  attributes: {
    content: Schema.Attribute.RichText;
  };
}

export interface SectionIconLinkSection extends Struct.ComponentSchema {
  collectionName: 'components_section_icon_link_sections';
  info: {
    displayName: 'Icon Link Section';
  };
  attributes: {
    layout: Schema.Attribute.Enumeration<['single', 'grid']> &
      Schema.Attribute.DefaultTo<'single'>;
    links: Schema.Attribute.Component<'shared.icon-link', true>;
    title: Schema.Attribute.String;
  };
}

export interface SectionImageInfo extends Struct.ComponentSchema {
  collectionName: 'components_section_image_infos';
  info: {
    displayName: 'Image Info';
  };
  attributes: {
    image: Schema.Attribute.Media<'images'> & Schema.Attribute.Required;
    imagePosition: Schema.Attribute.Enumeration<['left', 'right']>;
    items: Schema.Attribute.Component<'shared.image-info-item', true>;
  };
}

export interface SectionImageSection extends Struct.ComponentSchema {
  collectionName: 'components_section_image_sections';
  info: {
    displayName: 'image-section';
    icon: 'landscape';
  };
  attributes: {
    image: Schema.Attribute.Media<'images', true>;
    layout: Schema.Attribute.Enumeration<['grid', 'inline', 'small-grid']> &
      Schema.Attribute.DefaultTo<'grid'>;
  };
}

export interface SectionImageSlider extends Struct.ComponentSchema {
  collectionName: 'components_section_image_sliders';
  info: {
    displayName: 'Image slider';
  };
  attributes: {
    images: Schema.Attribute.Media<'images', true> & Schema.Attribute.Required;
  };
}

export interface SectionListSection extends Struct.ComponentSchema {
  collectionName: 'components_section_list_sections';
  info: {
    displayName: 'list-section';
  };
  attributes: {
    items: Schema.Attribute.Component<'content.list', true>;
    title: Schema.Attribute.String;
  };
}

export interface SectionMarkdownSection extends Struct.ComponentSchema {
  collectionName: 'components_section_markdown_sections';
  info: {
    displayName: 'Markdown Section';
  };
  attributes: {
    centered: Schema.Attribute.Boolean & Schema.Attribute.DefaultTo<false>;
    content: Schema.Attribute.RichText;
    maxWidth: Schema.Attribute.Enumeration<['narrow', 'normal', 'wide']>;
    title: Schema.Attribute.String;
  };
}

export interface SectionPageHeaderSection extends Struct.ComponentSchema {
  collectionName: 'components_section_page_header_sections';
  info: {
    displayName: 'page-header-section';
    icon: 'bulletList';
  };
  attributes: {
    title: Schema.Attribute.String;
  };
}

export interface SectionRowListSection extends Struct.ComponentSchema {
  collectionName: 'components_section_row_list_sections';
  info: {
    displayName: 'Row List Section';
  };
  attributes: {
    items: Schema.Attribute.Component<'shared.row-list-item', true>;
    title: Schema.Attribute.String;
  };
}

export interface SectionSmallHeadingSection extends Struct.ComponentSchema {
  collectionName: 'components_section_small_heading_sections';
  info: {
    displayName: 'small-heading-section';
  };
  attributes: {
    level: Schema.Attribute.Enumeration<['h2', 'h3', 'h4']> &
      Schema.Attribute.DefaultTo<'h3'>;
    text: Schema.Attribute.String;
  };
}

export interface SectionStackedCardSection extends Struct.ComponentSchema {
  collectionName: 'components_section_stacked_card_sections';
  info: {
    displayName: 'stacked-card-section';
  };
  attributes: {
    cards: Schema.Attribute.Component<'content.stacked-card', true>;
    layout: Schema.Attribute.Enumeration<['two', 'three']> &
      Schema.Attribute.DefaultTo<'two'>;
  };
}

export interface SectionTextSection extends Struct.ComponentSchema {
  collectionName: 'components_section_text_sections';
  info: {
    displayName: 'Text Section';
  };
  attributes: {
    content: Schema.Attribute.RichText & Schema.Attribute.Required;
    textSize: Schema.Attribute.Enumeration<['small', 'medium', 'large']> &
      Schema.Attribute.DefaultTo<'medium'>;
    title: Schema.Attribute.String;
    variant: Schema.Attribute.Enumeration<['normal', 'gray']> &
      Schema.Attribute.DefaultTo<'normal'>;
  };
}

export interface SectionVideoSection extends Struct.ComponentSchema {
  collectionName: 'components_section_video_sections';
  info: {
    displayName: 'video-section';
  };
  attributes: {
    video: Schema.Attribute.Media<'videos'>;
  };
}

export interface SharedFormField extends Struct.ComponentSchema {
  collectionName: 'components_shared_form_fields';
  info: {
    displayName: 'form-field';
    icon: 'bulletList';
  };
  attributes: {
    label: Schema.Attribute.String;
    name: Schema.Attribute.String;
    placeholder: Schema.Attribute.String;
    required: Schema.Attribute.Boolean;
    type: Schema.Attribute.Enumeration<['text', 'email', 'password']>;
  };
}

export interface SharedIconLink extends Struct.ComponentSchema {
  collectionName: 'components_shared_icon_links';
  info: {
    displayName: 'icon-link';
  };
  attributes: {
    icon: Schema.Attribute.Enumeration<
      ['download', 'chevron-right', 'external', 'arrow-right']
    >;
    label: Schema.Attribute.String & Schema.Attribute.Required;
    url: Schema.Attribute.Text & Schema.Attribute.Required;
  };
}

export interface SharedImageInfoItem extends Struct.ComponentSchema {
  collectionName: 'components_shared_image_info_items';
  info: {
    displayName: 'Image Info Item';
  };
  attributes: {
    content: Schema.Attribute.RichText;
    list: Schema.Attribute.Component<'content.list', true>;
    title: Schema.Attribute.String;
  };
}

export interface SharedRowListItem extends Struct.ComponentSchema {
  collectionName: 'components_shared_row_list_items';
  info: {
    displayName: 'rowListItem';
  };
  attributes: {
    content: Schema.Attribute.RichText;
    title: Schema.Attribute.String;
  };
}

export interface SharedRows extends Struct.ComponentSchema {
  collectionName: 'components_shared_rows';
  info: {
    displayName: 'rows';
  };
  attributes: {
    content: Schema.Attribute.RichText;
    label: Schema.Attribute.String;
  };
}

export interface UiForm extends Struct.ComponentSchema {
  collectionName: 'components_ui_forms';
  info: {
    displayName: 'form';
    icon: 'bulletList';
  };
  attributes: {
    fields: Schema.Attribute.Component<'shared.form-field', true>;
    formTitle: Schema.Attribute.String;
    submitLabel: Schema.Attribute.String;
    successMessage: Schema.Attribute.String;
  };
}

export interface UiSpecColumn extends Struct.ComponentSchema {
  collectionName: 'components_ui_spec_columns';
  info: {
    displayName: 'spec-column';
  };
  attributes: {
    groups: Schema.Attribute.Component<'ui.spec-group', true>;
    title: Schema.Attribute.String;
  };
}

export interface UiSpecGroup extends Struct.ComponentSchema {
  collectionName: 'components_ui_spec_groups';
  info: {
    displayName: 'spec-group';
  };
  attributes: {
    items: Schema.Attribute.Component<'ui.spec-item', true>;
    title: Schema.Attribute.String;
  };
}

export interface UiSpecItem extends Struct.ComponentSchema {
  collectionName: 'components_ui_spec_items';
  info: {
    displayName: 'spec-item';
  };
  attributes: {
    text: Schema.Attribute.String;
  };
}

declare module '@strapi/strapi' {
  export module Public {
    export interface ComponentSchemas {
      'content.auth-actions': ContentAuthActions;
      'content.card': ContentCard;
      'content.card-with-info': ContentCardWithInfo;
      'content.download-item': ContentDownloadItem;
      'content.footer-item': ContentFooterItem;
      'content.language-item': ContentLanguageItem;
      'content.list': ContentList;
      'content.login-page-header': ContentLoginPageHeader;
      'content.market-config': ContentMarketConfig;
      'content.nav-items': ContentNavItems;
      'content.stacked-card': ContentStackedCard;
      'section.accordion-end': SectionAccordionEnd;
      'section.accordion-start': SectionAccordionStart;
      'section.anchor-section': SectionAnchorSection;
      'section.card-items-section': SectionCardItemsSection;
      'section.column-table': SectionColumnTable;
      'section.column-with-list': SectionColumnWithList;
      'section.divider-section': SectionDividerSection;
      'section.downloads-section': SectionDownloadsSection;
      'section.editorial-text-section': SectionEditorialTextSection;
      'section.icon-link-section': SectionIconLinkSection;
      'section.image-info': SectionImageInfo;
      'section.image-section': SectionImageSection;
      'section.image-slider': SectionImageSlider;
      'section.list-section': SectionListSection;
      'section.markdown-section': SectionMarkdownSection;
      'section.page-header-section': SectionPageHeaderSection;
      'section.row-list-section': SectionRowListSection;
      'section.small-heading-section': SectionSmallHeadingSection;
      'section.stacked-card-section': SectionStackedCardSection;
      'section.text-section': SectionTextSection;
      'section.video-section': SectionVideoSection;
      'shared.form-field': SharedFormField;
      'shared.icon-link': SharedIconLink;
      'shared.image-info-item': SharedImageInfoItem;
      'shared.row-list-item': SharedRowListItem;
      'shared.rows': SharedRows;
      'ui.form': UiForm;
      'ui.spec-column': UiSpecColumn;
      'ui.spec-group': UiSpecGroup;
      'ui.spec-item': UiSpecItem;
    }
  }
}
