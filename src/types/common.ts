import { LOCALE } from '@/constants/common';

export type TLocales = (typeof LOCALE)[keyof typeof LOCALE];
