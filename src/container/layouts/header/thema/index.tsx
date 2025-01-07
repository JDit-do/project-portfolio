'use client';

import { useTheme } from 'next-themes';
import { useTranslations } from 'next-intl';

import { LOCALE, THEME } from '@/constants/common';

import Dropdown from '../../../../components/dropdown';

import style from './index.module.scss';

const Theme = () => {
  const t = useTranslations('theme');
  const { theme, setTheme } = useTheme();

  return (
    <div className={style.wrap}>
      <Dropdown
        label={t(theme) || THEME.SYSTEM}
        options={[
          { value: THEME.SYSTEM, label: t(THEME.SYSTEM) },
          { value: THEME.DARK, label: t(THEME.DARK) },
          { value: THEME.LIGHT, label: t(THEME.LIGHT) }
        ]}
        onSelect={setTheme}
      />
    </div>
  );
};

export default Theme;
