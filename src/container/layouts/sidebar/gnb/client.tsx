'use client';

import { useLocale } from 'next-intl';
import { usePathname } from '@/i18n/navigation';
import { Link } from '@/i18n/navigation';

import { TLOCALE } from '@/types/common';
import { GnbItem } from '@/types/api';

import style from '../index.module.scss';

interface GNBClientProps {
  items: GnbItem[];
}

/**
 * GNB 클라이언트 컴포넌트
 */
export default function GNBClient({ items }: GNBClientProps) {
  const locale = useLocale() as TLOCALE;
  const pathname = usePathname();

  // usePathname은 locale을 제외한 경로를 반환 (예: '/projects', '/')
  const currentPath = pathname || '/';

  return (
    <ul className={style.gnbWrap}>
      {items.map(({ id, url, menu }) => {
        // 경로 매칭: 정확히 일치하거나 하위 경로인 경우
        const isActive = currentPath === url || currentPath.startsWith(url + '/');

        return (
          <li key={id} className={isActive ? style.active : undefined}>
            <Link href={url}>{menu[locale]}</Link>
          </li>
        );
      })}
    </ul>
  );
}

