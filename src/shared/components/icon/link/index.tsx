'use client';

import Icon from '@/shared/components/icon/base';
import { ICON_TYPE } from '@/shared/components/icon/base/index.type';
import useHover from '@/shared/hooks/useHover';

import { IIconLinkProps } from './index.type';
import style from './index.module.scss';

const IconLink = ({
  href,
  iconCategory,
  iconKey,
  label,
  ariaLabel,
  className
}: IIconLinkProps) => {
  const { ref, isHovered } = useHover<HTMLAnchorElement>();

  // Server Component에서 전달된 문자열로 아이콘 타입 가져오기
  const iconType =
    ICON_TYPE[iconCategory]?.[
      iconKey as keyof (typeof ICON_TYPE)[typeof iconCategory]
    ];
  if (!iconType) {
    console.warn(`Icon not found: ${iconCategory}.${iconKey}`);
    return null;
  }

  return (
    <a
      ref={ref}
      href={href}
      target="_blank"
      rel="noopener noreferrer"
      aria-label={ariaLabel || label}
      className={`${style.link} ${isHovered ? style.hovered : ''} ${className || ''}`}
    >
      <Icon type={iconType} />
      <span className={style.label}>{label}</span>
    </a>
  );
};

export default IconLink;
