import { getLocale } from 'next-intl/server';
import { Link } from '@/i18n/navigation';

import { TLOCALE } from '@/types/common';
import { getPath } from '@/utils/header';
import { APIResponse, GnbItem } from '@/types/api';

import { APIEndpoints } from '@/constants/apiEndPoint';

import style from './index.module.scss';

export default async function GNB() {
  const path = await getPath();
  const locale = await getLocale();

  const response = await fetch(APIEndpoints.navigation.gnb.url, {
    next: { revalidate: 1800 }
  });
  const { data = [] }: APIResponse<GnbItem[]> = await response.json();

  if (!(data.length > 1)) return <></>;
  return (
    <ul className={style.wrap}>
      {data.map(({ id, url, menu }) => {
        const _locale = locale as TLOCALE;

        return (
          <li key={id} className={path === url ? style.active : undefined}>
            <Link href={url}>{menu[_locale]}</Link>
          </li>
        );
      })}
    </ul>
  );
}
