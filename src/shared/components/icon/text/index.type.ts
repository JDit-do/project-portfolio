import { PropsWithChildren } from 'react';

import { IIconProps } from '@/shared/components/icon/base/index.type';

export const ICON_POSITION = {
  RIGHT: 'RIGHT',
  LEFT: 'LEFT'
} as const;

export type ICON_POSITION_TYPE = typeof ICON_POSITION[keyof typeof ICON_POSITION];

/**
 * IconText Props 정의
 */
export interface IExtendedIconProps extends IIconProps {
  /** @default LEFT */
  position: ICON_POSITION_TYPE;
}
/**
 * IconText Props 정의
 * @extends IIconProps - 사용시 icon 정의
 * @extends PropsWithChildren - text 등
 */
export interface IIconTextProps extends PropsWithChildren {
  icon?: IExtendedIconProps;
}
