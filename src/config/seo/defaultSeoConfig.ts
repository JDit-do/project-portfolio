import { Metadata, Viewport } from 'next';

export const METADATA: Metadata = {
  title: 'JD',
  description: 'Just do it!',

  applicationName: 'Mihyeon',
  keywords: ['Frontend Developer', 'JD', 'Web Portfolio'],
  robots: 'index, follow',

  openGraph: {
    title: '[JD] Portfolio',
    description:
      'Frontend Developer | Crafting intuitive and high-performance web experiences.',
    images: [
      {
        url: '/images/open-graph.png',
        width: 800,
        height: 600,
        alt: 'JD 이미지'
      }
    ]
  }
};

export const VIEWPORT: Viewport = {
  width: 'device-width',
  initialScale: 1
};
