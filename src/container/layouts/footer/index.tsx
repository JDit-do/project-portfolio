import style from './index.module.scss';

const Footer = () => {
  return (
    <footer className={style.wrap}>
      <div>
        <p>현재 이 사이트는 PC와 Chrome에서 최적의 사용성을 제공합니다.</p>
        <small>&copy; 2025 JD(Mihyeon Ju). All rights reserved.</small>
      </div>
    </footer>
  );
};

export default Footer;
