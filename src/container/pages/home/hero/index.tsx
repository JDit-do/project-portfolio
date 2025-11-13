'use client';

import { useMemo } from 'react';
import { useTranslations } from 'next-intl';

import { useCountUp } from '@/hooks/useCountUp';

import Animation from '@/components/animation';
import TitleWithCursor from './components/TitleWithCursor';
import Stats from './components/Stats';

import { SECTION_DELAY, ITEM_DELAY_INTERVAL } from '../constants';
import type { HeroStat } from '../types';

import style from './index.module.scss';

const { Blur } = Animation;

/**
 * Hero Section 컴포넌트
 */
const HomeHero = () => {
  const t = useTranslations('story');
  const hero = t.raw('hero');

  // 숫자 카운트업
  const stats = useMemo(() => (hero.stats || []) as HeroStat[], [hero.stats]);
  const statValues = useMemo(() => stats.map((stat) => stat.value), [stats]);
  const countedValues = useCountUp(statValues);

  return (
    <section className={style.wrap}>
      <div className={style.content}>
        <div className={style.titleWrap}>
          {/* 메인 타이틀 */}
          <TitleWithCursor
            text={hero.title || ''}
            typingSpeed={100}
            startDelay={SECTION_DELAY.HERO * 1000}
          />

          {/* 서브 타이틀 */}
          <div>
            <Blur.Fade delay={SECTION_DELAY.HERO + ITEM_DELAY_INTERVAL}>
              <p className={style.subtitle}>{hero.subtitle}</p>
            </Blur.Fade>
            <Blur.Fade delay={SECTION_DELAY.HERO + ITEM_DELAY_INTERVAL * 2}>
              <p className={style.description}>{hero.description}</p>
            </Blur.Fade>
          </div>
        </div>

        {/* 통계 */}
        <Stats stats={stats} countedValues={countedValues} />
      </div>

      {/* 스크롤 */}
      <div className={style.scrollIndicator}>
        <div className={style.scrollLine} />
      </div>
    </section>
  );
};

export default HomeHero;
