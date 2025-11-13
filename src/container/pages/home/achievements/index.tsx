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
 * Key Achievements Section
 */
const Achievements = () => {
  const t = useTranslations('story');
  const achievements = t.raw('achievements');
  const items = (achievements.items || []) as AchievementItem[];
  const sectionRef = useRef<HTMLElement>(null);
  const horizontalContainerRef = useRef<HTMLUListElement>(null);

  const [isFixed, setIsFixed] = useState<boolean>(false);

  // 섹션 높이 설정
  const setSectionHeight = useCallback(() => {
    if (sectionRef.current && items.length > 0) {
      const viewportHeight = window.innerHeight;
      const calculatedHeight = viewportHeight * items.length;
      sectionRef.current.style.height = `${calculatedHeight}px`;
    }
  }, [items.length]);

  const handleObserver = useCallback((entries: IntersectionObserverEntry[]) => {
    entries.forEach((entry) => {
      const container = horizontalContainerRef.current;
      if (!container) return;

      if (entry.isIntersecting) {
        setIsFixed(true);
      } else {
        setIsFixed(false);
      }
    });
  }, []);

  useLayoutEffect(() => {
    setSectionHeight();

    window.addEventListener('resize', setSectionHeight);

    return () => {
      window.removeEventListener('resize', setSectionHeight);
    };
  }, [setSectionHeight]);

  useEffect(() => {
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
  }, [handleObserver]);

  // 스크롤 이벤트 리스너 추가 - main 요소에만 등록
  useEffect(() => {
    const mainElement = document.querySelector('main') as HTMLElement;
    if (!mainElement || !isFixed) return;

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
  }, [isFixed]);

  return (
    <section ref={sectionRef} className={style.wrap}>
      {/* 각 카드마다 스크롤 스냅 포인트 */}
      {items.map((_, itemIndex) => (
        <div key={`snap-${itemIndex}`} className={style.snapPoint} />
      ))}

      <div className={`${style.container} ${isFixed ? style.isFixed : ''}`}>
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
