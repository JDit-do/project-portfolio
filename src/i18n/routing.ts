import { defineRouting } from 'next-intl/routing';
import { createNavigation } from 'next-intl/navigation';

export type TLocales = 'en' | 'kr';

export const routing = defineRouting({
  locales: ['en', 'kr'],
  defaultLocale: 'kr'
});

export const { Link, redirect, usePathname, useRouter, getPathname } =
  createNavigation(routing);
