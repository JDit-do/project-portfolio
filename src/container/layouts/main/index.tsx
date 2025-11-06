import style from './index.module.scss';

const Main = ({ children }: React.PropsWithChildren) => {
  return <main className={style.wrap}>{children}</main>;
};

export default Main;
