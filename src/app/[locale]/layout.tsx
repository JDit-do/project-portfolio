import { notFound } from 'next/navigation';

import { routing } from '@/i18n/routing';
import { TLOCALE } from '@/types/common';

import Cursor from '@/components/cursor';

import Main from '@/container/layouts/main';
import Sidebar from '@/container/layouts/sidebar';

import style from './layout.module.scss';
import GNB from '@/container/layouts/sidebar/gnb';

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
      <div className={style.wrap}>
        <Sidebar />
        <Main>{children}</Main>
        <GNB />
      </div>
      <Cursor />
    </>
  );
}
