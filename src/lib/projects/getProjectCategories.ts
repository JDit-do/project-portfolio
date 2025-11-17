import { NotionUtils } from '@/utils/notion';
import { getNotionQuery } from '@/lib/notion/client';
import { NOTION_DB_PROJECT_CATEGORY_ID } from '@/lib/notion/config';

/**
 * 프로젝트 카테고리 데이터를 가져오는 함수
 * Category DB 구조: Title, type (Select), is_active (Checkbox), 비고, projects (관계형)
 */
export async function getProjectCategories(): Promise<string[]> {
  const categories: string[] = [];

  if (!NOTION_DB_PROJECT_CATEGORY_ID) {
    return categories;
  }

  try {
    const categoryResponse = await getNotionQuery(
      NOTION_DB_PROJECT_CATEGORY_ID
    );

    categoryResponse.forEach((item) => {
      const type = NotionUtils.getString(item.properties.type);
      const isActive = NotionUtils.getBoolean(
        item.properties.is_active || item.properties.active
      );

      // 활성화된 카테고리만 추가하고, type 값이 있어야 함
      if (isActive && type && !categories.includes(type)) {
        categories.push(type);
      }
    });

    return categories;
  } catch (error) {
    console.error('[getProjectCategories] Error:', error);
    return categories;
  }
}
