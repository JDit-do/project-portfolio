export const NOTION_PROPERTY_TYPE = {
  TITLE: 'title',
  RICH_TEXT: 'rich_text',
  SELECT: 'select',
  MULTI_SELECT: 'multi_select',
  NUMBER: 'number',
  URL: 'url',
  CHECKBOX: 'checkbox',
  DATE: 'date',
  STATUS: 'status',
  EMAIL: 'email',
  ROLLUP: 'rollup',
  RELATION: 'relation'
} as const;
export type NOTION_PROPERTY_TYPE =
  (typeof NOTION_PROPERTY_TYPE)[keyof typeof NOTION_PROPERTY_TYPE];

export const NOTION_TYPE = {
  STRING: 'string',
  NUMBER: 'number',
  BOOLEAN: 'boolean',
  CHECKBOX: 'checkbox'
} as const;
export type NOTION_TYPE = (typeof NOTION_TYPE)[keyof typeof NOTION_TYPE];
