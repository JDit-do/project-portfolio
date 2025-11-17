import { NextResponse } from 'next/server';
import { APIResponse } from '@/types/api';
import { API_STATUS } from '@/constants/status';

/**
 * 성공 API 응답 생성
 */
export function createSuccessResponse<T>(
  data: T,
  message: string = 'Success',
  status: number = 200
): NextResponse<APIResponse<T>> {
  const responseData: APIResponse<T> = {
    code: status,
    data,
    status: API_STATUS.SUCCESS,
    message
  };
  return NextResponse.json(responseData, {
    status,
    headers: {
      'Cache-Control': 'public, s-maxage=1800, stale-while-revalidate=3600'
    }
  });
}

/**
 * 에러 API 응답 생성
 */
export function createErrorResponse(
  message: string = 'Internal Server Error',
  status: number = 500
): NextResponse<APIResponse<null>> {
  const responseData: APIResponse<null> = {
    data: null,
    code: status,
    status: API_STATUS.ERROR,
    message
  };
  return NextResponse.json(responseData, { status });
}

/**
 * API 핸들러 래퍼 (에러 처리 자동화)
 */
export async function withApiHandler<T>(
  handler: () => Promise<T>,
  errorMessage: string = 'Failed to process request'
): Promise<NextResponse<APIResponse<T | null>>> {
  try {
    const data = await handler();
    return createSuccessResponse(data);
  } catch (error) {
    console.error(`[withApiHandler] Error: ${errorMessage}`, error);
    return createErrorResponse(errorMessage, 500);
  }
}
