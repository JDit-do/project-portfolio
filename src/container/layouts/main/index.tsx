import Global from '@/container/global';

import style from './index.module.scss';
import { FC } from 'react';

interface props extends React.PropsWithChildren {}

const Main: FC<props> = ({ children }) => {
  return (
    <main className={style.wrap}>
      {children}

      <Global />
    </main>
  );
};

export default Main;
