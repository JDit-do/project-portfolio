import { NextRequest, NextResponse } from 'next/server';
import { QueryDatabaseParameters } from '@notionhq/client/build/src/api-endpoints';

import { NotionUtils } from '@/utils/notion';
import { APIResponse } from '@/types/api';
import { Project, ProjectType } from '@/types/project';
import { API_STATUS } from '@/constants/status';
import { getNotionQuery } from '@/lib/notion/client';
import { NOTION_DB_PROJECTS_ID } from '@/lib/notion/config';

/**
 * Notion 응답을 Project 배열로 변환하는 공통 함수
 */
const mapNotionResponseToProjects = (
  response: Awaited<ReturnType<typeof getNotionQuery>>
): Project[] => {
  return response
    .map((item) => {
      const isShareable = NotionUtils.getBoolean(
        item.properties.is_shareable
      );
      // 공유 가능한 프로젝트만 필터링
      if (!isShareable) {
        return null;
      }

      const type = NotionUtils.getString(
        item.properties.type
      ) as ProjectType;

      const project = {
        id: item.id,
        title: NotionUtils.getString(item.properties.title),
        description: NotionUtils.getString(item.properties.description),
        thumbnail:
          NotionUtils.getString(item.properties.thumbnail) || undefined,
        type: type || ('career' as ProjectType), // 기본값 설정
        isFavorite: NotionUtils.getBoolean(item.properties.is_favorite),
        tags: NotionUtils.getMultiSelect(item.properties.tags),
        link: NotionUtils.getString(item.properties.link) || undefined,
        github: NotionUtils.getString(item.properties.github) || undefined,
        startDate:
          NotionUtils.getString(item.properties.start_date) || undefined,
        endDate: NotionUtils.getString(item.properties.end_date) || undefined
      } as Project;

      return project;
    })
    .filter((project): project is Project => project !== null);
};

export async function GET(request: NextRequest) {
  try {
    const searchParams = request.nextUrl.searchParams;
    const filterKey = searchParams.get('filterKey'); // 필터링할 키 (예: 'type', 'category')
    const filterValue = searchParams.get('filterValue'); // 필터링할 값 (예: 'career', 'side')

    let allData: Project[] = [];
    let filteredData: Project[] = [];

    if (NOTION_DB_PROJECTS_ID) {
      // 전체 데이터 가져오기
      const allResponse = await getNotionQuery(NOTION_DB_PROJECTS_ID);
      allData = mapNotionResponseToProjects(allResponse);

      // 필터가 있으면 필터링된 데이터도 가져오기
      if (filterKey && filterValue) {
        // 필터 타입 결정
        let filterType = 'select';
        if (filterKey === 'tags') {
          filterType = 'multi_select';
        } else if (filterKey === 'category' || filterKey === 'type') {
          filterType = 'select';
        }

        const filter: QueryDatabaseParameters['filter'] = {
          and: [
            {
              property: 'is_shareable',
              checkbox: {
                equals: true
              }
            },
            {
              property: filterKey,
              [filterType]: {
                equals: filterValue
              }
            }
          ]
        } as QueryDatabaseParameters['filter'];

        const filteredResponse = await getNotionQuery(
          NOTION_DB_PROJECTS_ID,
          filter
        );
        filteredData = mapNotionResponseToProjects(filteredResponse);
      }
    }

    const responseData: APIResponse<{
      all: Project[];
      filtered?: Project[];
    }> = {
      code: 200,
      data: {
        all: allData,
        ...(filterKey && filterValue && { filtered: filteredData })
      },
      status: API_STATUS.SUCCESS
    };

    return NextResponse.json(responseData, {
      status: responseData.code,
      headers: {
        'Cache-Control': 'public, s-maxage=1800, stale-while-revalidate=3600'
      }
    });
  } catch (error) {
    console.error('Error fetching projects data:', error);

    const responseData: APIResponse<null> = {
      data: null,
      code: 500,
      status: API_STATUS.ERROR,
      message: 'Failed to fetch projects data'
    };
    return NextResponse.json(responseData, { status: responseData.code });
  }
}
