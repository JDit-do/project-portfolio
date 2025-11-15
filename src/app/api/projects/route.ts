import { NextRequest } from 'next/server';

import { getProjects } from '@/lib/projects/getProjects';
import { createSuccessResponse, createErrorResponse } from '@/lib/api/response';


export async function GET(request: NextRequest) {
  try {
    const searchParams = request.nextUrl.searchParams;
    const filterKey = searchParams.get('filterKey');
    const filterValue = searchParams.get('filterValue');

    const { all, filtered } = await getProjects({
      filterKey: filterKey || undefined,
      filterValue: filterValue || undefined
    });

    return createSuccessResponse({
      all,
      ...(filterKey && filterValue && filtered && { filtered })
    });
  } catch (error) {
    console.error('Error fetching projects data:', error);
    return createErrorResponse('Failed to fetch projects data', 500);
  }
}
