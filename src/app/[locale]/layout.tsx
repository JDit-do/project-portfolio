import { notFound } from 'next/navigation';

import { routing } from '@/i18n/routing';
import { TLOCALE } from '@/types/common';

import Main from '@/container/layouts/main';
import Header from '@/container/layouts/header';
import Footer from '@/container/layouts/footer';

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
    <div className="wrap">
      <Header />
      <Main>{children}</Main>
      <Footer />
    </div>
  );
}
