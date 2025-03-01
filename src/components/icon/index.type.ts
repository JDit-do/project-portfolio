import {
  MoonFilled,
  SunFilled,
  CaretDownFilled,
  CaretUpFilled
} from '@ant-design/icons';

import fill from './svg/logo';

/**
 * 아이콘 카테고리 정의 및 타입 정의
 * - `logo`: 로고
 * - `theme`: 테마
 * - `dropdown`: 드롭다운 관련 아이콘 (화살표 등)
 * @constant
 */
const ICON_TYPE_LOGO = {
  fill: fill
} as const;
type ICON_TYPE_LOGO = (typeof ICON_TYPE_LOGO)[keyof typeof ICON_TYPE_LOGO];
const ICON_TYPE_THEME = {
  darkMode: MoonFilled,
  lightMode: SunFilled
} as const;
type ICON_TYPE_THEME = (typeof ICON_TYPE_THEME)[keyof typeof ICON_TYPE_THEME];
const ICON_TYPE_DROPDOWN = {
  down: CaretDownFilled,
  up: CaretUpFilled
} as const;
type ICON_TYPE_DROPDOWN =
  (typeof ICON_TYPE_DROPDOWN)[keyof typeof ICON_TYPE_DROPDOWN];

export const ICON_TYPE = {
  ICON_TYPE_LOGO,
  ICON_TYPE_THEME,
  ICON_TYPE_DROPDOWN
} as const;

/**
 * 아이콘 Props 정의
 */
export interface IIconProps {
  /** 사용할 아이콘 */
  type: ICON_TYPE_LOGO | ICON_TYPE_THEME | ICON_TYPE_DROPDOWN;
  /** @default 24 */
  width?: string | number;
  height?: string | number;
}
