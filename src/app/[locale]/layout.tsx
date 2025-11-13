import { notFound } from 'next/navigation';

import { routing } from '@/i18n/routing';
import { TLOCALE } from '@/types/common';

import Cursor from '@/components/cursor';
import ScrollRestore from '@/components/scrollRestore';

import Main from '@/container/layouts/main';
import Sidebar from '@/container/layouts/sidebar';

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
