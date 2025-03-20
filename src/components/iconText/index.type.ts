import { PropsWithChildren } from 'react';

import { IIconProps } from '../icon/index.type';

export const ICON_POSITION = {
  RIGHT: 'RIGHT',
  LEFT: 'LEFT'
} as const;
type ICON_POSITION = keyof typeof ICON_POSITION;

/**
 * IconText Props 정의
 */
interface IExtendedIconProps extends IIconProps {
  /** @default LEFT */
  position: ICON_POSITION;
}
/**
 * IconText Props 정의
 * @extends IIconProps - 사용시 icon 정의
 * @extends PropsWithChildren - text 등
 */
export interface IIconTextProps extends PropsWithChildren {
  icon?: IExtendedIconProps;
}
