import { unstable_cache } from 'next/cache';

import {
  createSuccessResponse,
  createErrorResponse
} from '@/shared/lib/api/response';

import { getProjectContent } from '@/features/projects/lib/getProjects';

/**
 * 프로젝트 상세 콘텐츠 API Route
 *
 * 특정 프로젝트의 페이지 블록(상세 콘텐츠) 조회
 *
 * @param request - Next.js Request 객체
 * @param params - URL 파라미터 (id: 프로젝트 ID)
 */
export async function GET(
  request: Request,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    const { id } = await params;

    if (!id) {
      return createErrorResponse('Project ID is required', 400);
    }

    // 서버 사이드 캐싱 (30분) - Notion API 호출 최소화
    const cachedGetProjectContent = unstable_cache(
      async (projectId: string) => {
        return await getProjectContent(projectId);
      },
      [`project-content-${id}`], // 캐시 키
      {
        revalidate: 1800, // 30분
        tags: [`project-content-${id}`] // 캐시 태그
      }
    );
    const content = await cachedGetProjectContent(id);

    return createSuccessResponse(content);
  } catch (error) {
    console.error('[API] /api/projects/[id]/content - 에러:', error);
    return createErrorResponse('Failed to fetch project content', 500);
  }
}
