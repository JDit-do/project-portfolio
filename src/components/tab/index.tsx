'use client';

import { useTranslations } from 'next-intl';

import Button from '@/components/button';

import { ITabProps } from './index.type';
import style from './index.module.scss';

const Tab = <T extends string | number>({
  options,
  value,
  onChange
}: ITabProps<T>) => {
  const t = useTranslations('accessibility');

  return (
    <div className={style.wrap} role="tablist" aria-label={t('projectCategory')}>
      {options.map((option) => (
        <Button
          key={String(option.value)}
          onClick={() => onChange(option.value)}
          className={`${style.tab} ${value === option.value ? style.active : ''}`}
          ariaLabel={`${option.label} ${t('tabView')}`}
          aria-selected={value === option.value}
          role="tab"
        >
          {option.label}
        </Button>
      ))}
    </div>
  );
};

export default Tab;