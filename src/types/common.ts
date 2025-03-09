import { LOCALE, THEME } from '@/constants/common';

export type TLOCALE = (typeof LOCALE)[keyof typeof LOCALE];

export type THEME = (typeof THEME)[keyof typeof THEME];
