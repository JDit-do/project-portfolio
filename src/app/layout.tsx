import { Metadata, Viewport } from 'next';

import { NextIntlClientProvider } from 'next-intl';
import { getMessages } from 'next-intl/server';

import { METADATA, VIEWPORT } from '@/config/seo/defaultSeoConfig';
import { ThemeProvider } from '@/components/provider/theme-provider';

import '@/styles/globals.scss';

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
        <ThemeProvider>
          <NextIntlClientProvider messages={messages}>
            {children}
          </NextIntlClientProvider>
        </ThemeProvider>
      </body>
    </html>
  );
}
