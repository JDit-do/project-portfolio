'use client';

import { usePathname, useRouter } from 'next/navigation';

import { TLOCALE } from '@/types/common';
import { LOCALE } from '@/constants/common';

export const useLanguage = () => {
  const router = useRouter();
  const pathname = usePathname();

  const onChangeLanguage = (locale: TLOCALE): void => {
    document.cookie = `NEXT_LOCALE=${locale}; path=/; max-age=31536000`;

    const newPath = pathname.replace(/^\/[a-z]{2}/, `/${locale}`);
    router.push(newPath);
  };

  const getLocale = (): TLOCALE | null => {
    const isClient = typeof document !== 'undefined';

    if (!isClient) return null;
    let cookie = document.cookie
      .split('; ')
      .find((row) => row.startsWith('NEXT_LOCALE='));
    cookie = cookie ? cookie.split('=')[1] : undefined;

    const locale = cookie && cookie in LOCALE ? cookie : LOCALE.KO;

    return locale as TLOCALE;
  };

  return { onChangeLanguage, getLocale };
};
