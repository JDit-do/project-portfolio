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
 * @returns path 정보를 포함한 객체
 */
export const getPath = async (): Promise<string> => {
  const referer = await getHeader('referer');
  const defaultPath = '/';
  if (!referer) return defaultPath;

  try {
    const url = new URL(referer);
    const segments = url.pathname.split('/').filter(Boolean);
    const path = segments.slice(1).join('/') || defaultPath;

    return path;
  } catch {
    return defaultPath;
  }
};
