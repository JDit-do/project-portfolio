'use client';

import { useTheme } from 'next-themes';
import { useTranslations } from 'next-intl';

import { THEME } from '@/constants/common';
import Dropdown from '@/components/dropdown';

import style from './index.module.scss';
import { DROPDOWN_DIRECTION } from '@/components/dropdown/index.type';

const Theme = () => {
  const t = useTranslations('theme');
  const { theme, setTheme } = useTheme();

  return (
    <div className={style.wrap}>
      <Dropdown
        label={t(theme)}
        direction={DROPDOWN_DIRECTION.UP}
        options={[
          { value: THEME.DARK, label: t(THEME.DARK) },
          { value: THEME.LIGHT, label: t(THEME.LIGHT) }
        ]}
        value={theme}
        onSelect={setTheme}
      />
    </div>
  );
};

export default Theme;
