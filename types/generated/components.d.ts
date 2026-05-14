import type { Schema, Struct } from '@strapi/strapi';

export interface MoodboardContent extends Struct.ComponentSchema {
  collectionName: 'components_moodboard_contents';
  info: {
    displayName: 'Content';
  };
  attributes: {
    CoverLink: Schema.Attribute.Media<'files' | 'images'>;
    CoverVideo: Schema.Attribute.Media<'images' | 'files'>;
    Image: Schema.Attribute.Media<'images' | 'files' | 'videos' | 'audios'>;
    Link: Schema.Attribute.String;
    Note: Schema.Attribute.Text;
    Type: Schema.Attribute.Enumeration<['Video', 'Image', 'Note', 'Link']>;
    YouTube: Schema.Attribute.String;
  };
}

export interface SharedImageItem extends Struct.ComponentSchema {
  collectionName: 'components_shared_image_items';
  info: {
    description: 'An image with its alt text. Used in play-project galleries.';
    displayName: 'Image Item';
    icon: 'picture';
  };
  attributes: {
    alt: Schema.Attribute.String;
    image: Schema.Attribute.Media<'images'>;
  };
}

export interface SharedLineup extends Struct.ComponentSchema {
  collectionName: 'components_shared_lineups';
  info: {
    displayName: 'Lineup';
  };
  attributes: {
    name: Schema.Attribute.String;
    title: Schema.Attribute.String;
  };
}

export interface SharedLinkBlock extends Struct.ComponentSchema {
  collectionName: 'components_shared_link_blocks';
  info: {
    displayName: 'Link block';
  };
  attributes: {
    title: Schema.Attribute.String;
    url: Schema.Attribute.String;
  };
}

export interface SharedNoteBlock extends Struct.ComponentSchema {
  collectionName: 'components_shared_note_blocks';
  info: {
    description: 'Structured note with main text, details, and additional notes. Used for program notes and performance notes.';
    displayName: 'Note Block';
    icon: 'file-text';
  };
  attributes: {
    details: Schema.Attribute.Text;
    main: Schema.Attribute.Text;
    notes: Schema.Attribute.Text;
  };
}

declare module '@strapi/strapi' {
  export module Public {
    export interface ComponentSchemas {
      'moodboard.content': MoodboardContent;
      'shared.image-item': SharedImageItem;
      'shared.lineup': SharedLineup;
      'shared.link-block': SharedLinkBlock;
      'shared.note-block': SharedNoteBlock;
    }
  }
}
