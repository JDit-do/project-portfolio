import { notFound } from 'next/navigation';

import { NextIntlClientProvider } from 'next-intl';
import { getMessages } from 'next-intl/server';

import { routing, TLocales } from '@/i18n/routing';

import Main from '@/container/layouts/main';
import Header from '@/container/layouts/header';
import Footer from '@/container/layouts/footer';

import '@/styles/globals.scss';

export default async function RootLayout({
  children,
  params
}: {
  children: React.ReactNode;
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await params;
  if (!routing.locales.includes(locale as TLocales)) {
    notFound();
  }

  const messages = await getMessages();

  return (
    <html lang={locale}>
      <body>
        <NextIntlClientProvider messages={messages}>
          <Header />
          <Main>{children}</Main>
          <Footer />
        </NextIntlClientProvider>
      </body>
    </html>
  );
}
