import { NotionUtils } from '@/shared/lib/notion/utils';
import { getNotionQuery } from '@/shared/lib/notion/client';
import { NOTION_DB_PROJECT_CATEGORY_ID } from '@/shared/lib/notion/config';

/**
 * 프로젝트 카테고리 데이터를 가져오는 함수
 * Category DB 구조: Title, type (Select), is_active (Checkbox), order (Number), 비고, projects (관계형)
 */
export async function getProjectCategories(): Promise<string[]> {
  if (!NOTION_DB_PROJECT_CATEGORY_ID) {
    return [];
  }

  try {
    const categoryResponse = await getNotionQuery(
      NOTION_DB_PROJECT_CATEGORY_ID
    );

    // 카테고리 정보를 객체로 수집
    const categoryItems: Array<{ type: string; order: number }> = [];

    categoryResponse.forEach((item) => {
      const type = NotionUtils.getString(item.properties.type);
      const isActive = NotionUtils.getBoolean(
        item.properties.is_active || item.properties.active
      );
      const order = NotionUtils.getNumber(item.properties.order);

      if (isActive && type) {
        // 중복 체크
        if (!categoryItems.find((cat) => cat.type === type)) {
          categoryItems.push({
            type,
            order: order || 0 // order가 없으면 0으로 설정
          });
        }
      }
    });

    // order 기준으로 정렬 (오름차순)
    categoryItems.sort((a, b) => a.order - b.order);

    // type 값만 추출하여 반환
    return categoryItems.map((item) => item.type);
  } catch (error) {
    console.error('[getProjectCategories] Error:', error);
    return [];
  }
}
