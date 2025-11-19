import { NextResponse } from 'next/server';
import { APIResponse } from '@/shared/types/api';
import { API_STATUS } from '@/shared/constants/status';

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
  // 개발 환경에서는 캐시 비활성화, 프로덕션에서는 30분 캐싱
  const cacheControl =
    process.env.NODE_ENV === 'development'
      ? 'no-cache, no-store, must-revalidate' // 개발: 캐시 비활성화
      : 'public, max-age=1800, s-maxage=1800, stale-while-revalidate=3600'; // 프로덕션: 30분 캐싱

  return NextResponse.json(responseData, {
    status,
    headers: {
      // max-age: 브라우저 캐시 (30분)
      // s-maxage: 프록시/서버 캐시 (30분)
      // stale-while-revalidate: 캐시 만료 후에도 1시간 동안 기존 캐시 사용하면서 백그라운드 재검증
      'Cache-Control': cacheControl
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
