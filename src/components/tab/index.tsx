'use client';

import Button from '@/components/button';

import { ITabProps } from './index.type';
import style from './index.module.scss';

const Tab = <T extends string | number>({
  options,
  value,
  onChange
}: ITabProps<T>) => {
  return (
    <div className={style.wrap}>
      {options.map((option) => (
        <Button
          key={String(option.value)}
          onClick={() => onChange(option.value)}
          className={`${style.tab} ${value === option.value ? style.active : ''}`}
        >
          {option.label}
        </Button>
      ))}
    </div>
  );
};

export default Tab;