import { NotionPropertyType, NotionType } from '@/constants/notion';

export type NotionPropertyTypes =
  (typeof NotionPropertyType)[keyof typeof NotionPropertyType];

export type NotionTypes = (typeof NotionType)[keyof typeof NotionType];
