import { getRequestConfig } from 'next-intl/server';

import { TLOCALE } from '@/types/common';

import { routing } from './routing';

export default getRequestConfig(async ({ requestLocale }) => {
  const requested = await requestLocale;
  const locale = routing.locales.includes(requested as TLOCALE)
    ? requested
    : routing.defaultLocale;

  return {
    locale,
    messages: (await import(`../../public/locales/${locale}.json`)).default
  };
});
