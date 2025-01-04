import Link from 'next/link';

import { getTranslations } from 'next-intl/server';

import { getPath } from '@/utils/header';
import { APIResponse, GnbItem } from '@/types/api';

import { APIEndpoints } from '@/constants/apiEndPoint';

import style from './index.module.scss';

export default async function GNB() {
  const path = await getPath();
  const t = await getTranslations('navigation');

  const response = await fetch(APIEndpoints.navigation.gnb.url);
  const { data = [] }: APIResponse<GnbItem[]> = await response.json();

  return (
    <ul className={style.wrap}>
      {data.map(({ id, langKey, url }) => (
        <li
          key={`gnb-${id}`}
          className={path === url ? style.active : undefined}
        >
          <Link href={url}>{t(langKey)}</Link>
        </li>
      ))}
    </ul>
  );
}
