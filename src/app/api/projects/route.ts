import { getProjects } from '@/features/projects/lib/getProjects';
import {
  createSuccessResponse,
  createErrorResponse
} from '@/shared/lib/api/response';

/**
 * 프로젝트 목록 API Route
 *
 * 클라이언트나 외부에서 호출할 때 사용합니다.
 * 서버 컴포넌트에서는 getProjects()를 호출하는 것을 권장.
 */
export async function GET() {
  try {
    const projects = await getProjects();

    return createSuccessResponse({
      all: projects
    });
  } catch (error) {
    console.error('[API] /api/projects - 에러:', error);
    return createErrorResponse('Failed to fetch projects data', 500);
  }
}
