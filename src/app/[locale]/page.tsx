import dynamic from 'next/dynamic';
import { Suspense } from 'react';

import style from './page.module.scss';

// 동적 import로 코드 스플리팅 적용
const HomeHero = dynamic(() => import('@/container/pages/home/hero'), {
  ssr: true
});

const Achievements = dynamic(
  () => import('@/container/pages/home/achievements'),
  {
    ssr: true
  }
);

const TeamSays = dynamic(() => import('@/container/pages/home/teamsays'), {
  ssr: true
});

const CTA = dynamic(() => import('@/container/pages/home/cta'), {
  ssr: true
});

export default function HomePage() {
  return (
    <div className={style.wrap}>
      <Suspense fallback={null}>
        <HomeHero />
      </Suspense>
      <Suspense fallback={null}>
        <Achievements />
      </Suspense>
      <Suspense fallback={null}>
        <TeamSays />
      </Suspense>
      <Suspense fallback={null}>
        <CTA />
      </Suspense>
    </div>
  );
}
