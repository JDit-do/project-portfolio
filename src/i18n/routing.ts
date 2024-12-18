import { defineRouting } from 'next-intl/routing';
import { createNavigation } from 'next-intl/navigation';

import { LOCALE } from '@/constants/common';

export const routing = defineRouting({
  locales: [LOCALE.EN, LOCALE.KO],
  defaultLocale: LOCALE.KO
});

export const { Link, redirect, usePathname, useRouter, getPathname } =
  createNavigation(routing);
