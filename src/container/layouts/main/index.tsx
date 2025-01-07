import style from './index.module.scss';
import SectionPersona from './srctions/persona';

interface props extends React.PropsWithChildren {}

const Main: React.FC<props> = ({ children }) => {
  return (
    <main className={style.wrap}>
      {children}

      <SectionPersona />
    </main>
  );
};

export default Main;
