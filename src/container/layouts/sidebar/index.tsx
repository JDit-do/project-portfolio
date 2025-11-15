import { getTranslations } from 'next-intl/server';

import { APIResponse, GnbItem } from '@/types/api';

import { APIEndpoints } from '@/constants/apiEndPoint';

import IconLink from '@/components/iconLink';

import Language from '@/container/layouts/sidebar/language';
import GNBClient from './gnb/client';

import style from './index.module.scss';

export default async function Sidebar() {
  const t = await getTranslations('accessibility');
  
  const response = await fetch(APIEndpoints.navigation.gnb.url, {
    next: { revalidate: 1800 }
  });
  const { data = [] }: APIResponse<GnbItem[]> = await response.json();

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
