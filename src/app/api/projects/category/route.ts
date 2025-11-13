import { NextResponse } from 'next/server';

import { NotionUtils } from '@/utils/notion';
import { APIResponse } from '@/types/api';
import { API_STATUS } from '@/constants/status';
import { getNotionQuery } from '@/lib/notion/client';
import { NOTION_DB_PROJECT_CATEGORY_ID } from '@/lib/notion/config';

export async function GET() {
  try {
    let filterOptions: Record<string, string[]> = {};

    if (NOTION_DB_PROJECT_CATEGORY_ID) {
      const categoryResponse = await getNotionQuery(
        NOTION_DB_PROJECT_CATEGORY_ID
      );

      // order 필드로 정렬 (있는 경우)
      const sortedItems = [...categoryResponse].sort((a, b) => {
        const orderA = NotionUtils.getNumber(a.properties.order || {});
        const orderB = NotionUtils.getNumber(b.properties.order || {});
        return orderA - orderB;
      });

      sortedItems.forEach((item) => {
        // 카테고리 DB의 필드 구조에 맞게 수정 필요
        // 예시: filter_key, filter_value 필드가 있다고 가정
        // 실제 필드명은 카테고리 DB 구조에 맞게 수정 필요
        const filterKey = NotionUtils.getString(
          item.properties.filter_key || item.properties.key
        );
        const filterValue = NotionUtils.getString(
          item.properties.filter_value || item.properties.value
        );
        const isActive = NotionUtils.getBoolean(
          item.properties.is_active || item.properties.active
        );

        // 활성화된 카테고리만 사용 (isActive가 false일 때만 필터링)
        if (isActive === false || !filterKey || !filterValue) {
          return;
        }

        if (!filterOptions[filterKey]) {
          filterOptions[filterKey] = [];
        }

        // 중복 제거
        if (!filterOptions[filterKey].includes(filterValue)) {
          filterOptions[filterKey].push(filterValue);
        }
      });
    }

    const responseData: APIResponse<Record<string, string[]>> = {
      code: 200,
      data: filterOptions,
      status: API_STATUS.SUCCESS
    };

    return NextResponse.json(responseData, {
      status: responseData.code,
      headers: {
        'Cache-Control': 'public, s-maxage=1800, stale-while-revalidate=3600'
      }
    });
  } catch (error) {
    console.error('Error fetching category data:', error);

    const responseData: APIResponse<null> = {
      data: null,
      code: 500,
      status: API_STATUS.ERROR,
      message: 'Failed to fetch category data'
    };
    return NextResponse.json(responseData, { status: responseData.code });
  }
}

