import style from './index.module.scss';

interface props extends React.PropsWithChildren {}

const Main: React.FC<props> = ({ children }) => {
  return <main className={style.wrap}>{children}</main>;
};

export default Main;
