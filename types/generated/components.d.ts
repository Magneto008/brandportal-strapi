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
    displayName: 'Card';
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

declare module '@strapi/strapi' {
  export module Public {
    export interface ComponentSchemas {
      'content.auth-actions': ContentAuthActions;
      'content.card': ContentCard;
      'content.card-with-info': ContentCardWithInfo;
      'content.language-item': ContentLanguageItem;
      'content.nav-items': ContentNavItems;
    }
  }
}
