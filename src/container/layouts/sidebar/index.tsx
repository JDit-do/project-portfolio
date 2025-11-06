import { Link } from '@/i18n/navigation';

import Icon from '@/components/icon';
import { ICON_TYPE } from '@/components/icon/index.type';
import IconLink from '@/components/iconLink';

import Language from '@/container/layouts/sidebar/language';

import style from './index.module.scss';

const Sidebar = () => {
  return (
    <aside role="complementary" aria-label="사이드바" className={style.wrap}>
      {/* 로고 */}
      <h1>
        <Link href="/" aria-label="홈으로 이동">
          <Icon type={ICON_TYPE.ICON_TYPE_LOGO.fill} height={28} />
        </Link>
      </h1>

      <div className={style.bottom}>
        {/* 외부 링크 */}
        <ul className={style.links}>
          <li>
            <IconLink
              href="https://blog.justdo.world/"
              iconCategory="ICON_TYPE_COMMON"
              iconKey="external"
              label="블로그"
              ariaLabel="블로그 새 창에서 열기"
            />
          </li>
          <li>
            <IconLink
              href="https://github.com/JDit-do/"
              iconCategory="ICON_TYPE_COMMON"
              iconKey="github"
              label="GitHub"
              ariaLabel="GitHub 새 창에서 열기"
            />
          </li>
        </ul>

        {/* 다국어 선택 */}
        <div className={style.footer}>
          <Language />
        </div>
      </div>
    </aside>
  );
};

export default Sidebar;
