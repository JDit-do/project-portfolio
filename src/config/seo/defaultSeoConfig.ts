import { Metadata, Viewport } from 'next';

const url = process.env.METADATA_BASE || 'http://localhost:3000';

export const METADATA: Metadata = {
  metadataBase: new URL(url),
  title: 'JD',
  description: 'Just do it!',

  applicationName: 'Mihyeon',
  keywords: ['Frontend Developer', 'JD', 'Web Portfolio'],
  robots: 'index, follow',

  openGraph: {
    type: 'website',
    title: 'JD Portfolio',
    siteName: 'JD Portfolio',
    description:
      'Frontend Developer | Crafting intuitive and high-performance web experiences.',
    url: new URL(url),
    images: [
      {
        url: '/opengraph/open-graph.jpg',
        width: 800,
        height: 600,
        alt: 'JD Logo'
      }
    ]
  }
};

export const VIEWPORT: Viewport = {
  width: 'device-width',
  initialScale: 1
};
