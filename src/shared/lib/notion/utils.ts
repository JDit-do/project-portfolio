import { NOTION_TYPE, NOTION_PROPERTY_TYPE } from '@/shared/constants/notion';
import { PageObjectResponse } from '@notionhq/client/build/src/api-endpoints';

type TC_NOTION_PROPERTY = PageObjectResponse['properties'][string];

/**
 * URL 형식 검증 함수
 * @param url - 검증할 URL 문자열
 * @returns 유효한 URL이면 그대로 반환, 아니면 undefined
 */
const getValidUrl = (url: string): string | undefined => {
  const trimmed = url.trim();
  if (!trimmed) return undefined;
  try {
    // URL 형식 검증
    new URL(trimmed);
    return trimmed;
  } catch {
    // 잘못된 URL 형식이면 undefined 반환
    return undefined;
  }
};

/**
 * 문자열 필드 가져오기 구현 함수
 */
function getStringImpl(
  property: TC_NOTION_PROPERTY,
  getValue: (
    property: TC_NOTION_PROPERTY,
    type: NOTION_TYPE
  ) => string | number | boolean | null,
  optional?: boolean
): string | undefined {
  const value = String(getValue(property, NOTION_TYPE.STRING) ?? '');
  if (optional && !value) {
    return undefined;
  }
  return value;
}

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
          return property.title?.[0]?.plain_text;
        if (property.type === NOTION_PROPERTY_TYPE.RICH_TEXT)
          return property.rich_text?.[0]?.plain_text;
        if (property.type === NOTION_PROPERTY_TYPE.SELECT)
          return property.select?.name ?? null;
        if (property.type === NOTION_PROPERTY_TYPE.DATE)
          return property.date?.start ?? null;
        if (property.type === NOTION_PROPERTY_TYPE.URL) {
          const url = property.url;
          return url ? (getValidUrl(url) ?? null) : null;
        }
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

  /**
   * 문자열 필드 가져오기
   *
   * 사용 예시:
   * - getString(property) → string (필수 필드, 항상 string 반환)
   * - getString(property, true) → string | undefined (선택 필드)
   *
   * @param property - Notion property
   * @param optional - true이면 빈 문자열일 때 undefined 반환
   */
  getString(property: TC_NOTION_PROPERTY, optional?: true): string | undefined {
    const result = getStringImpl(property, this.getValue.bind(this), optional);
    // optional이 없으면 항상 string 반환 (빈 문자열이라도)
    return optional === undefined ? (result as string) : result;
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
  },

  /**
   * JSON 문자열을 파싱하여 객체로 변환
   *
   * Notion DB의 Text 필드에 JSON 형태로 저장된 데이터를 파싱합니다.
   * 예: `{"React": "https://...", "TypeScript": "https://..."}`
   *
   * @param property - Notion property (Text 타입)
   * @returns 파싱된 객체 또는 undefined
   */
  getJsonObject<T = Record<string, unknown>>(
    property: TC_NOTION_PROPERTY
  ): T | undefined {
    const jsonString = this.getString(property, true);
    if (!jsonString) {
      return undefined;
    }

    try {
      const parsed = JSON.parse(jsonString) as T;
      return parsed;
    } catch {
      // JSON 파싱 실패 시 undefined 반환
      return undefined;
    }
  }
};
