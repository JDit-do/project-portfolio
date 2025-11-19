'use client';

import { usePathname } from '@/config/i18n/navigation';
import style from './index.module.scss';

const Main = ({ children }: React.PropsWithChildren) => {
  const pathname = usePathname();
  const isHomePage =
    pathname === '/' || pathname === '/ko' || pathname === '/en';

  return (
    <main className={`${style.wrap} ${isHomePage ? style.homePage : ''}`}>
      {children}
    </main>
  );
};

export default Main;
