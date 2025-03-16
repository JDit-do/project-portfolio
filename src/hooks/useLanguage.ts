'use client';

import { useLocale } from 'next-intl';

import { usePathname, useRouter } from 'next/navigation';

import { TLOCALE } from '@/types/common';

export const useLanguage = () => {
  const locale = useLocale();
  const router = useRouter();
  const pathname = usePathname();

  const onChangeLanguage = (locale: TLOCALE): void => {
    const newPath = pathname.replace(/^\/[a-z]{2}/, `/${locale}`);
    router.push(newPath);
    router.refresh();
  };

  return { onChangeLanguage, locale };
};
