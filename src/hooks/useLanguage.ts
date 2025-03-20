'use client';

import { useLocale } from 'next-intl';
import { useRouter, usePathname } from '@/i18n/navigation';
import { TLOCALE } from '@/types/common';

export const useLanguage = () => {
  const locale = useLocale();
  const router = useRouter();
  const pathname = usePathname();

  const onChangeLanguage = (locale: TLOCALE): void => {
    router.replace(pathname, { locale });
    router.refresh();
  };

  return { onChangeLanguage, locale };
};
