import { getProjectCategories } from '@/lib/projects/getProjectCategories';
import { createSuccessResponse, createErrorResponse } from '@/lib/api/response';

/**
 * API Route: 클라이언트나 외부에서 호출할 때 사용
 */
export async function GET() {
  try {
    const categories = await getProjectCategories();

    return createSuccessResponse(categories);
  } catch (error) {
    console.error('[API] /api/projects/category - Error:', error);
    return createErrorResponse('Failed to fetch category data', 500);
  }
}

