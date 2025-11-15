import { getProjectCategories } from '@/lib/projects/getProjectCategories';
import { withApiHandler } from '@/lib/api/response';

/**
 * API Route: 클라이언트나 외부에서 호출할 때 사용
 */
export async function GET() {
  return withApiHandler(
    () => getProjectCategories(),
    'Failed to fetch category data'
  );
}

