import Icon from '@/components/icon';
import { ICON_TYPE } from '@/components/icon/index.type';

import Gnb from './navigation/gnb';

import style from './index.module.scss';

const Header = () => {
  return (
    <header className={style.wrap}>
      <h1>
        <Icon type={ICON_TYPE.ICON_TYPE_LOGO.fill} height={20} />
      </h1>

      <Gnb />
    </header>
  );
};

export default Header;
