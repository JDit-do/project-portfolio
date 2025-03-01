import { FC } from 'react';

import { IIconProps } from './index.type';

const Icon: FC<IIconProps> = ({ type: IconComponenet, ...props }) => {
  if (!IconComponenet) return null;

  return <IconComponenet {...props} />;
};

export default Icon;
