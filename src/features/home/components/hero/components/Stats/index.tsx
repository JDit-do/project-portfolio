import Animation from '@/shared/components/animation';
import { SECTION_DELAY, ITEM_DELAY_INTERVAL } from '../../../../constants';
import type { HeroStat } from '../../../../types';
import StatItem from '../StatItem';

import style from './index.module.scss';

const { Blur } = Animation;

interface StatsProps {
  stats: HeroStat[];
  countedValues: Record<number, number>;
}

/**
 * Stats 컴포넌트(통계 목록 렌더링)
 */
const Stats = ({ stats, countedValues }: StatsProps) => {
  if (!Array.isArray(stats) || stats.length === 0) return null;

  return (
    <Blur.Fade delay={SECTION_DELAY.HERO + ITEM_DELAY_INTERVAL * 3}>
      <ul className={style.wrap}>
        {stats.map((stat: HeroStat, index: number) => (
          <StatItem
            key={index}
            stat={stat}
            countedValue={countedValues[index]}
          />
        ))}
      </ul>
    </Blur.Fade>
  );
};

export default Stats;
