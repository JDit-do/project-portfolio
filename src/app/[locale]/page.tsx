import HomeHero from '@/container/pages/home/hero';
import Achievements from '@/container/pages/home/achievements';
import TeamSays from '@/container/pages/home/teamsays';
import CTA from '@/container/pages/home/cta';

import style from './page.module.scss';

export default function HomePage() {
  return (
    <div className={style.wrap}>
      <HomeHero />
      <Achievements />
      <TeamSays />
      <CTA />
    </div>
  );
}
