'use client';

import { useTranslations } from 'next-intl';

import { LOCALE } from '@/constants/common';
import { TLOCALE } from '@/types/common';

import { useLanguage } from '@/hooks/useLanguage';

import style from './index.module.scss';
import Dropdown from '@/components/dropdown';
import { DROPDOWN_DIRECTION } from '@/components/dropdown/index.type';

const Language = () => {
  const t = useTranslations('locale');
  const { locale, onChangeLanguage } = useLanguage();

  const handleChangeLanguage = (_locale: string) => {
    const locale = _locale as TLOCALE;

    onChangeLanguage(locale);
  };

  return (
    <div className={style.wrap}>
      <Dropdown
        label={t(locale)}
        direction={DROPDOWN_DIRECTION.UP}
        options={[
          { value: LOCALE.KO, label: t(LOCALE.KO) },
          { value: LOCALE.EN, label: t(LOCALE.EN) }
        ]}
        value={locale}
        onSelect={handleChangeLanguage}
      />
    </div>
  );
};

export default Language;
