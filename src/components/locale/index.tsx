'use client';

import { useTranslations } from 'next-intl';

import { useState } from 'react';

import { LOCALE } from '@/constants/common';
import { TLocales } from '@/types/common';

import { useLanhuage } from '@/hooks/useLanuage';

import Dropdown from '../dropdown';

import style from './index.module.scss';

const Locale = () => {
  const t = useTranslations('locale');
  const { onChangeLanguage, getLocale } = useLanhuage();

  const [locale, setLocale] = useState<TLocales>(getLocale());

  const handleChangeLanguage = (_locale: string) => {
    const locale = _locale as TLocales;

    onChangeLanguage(locale);
    setLocale(locale);
  };

  return (
    <div className={style.wrap}>
      <Dropdown
        label={t(locale)}
        options={[
          { value: LOCALE.KO, label: t(LOCALE.KO) },
          { value: LOCALE.EN, label: t(LOCALE.EN) }
        ]}
        onSelect={handleChangeLanguage}
      />
    </div>
  );
};

export default Locale;
