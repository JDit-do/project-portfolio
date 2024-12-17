import Icon from '@/components/icon';

import style from './index.module.scss';

const Header = () => {
  return (
    <header className={style.wrap}>
      <h1>
        <Icon type="logo" height={22} />
      </h1>
    </header>
  );
};

export default Header;
