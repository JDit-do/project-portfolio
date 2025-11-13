'use client';

import { useRef } from 'react';
import { motion, useInView } from 'framer-motion';
import type { AchievementItem } from '../../../types';

import style from './index.module.scss';

interface AchievementCardProps {
  item: AchievementItem;
  stepNumber: number;
  delay: number;
}

/**
 * Achievement Card Component
 */
const AchievementCard = ({ item, stepNumber, delay }: AchievementCardProps) => {
  const ref = useRef<HTMLDivElement>(null);
  const isInView = useInView(ref, {
    once: true,
    margin: '0px 0px -150px 0px',
    amount: 0.2
  });

  return (
    <motion.div
      ref={ref}
      className={style.wrap}
      initial={{ opacity: 0, x: 100 }}
      animate={isInView ? { opacity: 1, x: 0 } : { opacity: 0, x: 100 }}
      transition={{
        duration: 0.8,
        delay,
        ease: [0.25, 0.1, 0.25, 1]
      }}
    >
      <h3 className={style.title}>
        {stepNumber}. {item.title}
      </h3>

      <ul className={style.content}>
        {Array.isArray(item.content) &&
          item.content.map((line: string, i: number) => (
            <li key={i} className={style.contentItem}>
              {line}
            </li>
          ))}
      </ul>

      <div className={style.point}>
        <strong className={style.pointLabel}>📌 포인트</strong>
        <p className={style.pointText}>{item.point}</p>
      </div>
    </motion.div>
  );
};

export default AchievementCard;
