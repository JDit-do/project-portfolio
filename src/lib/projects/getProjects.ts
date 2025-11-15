import { QueryDatabaseParameters } from '@notionhq/client/build/src/api-endpoints';

import { NotionUtils } from '@/utils/notion';
import { Project, ProjectType } from '@/types/project';
import { getNotionQuery } from '@/lib/notion/client';
import { NOTION_DB_PROJECTS_ID } from '@/lib/notion/config';

/**
 * Notion 응답을 Project 배열로 변환하는 공통 함수
 */
export const mapNotionResponseToProjects = (
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

interface GetProjectsOptions {
  filterKey?: string;
  filterValue?: string;
}

/**
 * 프로젝트 데이터를 가져오는 공통 함수
 * 서버 컴포넌트와 API Route에서 모두 사용 가능
 */
export async function getProjects(
  options: GetProjectsOptions = {}
): Promise<{
  all: Project[];
  filtered?: Project[];
}> {
  const { filterKey, filterValue } = options;
  let allData: Project[] = [];
  let filteredData: Project[] = [];

  if (!NOTION_DB_PROJECTS_ID) {
    return { all: [] };
  }

  try {
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

    return {
      all: allData,
      ...(filterKey && filterValue && { filtered: filteredData })
    };
  } catch (error) {
    console.error('Error fetching projects:', error);
    return { all: [] };
  }
}

