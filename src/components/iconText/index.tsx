import { FC } from 'react';

import { ICON_POSITION, IIconTextProps } from './index.type';

const IconText: FC<IIconTextProps> = ({ icon, children }) => {
  const { type: IconComponenet, position, ...iconRest } = icon || {};

  return (
    <div>
      {IconComponenet && position === ICON_POSITION.LEFT && (
        <IconComponenet {...iconRest} />
      )}
      <span>{children}</span>
      {IconComponenet && position === ICON_POSITION.RIGHT && (
        <IconComponenet {...iconRest} />
      )}
    </div>
  );
};

export default IconText;
