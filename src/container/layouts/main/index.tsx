import Global from '@/container/global';

import style from './index.module.scss';

const Main = ({ children }: React.PropsWithChildren) => {
  return (
    <main className={style.wrap}>
      {children}

      <Global />
    </main>
  );
};

export default Main;
