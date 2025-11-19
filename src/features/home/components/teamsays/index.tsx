'use client';

import { useTranslations } from 'next-intl';

import type { Quote } from '../../types';
import Quotes from './components/Quotes';

import style from './index.module.scss';

/**
 * What My Team Says(TeamSays 섹션)
 */
const TeamSays = () => {
  const t = useTranslations('story');
  const teamSays = t.raw('teamSays');

  return (
    <section id="story-teamsays" className={style.wrap}>
      {/* 헤더 */}
      <header>
        <h2 className={style.title}>{teamSays.title}</h2>
        <p className={style.subtitle}>{teamSays.subtitle}</p>
      </header>

      {/* 인용문 */}
      <main>
        <Quotes
          quotes={
            Array.isArray(teamSays.quotes)
              ? (teamSays.quotes as (string | Quote)[])
              : []
          }
        />
      </main>
    </section>
  );
};

export default TeamSays;
