import { NotionTypes } from '@/types/notion';

import { NotionPropertyType, NotionType } from '@/constants/notion';

export const NotionUtils = {
  /**
   * Notion Property에서 데이터 추출, 타입 any
   * @param property - 노션 속성
   * @param type - 타입 ('string', 'number', 'boolean', 'date', 'url')
   */
  getValue(property: any, type: NotionTypes): any {
    if (!property) return null;

    switch (type) {
      case NotionType.STRING:
        if (NotionPropertyType.TITLE in property)
          return property.title?.[0]?.plain_text || '';
        if (NotionPropertyType.RICH_TEXT in property)
          return property.rich_text?.[0]?.plain_text || '';
        if (NotionPropertyType.SELECT in property)
          return property.select?.name || '';
        if (NotionPropertyType.DATE in property)
          return property?.date?.start || '';
        if (NotionPropertyType.URL in property) return property?.url || '';
        return '';
      case NotionType.NUMBER:
        return property?.number ?? null;
      case NotionType.BOOLEAN:
        return property?.checkbox ?? false;
    }
  },

  /** 특정 필드에서 추출 및 타입 정의 */
  getString(property: any): string {
    return this.getValue(property, NotionType.STRING);
  },
  getNumber(property: any): number {
    return this.getValue(property, NotionType.NUMBER);
  },
  getBoolean(property: any): boolean {
    return this.getValue(property, NotionType.BOOLEAN);
  }
};
