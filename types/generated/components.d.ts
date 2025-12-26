import type { Schema, Struct } from '@strapi/strapi';

export interface AccordionAccordionDivider extends Struct.ComponentSchema {
  collectionName: 'components_accordion_accordion_dividers';
  info: {
    displayName: 'Accordion-Divider';
  };
  attributes: {
    marginBottom: Schema.Attribute.Integer;
    marginTop: Schema.Attribute.Integer;
    style: Schema.Attribute.Enumeration<['line', 'space']>;
  };
}

export interface AccordionAccordionImage extends Struct.ComponentSchema {
  collectionName: 'components_accordion_accordion_images';
  info: {
    displayName: 'Accordion-Image';
  };
  attributes: {
    image: Schema.Attribute.Media<'images'>;
  };
}

export interface AccordionAccordionItem extends Struct.ComponentSchema {
  collectionName: 'components_accordion_accordion_items';
  info: {
    displayName: 'Accordion-Item';
  };
  attributes: {
    title: Schema.Attribute.String & Schema.Attribute.Required;
  };
}

export interface AccordionAccordionText extends Struct.ComponentSchema {
  collectionName: 'components_accordion_accordion_texts';
  info: {
    displayName: 'Accordion-Text';
  };
  attributes: {
    content: Schema.Attribute.RichText;
  };
}

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
    image: Schema.Attribute.Media<'images'>;
    infoItems: Schema.Attribute.JSON;
    infoTitle: Schema.Attribute.String &
      Schema.Attribute.DefaultTo<'Additional Information'>;
    title: Schema.Attribute.String;
    url: Schema.Attribute.String;
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

export interface SectionAccordionHeader extends Struct.ComponentSchema {
  collectionName: 'components_section_accordion_headers';
  info: {
    displayName: 'accordion-header';
  };
  attributes: {
    title: Schema.Attribute.String & Schema.Attribute.Required;
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

export interface SectionImageSection extends Struct.ComponentSchema {
  collectionName: 'components_section_image_sections';
  info: {
    displayName: 'image-section';
    icon: 'landscape';
  };
  attributes: {
    image: Schema.Attribute.Media<'images'>;
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

export interface SectionVideoSection extends Struct.ComponentSchema {
  collectionName: 'components_section_video_sections';
  info: {
    displayName: 'video-section';
  };
  attributes: {
    video: Schema.Attribute.Media<'videos'>;
  };
}

declare module '@strapi/strapi' {
  export module Public {
    export interface ComponentSchemas {
      'accordion.accordion-divider': AccordionAccordionDivider;
      'accordion.accordion-image': AccordionAccordionImage;
      'accordion.accordion-item': AccordionAccordionItem;
      'accordion.accordion-text': AccordionAccordionText;
      'content.auth-actions': ContentAuthActions;
      'content.card': ContentCard;
      'content.card-with-info': ContentCardWithInfo;
      'content.footer-item': ContentFooterItem;
      'content.language-item': ContentLanguageItem;
      'content.login-page-header': ContentLoginPageHeader;
      'content.nav-items': ContentNavItems;
      'section.accordion-header': SectionAccordionHeader;
      'section.divider-section': SectionDividerSection;
      'section.editorial-text-section': SectionEditorialTextSection;
      'section.image-section': SectionImageSection;
      'section.page-header-section': SectionPageHeaderSection;
      'section.video-section': SectionVideoSection;
    }
  }
}
