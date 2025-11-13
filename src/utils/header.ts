import { headers } from 'next/headers';

/**
 * 지정된 헤더 키의 값을 비동기로 가져옵니다.
 * @param key - 가져올 헤더 키
 * @returns 헤더 값 또는 null(헤더가 없을 경우)
 */
export const getHeader = async (key: string): Promise<string | null> => {
  return (await headers()).get(key);
};

/**
 * URL에서 현재 언어를 제외한 path 정보를 가져올 수 있습니다.
 * @returns path 정보 (예: '/projects', '/')
 */
export const getPath = async (): Promise<string> => {
  const headersList = await headers();
  const pathname = headersList.get('x-pathname') || headersList.get('x-invoke-path');
  
  if (pathname) {
    // locale 제거 (예: '/ko/projects' -> '/projects')
    const segments = pathname.split('/').filter(Boolean);
    if (segments.length > 1) {
      // 첫 번째 세그먼트가 locale인 경우 제거
      const locale = segments[0];
      if (locale === 'ko' || locale === 'en') {
        const path = '/' + segments.slice(1).join('/');
        return path || '/';
      }
    }
    return pathname.startsWith('/') ? pathname : `/${pathname}`;
  }

  // 폴백: referer 헤더 사용
  const referer = await getHeader('referer');
  const defaultPath = '/';
  if (!referer) return defaultPath;

  try {
    const url = new URL(referer);
    const segments = url.pathname.split('/').filter(Boolean);
    // locale 제거
    if (segments.length > 0 && (segments[0] === 'ko' || segments[0] === 'en')) {
      const path = '/' + segments.slice(1).join('/');
      return path || '/';
    }
    const path = '/' + segments.join('/');
    return path || '/';
  } catch {
    return defaultPath;
  }
};
