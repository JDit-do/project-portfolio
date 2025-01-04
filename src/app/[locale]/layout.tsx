import { Metadata, Viewport } from 'next';
import { notFound } from 'next/navigation';

import { NextIntlClientProvider } from 'next-intl';
import { getMessages } from 'next-intl/server';

import { METADATA, VIEWPORT } from '@/config/seo/defaultSeoConfig';
import { routing } from '@/i18n/routing';
import { TLocales } from '@/types/common';

import Main from '@/container/layouts/main';
import Header from '@/container/layouts/header';
import Footer from '@/container/layouts/footer';

import '@/styles/globals.scss';
import { ThemeProvider } from '@/components/provider/theme-provider';

export const metadata: Metadata = METADATA;
export const viewport: Viewport = VIEWPORT;

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

  const messages = await getMessages({ locale });

  return (
    <html lang={locale} suppressHydrationWarning>
      <body>
        <ThemeProvider>
          <NextIntlClientProvider messages={messages}>
            <Header />
            <Main>{children}</Main>
            <Footer />
          </NextIntlClientProvider>
        </ThemeProvider>
      </body>
    </html>
  );
}
