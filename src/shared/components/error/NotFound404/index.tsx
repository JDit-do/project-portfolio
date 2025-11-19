import { useTranslations } from 'next-intl';

import { Link } from '@/config/i18n/navigation';

import Icon from '@/shared/components/icon/base';
import { ICON_TYPE } from '@/shared/components/icon/base/index.type';

import style from './index.module.scss';

const NotFound404 = () => {
  const t = useTranslations('error');

  return (
    <div className={style.wrap}>
      <h1>
        <Icon type={ICON_TYPE.ICON_TYPE_LOGO.fill} height={20} />
        <span>JD</span>
      </h1>

      <div>
        <p>{t('404.data1')}</p>
        <p>{t('404.data2')}</p>

        <div className={style.buttons}>
          <Link href="/">{t('404.label')}</Link>
        </div>
      </div>
    </div>
  );
};

export default NotFound404;
