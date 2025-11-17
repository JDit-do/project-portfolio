import type { NextConfig } from 'next';
import createNextIntlPlugin from 'next-intl/plugin';

const withNextIntl = createNextIntlPlugin();
const nextConfig: NextConfig = {
  // React Strict Mode 활성화 (개발 모드에서 추가 검사)
  reactStrictMode: true,
  
  // 외부 이미지 호스트 설정
  images: {
    remotePatterns: [
      {
        protocol: 'https',
        hostname: 'images.unsplash.com',
        pathname: '/**'
      },
      {
        protocol: 'https',
        hostname: '**.notion.so',
        pathname: '/**'
      },
      {
        protocol: 'https',
        hostname: '**.notion-static.com',
        pathname: '/**'
      },
      {
        protocol: 'https',
        hostname: '**.amazonaws.com',
        pathname: '/**'
      },
      {
        protocol: 'https',
        hostname: '**.githubusercontent.com',
        pathname: '/**'
      },
      {
        protocol: 'https',
        hostname: 'skillicons.dev',
        pathname: '/**'
      },
      {
        protocol: 'https',
        hostname: 'cdn.jsdelivr.net',
        pathname: '/**'
      }
    ]
  },
  
  webpack(config) {
    // SVG 처리
    config.module.rules.push({
      test: /\.svg$/,
      use: [
        {
          loader: '@svgr/webpack',
          options: {
            svgo: true,
            svgoConfig: {
              plugins: [
                {
                  name: 'preset-default',
                  params: {
                    overrides: { removeViewBox: false }
                  }
                }
              ]
            }
          }
        }
      ]
    });

    return config;
  }
};

export default withNextIntl(nextConfig);
