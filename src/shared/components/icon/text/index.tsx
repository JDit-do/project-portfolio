import { FC } from 'react';

import { ICON_POSITION, IIconTextProps, IExtendedIconProps } from './index.type';

const IconText: FC<IIconTextProps> = ({ icon, children }) => {
  if (!icon) {
    return <div><span>{children}</span></div>;
  }
  
  const { type: IconComponenet, position, ...iconRest } = icon as IExtendedIconProps;

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
