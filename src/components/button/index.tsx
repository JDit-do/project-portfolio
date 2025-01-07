'use client';

import { useCallback } from 'react';
import { useTranslations } from 'next-intl';

import IconDownload from '@/components/icon/svg/download';
import IconLink from '@/components/icon/svg/link';

import { ButtonProps, BUTTON_TYPE } from './index.type';
import style from './index.module.scss';

const Button = ({ button, download, link }: ButtonProps) => {
  const t = useTranslations('common');

  const handleDownload = useCallback(() => {
    const link = document.createElement('a');
    link.href = download as string;
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  }, []);

  const handleLink = useCallback(() => {
    window.open(link, '_blank', 'noopener noreferrer');
  }, []);

  let handleOnClick = button?.onClick;
  let type: BUTTON_TYPE = BUTTON_TYPE.BUTTON;
  let icon: null | React.ReactNode = null;
  if (download) {
    handleOnClick = handleDownload;
    type = BUTTON_TYPE.DOWNLOAD;
    icon = <IconDownload width={16} hanging={16} />;
  }
  if (link) {
    handleOnClick = handleLink;
    type = BUTTON_TYPE.LINK;
    icon = <IconLink width={16} hanging={16} />;
  }

  return (
    <div className={style.wrap}>
      <button type="button" onClick={handleOnClick}>
        {icon}
        {type !== BUTTON_TYPE.BUTTON ? t(type) : button?.label}
      </button>
    </div>
  );
};

export default Button;
