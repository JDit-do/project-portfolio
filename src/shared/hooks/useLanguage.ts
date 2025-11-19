'use client';

import { useLocale } from 'next-intl';

import { useRouter, usePathname } from '@/config/i18n/navigation';

import { TLOCALE } from '@/shared/types/common';

const SCROLL_POSITION_KEY = 'scroll-position-before-locale-change';

export const useLanguage = () => {
  const locale = useLocale();
  const router = useRouter();
  const pathname = usePathname();

  const onChangeLanguage = (locale: TLOCALE): void => {
    // 다국어 변경 전에 현재 스크롤 위치 저장
    const scrollContainer = document.querySelector('main') as HTMLElement;
    if (scrollContainer) {
      const scrollTop = scrollContainer.scrollTop;
      sessionStorage.setItem(SCROLL_POSITION_KEY, scrollTop.toString());
    }

    router.replace(pathname, { locale });
    router.refresh();
  };

  return { onChangeLanguage, locale };
};

// 스크롤 위치 복원 함수
export const restoreScrollPosition = () => {
  if (typeof window === 'undefined') return;

  const savedScroll = sessionStorage.getItem(SCROLL_POSITION_KEY);
  if (!savedScroll) return;

  const scrollTop = parseInt(savedScroll, 10);
  if (isNaN(scrollTop)) {
    sessionStorage.removeItem(SCROLL_POSITION_KEY);
    return;
  }

  // 페이지가 완전히 로드되고 DOM이 준비될 때까지 대기
  const restore = () => {
    const scrollContainer = document.querySelector('main') as HTMLElement;
    if (scrollContainer) {
      scrollContainer.scrollTop = scrollTop;
      // 복원 후 저장된 값 제거
      sessionStorage.removeItem(SCROLL_POSITION_KEY);
    } else {
      // main 요소가 아직 준비되지 않았으면 재시도
      requestAnimationFrame(restore);
    }
  };

  // DOM이 준비될 때까지 대기
  if (document.readyState === 'complete') {
    setTimeout(restore, 100);
  } else {
    window.addEventListener('load', () => {
      setTimeout(restore, 100);
    });
  }
};
