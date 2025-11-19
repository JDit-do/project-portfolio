'use client';

import { useEffect } from 'react';
import { restoreScrollPosition } from '@/shared/hooks/useLanguage';

/**
 * 다국어 변경 시 스크롤 위치를 복원하는 컴포넌트
 */
const ScrollRestore = () => {
  useEffect(() => {
    // 컴포넌트가 마운트된 후 스크롤 위치 복원
    restoreScrollPosition();
  }, []);

  return null;
};

export default ScrollRestore;
