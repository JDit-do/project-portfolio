'use client';

import { useTranslations } from 'next-intl';

import { TLOCALE } from '@/types/common';

import { useLanguage } from '@/hooks/useLanguage';

import Dropdown from '@/components/dropdown';
import { DROPDOWN_DIRECTION } from '@/components/dropdown/index.type';
import { LOCALE } from '@/constants/common';

import style from './index.module.scss';

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
          { value: LOCALE.KO, label: t('koMessage') },
          { value: LOCALE.EN, label: t('enMessage') }
        ]}
        value={locale}
        onSelect={handleChangeLanguage}
      />
    </div>
  );
};

export default Language;
