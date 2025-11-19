import { NotionUtils } from '@/shared/lib/notion/utils';
import { Project, ProjectType } from '@/features/projects/types';
import {
  getNotionQuery,
  getNotionPageBlocks
} from '@/shared/lib/notion/client';
import { NOTION_DB_PROJECT_ID } from '@/shared/lib/notion/config';
import { BlockObjectResponse } from '@notionhq/client/build/src/api-endpoints';

/**
 * Notion 응답을 Project 배열로 변환하는 공통 함수
 *
 * - `is_shareable`이 `true`인 프로젝트만 필터링
 * - Notion 속성을 Project 타입으로 매핑
 *
 * @param response - Notion DB 쿼리 응답
 * @returns 공유 가능한 프로젝트 배열
 */
export const mapNotionResponseToProjects = (
  response: Awaited<ReturnType<typeof getNotionQuery>>
): Project[] => {
  return response
    .map((item) => {
      const isShareable = NotionUtils.getBoolean(item.properties.is_shareable);

      if (!isShareable) {
        return null;
      }

      const title = NotionUtils.getString(item.properties.title);
      const description = NotionUtils.getString(item.properties.description);
      const type = NotionUtils.getString(item.properties.type) as ProjectType;

      // 필수 필드 검증
      if (!title || !description) {
        return null;
      }

      const tags = NotionUtils.getMultiSelect(item.properties.tags);

      const project: Project = {
        id: item.id,
        title,
        description,
        thumbnail: NotionUtils.getString(item.properties.thumbnail, true),
        type: type || ('career' as ProjectType), // 기본값: career
        isFavorite: NotionUtils.getBoolean(item.properties.is_favorite),
        tags,
        link: NotionUtils.getString(item.properties.link, true),
        github: NotionUtils.getString(item.properties.github, true),
        startDate: NotionUtils.getString(item.properties.start_date, true),
        endDate: NotionUtils.getString(item.properties.end_date, true)
      };

      return project;
    })
    .filter((project): project is Project => project !== null);
};

/**
 * 프로젝트 데이터를 가져오는 함수
 *
 * @returns 전체 프로젝트 목록 (상세 콘텐츠는 포함하지 않음)
 */
export async function getProjects(): Promise<Project[]> {
  if (!NOTION_DB_PROJECT_ID) {
    return [];
  }

  try {
    // 전체 데이터
    const allResponse = await getNotionQuery(NOTION_DB_PROJECT_ID);
    const projects = mapNotionResponseToProjects(allResponse);

    return projects;
  } catch (error) {
    console.error('Error fetching projects:', error);
    return [];
  }
}

/**
 * 특정 프로젝트의 상세 콘텐츠(블록)를 가져오는 함수
 *
 * @param projectId - 프로젝트 ID (Notion 페이지 ID)
 * @returns 프로젝트의 블록 배열
 */
export async function getProjectContent(
  projectId: string
): Promise<BlockObjectResponse[]> {
  if (!projectId) {
    throw new Error('Project ID is required');
  }

  try {
    const blocks = await getNotionPageBlocks(projectId);
    return blocks;
  } catch (error) {
    console.error(`Error fetching content for project ${projectId}:`, error);
    throw error;
  }
}
