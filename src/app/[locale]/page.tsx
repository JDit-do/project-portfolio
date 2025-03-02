import style from './page.module.scss';
import HomeCanvas from '@/container/home/canvas';
import HomeHero from '@/container/home/hero';

export default function HomePage() {
  return (
    <div className={style.wrap}>
      <div className={style.canvas}>
        <HomeCanvas />
      </div>
      <div className={style.heroSection}>
        <HomeHero />
      </div>
    </div>
  );
}
