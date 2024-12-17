import { getTranslations } from 'next-intl/server';

import { APIResponse, GnbItem } from '@/types/api';

import { APIEndpoints } from '@/constants/apiEndPoint';

import style from './index.module.scss';
import Link from 'next/link';

export default async function GNB() {
  const t = await getTranslations('navigation');

  const response = await fetch(APIEndpoints.navigation.gnb.url);
  const { data = [] }: APIResponse<GnbItem[]> = await response.json();

  return (
    <ul className={style.wrap}>
      {data.map(({ id, langKey, url }) => (
        <li key={`gnb-${id}`}>
          <Link href={url}>{t(langKey)}</Link>
        </li>
      ))}
    </ul>
  );
}
