import { Metadata, Viewport } from 'next';
import { cookies } from 'next/headers';
import { NextIntlClientProvider } from 'next-intl';
import { getMessages } from 'next-intl/server';

import { routing } from '@/config/i18n/routing';
import { METADATA, VIEWPORT } from '@/config/seo/defaultSeoConfig';

import { LOCALE_ID } from '@/shared/lib/notion/config';
import { ThemeProvider } from '@/shared/components/provider/theme-provider';
import ErrorBoundary from '@/shared/components/layout/errorBoundary';

import '@/shared/styles/globals.css'; // Tailwind 변수 및 유틸리티
import '@/shared/styles/globals.scss'; // 레이아웃 및 전역 스타일

export const metadata: Metadata = METADATA;
export const viewport: Viewport = VIEWPORT;
export default async function RootLayout({
  children
}: {
  children: React.ReactNode;
}) {
  const cookieStore = await cookies();
  const locale = cookieStore.get(LOCALE_ID)?.value || routing.defaultLocale;
  const messages = await getMessages({ locale });

  return (
    <html lang={locale} suppressHydrationWarning>
      <head>
        <link rel="preconnect" href="https://cdn.jsdelivr.net" />
        <link
          rel="stylesheet"
          href="https://cdn.jsdelivr.net/gh/orioncactus/pretendard@v1.3.9/dist/web/static/pretendard-dynamic-subset.min.css"
          crossOrigin="anonymous"
        />
      </head>
      <body>
        <ErrorBoundary>
          <ThemeProvider>
            <NextIntlClientProvider messages={messages}>
              {children}
            </NextIntlClientProvider>
          </ThemeProvider>
        </ErrorBoundary>
      </body>
    </html>
  );
}
