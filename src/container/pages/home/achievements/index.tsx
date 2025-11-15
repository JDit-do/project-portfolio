'use client';

import {
  useCallback,
  useEffect,
  useLayoutEffect,
  useRef,
  useState
} from 'react';
import { useTranslations } from 'next-intl';

import { ACHIEVEMENTS } from '@/constants/common';

import { SECTION_DELAY, ITEM_DELAY_INTERVAL } from '../constants';
import type { AchievementItem } from '../types';
import AchievementCard from './components/AchievementCard';

import style from './index.module.scss';

/**
 * 모바일 여부 확인
 */
const isMobile = () => {
  if (typeof window === 'undefined') return false;
  return window.innerWidth <= ACHIEVEMENTS.MOBILE_BREAKPOINT;
};

/**
 * Key Achievements Section
 */
const Achievements = () => {
  const t = useTranslations('story');
  const achievements = t.raw('achievements');
  const items = (achievements.items || []) as AchievementItem[];
  const sectionRef = useRef<HTMLElement>(null);
  const horizontalContainerRef = useRef<HTMLUListElement>(null);

  const [isFixed, setIsFixed] = useState<boolean>(false);
  const [isMobileDevice, setIsMobileDevice] = useState<boolean>(false);

  // 섹션 높이 설정 (모바일 비활성화)
  const setSectionHeight = useCallback(() => {
    if (!sectionRef.current) return;

    // 모바일에서는 높이 설정 안 함 (자동 높이 사용)
    if (isMobileDevice) {
      sectionRef.current.style.height = '';
      return;
    }

    // 데스크톱에서만 높이 * 항목 개수로 계산
    if (items.length === 0) return;

    const viewportHeight = window.innerHeight;
    const calculatedHeight = viewportHeight * items.length;
    sectionRef.current.style.height = `${calculatedHeight}px`;
  }, [items.length, isMobileDevice]);

  const handleObserver = useCallback(
    (entries: IntersectionObserverEntry[]) => {
      if (isMobileDevice) return;

      entries.forEach((entry) => {
        const container = horizontalContainerRef.current;
        if (!container) return;

        if (entry.isIntersecting) {
          setIsFixed(true);
        } else {
          setIsFixed(false);
        }
      });
    },
    [isMobileDevice]
  );

  useEffect(() => {
    const checkMobile = () => {
      setIsMobileDevice(isMobile());
    };

    checkMobile();
    window.addEventListener('resize', checkMobile);

    return () => {
      window.removeEventListener('resize', checkMobile);
    };
  }, []);

  useLayoutEffect(() => {
    setSectionHeight();

    const handleResize = () => {
      setSectionHeight();
    };

    window.addEventListener('resize', handleResize);

    return () => {
      window.removeEventListener('resize', handleResize);
    };
  }, [setSectionHeight]);

  useEffect(() => {
    if (isMobileDevice) return;

    const observer = new IntersectionObserver(handleObserver, {
      rootMargin: '0px',
      threshold: 0.1
    });

    const currentElement = sectionRef.current;

    if (currentElement) {
      observer.observe(currentElement);
    }

    return () => {
      if (currentElement) {
        observer.unobserve(currentElement);
      }
    };
  }, [handleObserver, isMobileDevice]);

  // 모바일로 전환될 때 translateX 초기화
  useEffect(() => {
    if (!horizontalContainerRef.current) return;

    if (isMobileDevice) {
      // 모바일로 전환될 때 translateX 초기화
      horizontalContainerRef.current.style.transform = 'translateX(0)';
      horizontalContainerRef.current.style.transition =
        `transform ${ACHIEVEMENTS.MOBILE_TRANSITION}s ease-out`;
    }
  }, [isMobileDevice]);

  // 스크롤 이벤트 추가
  useEffect(() => {
    // 모바일: 스크롤 이벤트 처리 X, 데스크톱: isFixed 아니면
    if (isMobileDevice || !isFixed) return;

    const mainElement = document.querySelector('main') as HTMLElement;
    if (!mainElement) return;

    let rafId: number | null = null;

    const handleScroll = () => {
      if (!sectionRef.current || !horizontalContainerRef.current) return;

      // requestAnimationFrame을 사용하여 스크롤 애니메이션과 동기화
      if (rafId !== null) {
        cancelAnimationFrame(rafId);
      }

      rafId = requestAnimationFrame(() => {
        const scrollTop = mainElement.scrollTop;
        const viewportHeight = window.innerHeight;

        const sectionRect = sectionRef.current!.getBoundingClientRect();
        const mainRect = mainElement.getBoundingClientRect();
        const sectionStart = sectionRect.top - mainRect.top + scrollTop;
        const scrollOffset = scrollTop - sectionStart;

        // 100vh 단위로 몇 번째 snapPoint인지 계산 (0부터 시작)
        const snapIndex = Math.max(
          0,
          Math.min(items.length - 1, Math.round(scrollOffset / viewportHeight))
        );

        // 카드 너비 + gap 계산
        const cardTotalWidth = ACHIEVEMENTS.CARD_WIDTH + ACHIEVEMENTS.CARD_GAP;

        // 좌우 이동
        const translateX = -snapIndex * cardTotalWidth;
        horizontalContainerRef.current!.style.transform = `translateX(${translateX}px)`;
        horizontalContainerRef.current!.style.transition =
          `transform ${ACHIEVEMENTS.SCROLL_TRANSITION}s ease-out`;
      });
    };

    mainElement.addEventListener('scroll', handleScroll, { passive: true });

    // 초기 위치 설정
    handleScroll();

    return () => {
      mainElement.removeEventListener('scroll', handleScroll);
      if (rafId !== null) {
        cancelAnimationFrame(rafId);
      }
    };
  }, [isFixed, isMobileDevice, items.length]);

  return (
    <section ref={sectionRef} className={style.wrap}>
      {/* 각 카드마다 스크롤 스냅 포인트 (모바일에서 제외) */}
      {!isMobileDevice &&
        items.map((_, itemIndex) => (
          <div key={`snap-${itemIndex}`} className={style.snapPoint} />
        ))}

      <div
        className={`${style.container} ${
          isFixed && !isMobileDevice ? style.isFixed : ''
        }`}
      >
        {/* 헤더 */}
        <header>
          <h2 className={style.title}>{achievements.title}</h2>
          <p className={style.subtitle}>{achievements.subtitle}</p>
        </header>

        {/* Achievements 카드 */}
        <main className={style.achievements}>
          <span className={style.backgroundText}>JUST DO</span>

          <div className={style.cardsWrap}>
            <ul ref={horizontalContainerRef}>
              {items.map((item: AchievementItem, itemIndex: number) => (
                <li key={item.id}>
                  <AchievementCard
                    item={item}
                    stepNumber={itemIndex + 1}
                    delay={
                      SECTION_DELAY.HERO + ITEM_DELAY_INTERVAL * (6 + itemIndex)
                    }
                  />
                </li>
              ))}
            </ul>
          </div>
        </main>
      </div>
    </section>
  );
};

export default Achievements;
