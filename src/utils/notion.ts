import { NOTION_TYPE, NOTION_PROPERTY_TYPE } from '@/constants/notion';
import { PageObjectResponse } from '@notionhq/client/build/src/api-endpoints';

type TC_NOTION_PROPERTY = PageObjectResponse['properties'][string];

export const NotionUtils = {
  /**
   * Notion property에서 값 추출
   */
  getValue(
    property: TC_NOTION_PROPERTY,
    type: NOTION_TYPE
  ): string | number | boolean | null {
    if (!property) return null;

    switch (type) {
      case NOTION_TYPE.STRING:
        if (property.type === NOTION_PROPERTY_TYPE.TITLE)
          return property.title?.[0].plain_text;
        if (property.type === NOTION_PROPERTY_TYPE.RICH_TEXT)
          return property.rich_text?.[0].plain_text;
        if (property.type === NOTION_PROPERTY_TYPE.SELECT)
          return property.select?.name ?? null;
        if (property.type === NOTION_PROPERTY_TYPE.DATE)
          return property.date?.start ?? null;
        if (property.type === NOTION_PROPERTY_TYPE.URL) return property.url;
        return null;
      case NOTION_TYPE.NUMBER:
        return property.type === NOTION_TYPE.NUMBER
          ? (property.number ?? null)
          : null;
      case NOTION_TYPE.BOOLEAN:
        return property.type === NOTION_TYPE.CHECKBOX
          ? (property.checkbox ?? false)
          : false;
      default:
        return null;
    }
  },

  getString(property: TC_NOTION_PROPERTY): string {
    return String(this.getValue(property, NOTION_TYPE.STRING) ?? '');
  },

  getNumber(property: TC_NOTION_PROPERTY): number {
    const value = this.getValue(property, NOTION_TYPE.NUMBER);
    return typeof value === 'number' ? value : 0;
  },

  getBoolean(property: TC_NOTION_PROPERTY): boolean {
    const value = this.getValue(property, NOTION_TYPE.BOOLEAN);
    return typeof value === 'boolean' ? value : false;
  },

  getMultiSelect(property: TC_NOTION_PROPERTY): string[] {
    if (!property || property.type !== NOTION_PROPERTY_TYPE.MULTI_SELECT) {
      return [];
    }
    return property.multi_select?.map((item) => item.name) || [];
  }
};
