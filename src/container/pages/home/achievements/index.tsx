'use client';

import {
  useCallback,
  useEffect,
  useLayoutEffect,
  useRef,
  useState
} from 'react';
import { useTranslations } from 'next-intl';

import { SECTION_DELAY, ITEM_DELAY_INTERVAL } from '../constants';
import type { AchievementItem } from '../types';
import AchievementCard from './components/AchievementCard';

import style from './index.module.scss';

/**
 * 모바일 여부 확인 (768px 이하)
 */
const isMobile = () => {
  if (typeof window === 'undefined') return false;
  return window.innerWidth <= 768;
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

  // 섹션 높이 설정 (모바일에서는 비활성화)
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

    window.addEventListener('resize', setSectionHeight);

    return () => {
      window.removeEventListener('resize', setSectionHeight);
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
        'transform 0.3s ease-out';
    }
  }, [isMobileDevice]);

  // 스크롤 이벤트 리스너 추가
  useEffect(() => {
    const mainElement = document.querySelector('main') as HTMLElement;
    if (!mainElement) return;

    // 모바일에서는 isFixed 체크 없이 스크롤만 처리
    if (isMobileDevice) {
      const handleScroll = () => {
        // 모바일에서는 스크롤 이벤트만 처리 (필요시 추가 로직 구현)
      };

      mainElement.addEventListener('scroll', handleScroll, { passive: true });

      return () => {
        mainElement.removeEventListener('scroll', handleScroll);
      };
    }

    // 데스크톱에서는 기존 로직 유지
    if (!isFixed) return;

    const handleScroll = () => {
      if (!sectionRef.current || !horizontalContainerRef.current) return;

      const scrollTop = mainElement.scrollTop;
      const sectionRect = sectionRef.current.getBoundingClientRect();
      const mainRect = mainElement.getBoundingClientRect();

      const sectionStart = scrollTop + (sectionRect.top - mainRect.top);
      const scrollOffset = scrollTop - sectionStart;
      const viewportHeight = window.innerHeight;

      // 100vh 단위로 몇 번째 snapPoint인지 계산 (0부터 시작)
      const snapIndex = Math.max(0, Math.floor(scrollOffset / viewportHeight));

      // 카드 너비 (400px) + gap (20px = spacing-5)
      const cardWidth = 400;
      const cardGap = 20;
      const cardTotalWidth = cardWidth + cardGap;

      // 좌우 이동
      const translateX = -snapIndex * cardTotalWidth;
      horizontalContainerRef.current.style.transform = `translateX(${translateX}px)`;
      horizontalContainerRef.current.style.transition =
        'transform 0.1s ease-out';
    };

    mainElement.addEventListener('scroll', handleScroll, { passive: true });

    // 초기 위치 설정
    handleScroll();

    return () => {
      mainElement.removeEventListener('scroll', handleScroll);
    };
  }, [isFixed, isMobileDevice]);

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
