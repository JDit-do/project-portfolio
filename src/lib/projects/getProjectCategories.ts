import { NotionUtils } from '@/utils/notion';
import { getNotionQuery } from '@/lib/notion/client';
import { NOTION_DB_PROJECT_CATEGORY_ID } from '@/lib/notion/config';

/**
 * 프로젝트 카테고리 데이터를 가져오는 공통 함수
 */
export async function getProjectCategories(): Promise<Record<string, string[]>> {
  const filterOptions: Record<string, string[]> = {};

  if (!NOTION_DB_PROJECT_CATEGORY_ID) {
    return filterOptions;
  }

  try {
    const categoryResponse = await getNotionQuery(NOTION_DB_PROJECT_CATEGORY_ID);

    // order 필드로 정렬 (있는 경우)
    const sortedItems = [...categoryResponse].sort((a, b) => {
      const orderA = NotionUtils.getNumber(a.properties.order || {});
      const orderB = NotionUtils.getNumber(b.properties.order || {});
      return orderA - orderB;
    });

    sortedItems.forEach((item) => {
      const filterKey = NotionUtils.getString(
        item.properties.filter_key || item.properties.key
      );
      const filterValue = NotionUtils.getString(
        item.properties.filter_value || item.properties.value
      );
      const isActive = NotionUtils.getBoolean(
        item.properties.is_active || item.properties.active
      );

      if (isActive === false || !filterKey || !filterValue) {
        return;
      }

      if (!filterOptions[filterKey]) {
        filterOptions[filterKey] = [];
      }

      if (!filterOptions[filterKey].includes(filterValue)) {
        filterOptions[filterKey].push(filterValue);
      }
    });

    return filterOptions;
  } catch (error) {
    console.error('Error fetching project categories:', error);
    return filterOptions;
  }
}

