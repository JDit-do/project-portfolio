import HomeHero from '@/container/home/hero';

import style from './page.module.scss';

export default function HomePage() {
  return (
    <section className={style.wrap}>
      <HomeHero />
    </section>
  );
}
