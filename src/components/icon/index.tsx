'use client';

import { useIconContext } from './IconProvider';
import { IconConfig } from './IconConfig';
import IIconProps from './index.type';

const Icon: React.FC<IIconProps> = ({ type, width, height, ...props }) => {
  const { width: globalWidth, height: globalHeight } = useIconContext();

  const Component = IconConfig[type] || IconConfig.logo;

  return (
    <Component
      width={width || globalWidth}
      height={height || globalWidth}
      {...props}
    />
  );
};

export default Icon;
