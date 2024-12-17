import Icon from '@/components/icon';

import style from './index.module.scss';
import Gnb from './navigation/gnb';

const Header = () => {
  return (
    <header className={style.wrap}>
      <h1>
        <Icon type="logo" height={22} />
      </h1>

      <Gnb />
    </header>
  );
};

export default Header;
