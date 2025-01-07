'use client';

import { useState } from 'react';
import { useTranslations } from 'next-intl';

import { DROPDOWN_DIRECTION, DropdownProps } from './index.type';
import style from './index.module.scss';

const Dropdown = ({
  label,
  options,
  onSelect,
  direction = DROPDOWN_DIRECTION.DOWN,
  isShowClickMe
}: DropdownProps) => {
  const t = useTranslations('event');
  const [isOpen, setIsOpen] = useState<boolean>(false);

  return (
    <div className={`${style.wrap} ${style[direction]}`}>
      <button onClick={() => setIsOpen((prev) => !prev)}>
        <span className={isOpen ? style.active : undefined}>{label}</span>
        {isShowClickMe && <span className={style.evnet}>{t('click')}</span>}
      </button>

      {isOpen && (
        <ul>
          {options.map((option) => (
            <li
              key={String(option.value)}
              onClick={() => {
                onSelect(option.value);
                setIsOpen(false);
              }}
            >
              {option.label}
            </li>
          ))}
        </ul>
      )}
    </div>
  );
};

export default Dropdown;
