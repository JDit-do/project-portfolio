import { Metadata, Viewport } from 'next';
import { cookies } from 'next/headers';

import { NextIntlClientProvider } from 'next-intl';
import { getMessages } from 'next-intl/server';

import Script from 'next/script';

import { routing } from '@/i18n/routing';
import { LOCALE_ID } from '@/lib/notion/config';
import { METADATA, VIEWPORT } from '@/config/seo/defaultSeoConfig';
import { ThemeProvider } from '@/components/provider/theme-provider';

import '@/styles/globals.scss';

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
        <link
          rel="stylesheet"
          as="style"
          href="https://cdn.jsdelivr.net/gh/orioncactus/pretendard@v1.3.9/dist/web/static/pretendard-dynamic-subset.min.css"
        />
      </head>
      <body>
        <Script
          src="/scripts/error-filter.js"
          strategy="afterInteractive"
        />
        <ThemeProvider>
          <NextIntlClientProvider messages={messages}>
            {children}
          </NextIntlClientProvider>
        </ThemeProvider>
      </body>
    </html>
  );
}
