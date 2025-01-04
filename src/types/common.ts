import { LOCALE, THEME } from '@/constants/common';

export type TLocales = (typeof LOCALE)[keyof typeof LOCALE];

export type THEME = (typeof THEME)[keyof typeof THEME];
