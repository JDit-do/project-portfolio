import { unstable_cache } from 'next/cache';
import { getTranslations } from 'next-intl/server';

import { GnbItem } from '@/shared/types/api';
import IconLink from '@/shared/components/icon/link';
import Language from '@/shared/components/layout/language';

import GNBClient from '@/features/navigation/components/gnb/client';
import { getGnb } from '@/features/navigation/lib/getGnb';

import style from './index.module.scss';

/**
 * 서버 컴포넌트에서 직접 GNB 데이터 가져오기
 * API Route를 거치지 않고 공통 함수를 직접 호출하여 효율적
 */
async function getGnbData(): Promise<GnbItem[]> {
  try {
    // 캐싱 적용 (30분)
    const cachedGetGnb = unstable_cache(
      async () => {
        return await getGnb();
      },
      ['gnb-list'],
      {
        revalidate: 1800 // 30분
      }
    );

    return await cachedGetGnb();
  } catch (error) {
    console.error('Error fetching GNB data:', error);
    return [];
  }
}

export default async function Sidebar() {
  const t = await getTranslations('accessibility');
  const data = await getGnbData();

  if (!(data.length > 0)) return <></>;
  return (
    <nav className={style.wrap} role="Sidebar" aria-label={t('sidebar')}>
      {/* 링크 */}
      <ul className={style.links}>
        <li>
          <IconLink
            href="https://blog.justdo.world/"
            iconCategory="ICON_TYPE_COMMON"
            iconKey="external"
            label="블로그"
            ariaLabel={t('blogOpen')}
          />
        </li>
        <li>
          <IconLink
            href="https://github.com/JDit-do/"
            iconCategory="ICON_TYPE_COMMON"
            iconKey="github"
            label="GitHub"
            ariaLabel={t('githubOpen')}
          />
        </li>
      </ul>

      {/* G.N.B */}
      <GNBClient items={data} />

      {/* 다국어 선택 */}
      <div className={style.language}>
        <Language />
      </div>
    </nav>
  );
}
