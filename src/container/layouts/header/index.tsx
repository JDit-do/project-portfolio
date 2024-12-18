import Icon from '@/components/icon';
import Locale from '@/components/locale';

import Gnb from './navigation/gnb';

import style from './index.module.scss';

const Header = () => {
  return (
    <header className={style.wrap}>
      <h1>
        <Icon type="logo" height={22} />
      </h1>

      <Gnb />

      <Locale />
    </header>
  );
};

export default Header;
