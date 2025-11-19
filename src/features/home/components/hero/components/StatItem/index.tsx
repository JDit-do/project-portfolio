import type { HeroStat } from '../../../../types';

import style from './index.module.scss';

interface StatItemProps {
  stat: HeroStat;
  countedValue?: number;
}

/**
 * Stat Item 컴포넌트(통계 항목)
 */
const StatItem = ({ stat, countedValue }: StatItemProps) => {
  const numericValue = parseFloat(stat.value.replace(/[^0-9.]/g, ''));
  const suffix = stat.value.replace(/[0-9.]/g, '');

  const displayValue =
    !isNaN(numericValue) && countedValue !== undefined
      ? `${countedValue}${suffix}`
      : stat.value;

  return (
    <li className={style.wrap}>
      <div className={style.statValue}>{displayValue}</div>
      <div className={style.statLabel}>{stat.label}</div>
      {stat.description && (
        <div className={style.statDescription}>{stat.description}</div>
      )}
    </li>
  );
};

export default StatItem;
