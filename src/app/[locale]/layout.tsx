import { notFound } from 'next/navigation';

import { routing } from '@/config/i18n/routing';

import { TLOCALE } from '@/shared/types/common';
import Cursor from '@/shared/components/layout/cursor';
import ScrollRestore from '@/shared/components/layout/scrollRestore';
import Main from '@/shared/components/layout/main';
import Sidebar from '@/shared/components/layout/sidebar';

import style from './layout.module.scss';

export default async function LocaleLayout({
  children,
  params
}: {
  children: React.ReactNode;
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await params;
  if (!routing.locales.includes(locale as TLOCALE)) {
    notFound();
  }

  return (
    <>
      <ScrollRestore />
      <div className={style.wrap}>
        <Main>{children}</Main>
        <Sidebar />
      </div>
      <Cursor />
    </>
  );
}
