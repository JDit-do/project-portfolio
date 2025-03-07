import {
  MoonFilled,
  SunFilled,
  CaretDownFilled,
  CaretUpFilled,
  ToolFilled,
  BulbFilled,
  LikeFilled
} from '@ant-design/icons';

import fill from './svg/logo';

/**
 * 아이콘 카테고리 정의 및 타입 정의
 * - `logo`: 로고
 * - `theme`: 테마
 * - `dropdown`: 드롭다운 관련 아이콘 (화살표 등)
 * - `principle`: 신념 및 철학
 * @constant
 */
// [아이콘] 로고
const ICON_TYPE_LOGO = {
  fill: fill
} as const;
type ICON_TYPE_LOGO = (typeof ICON_TYPE_LOGO)[keyof typeof ICON_TYPE_LOGO];
// [아이콘] 테마
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
// [아이콘] 신념 및 마인드
const ICON_TYPE_PRINCIPLE = {
  tool: ToolFilled,
  bulb: BulbFilled,
  like: LikeFilled
} as const;
type ICON_TYPE_PRINCIPLE =
  (typeof ICON_TYPE_PRINCIPLE)[keyof typeof ICON_TYPE_PRINCIPLE];

export const ICON_TYPE = {
  ICON_TYPE_LOGO,
  ICON_TYPE_THEME,
  ICON_TYPE_DROPDOWN,
  ICON_TYPE_PRINCIPLE
} as const;
export type TICON_TYPE =
  | ICON_TYPE_LOGO
  | ICON_TYPE_THEME
  | ICON_TYPE_DROPDOWN
  | ICON_TYPE_PRINCIPLE;

/**
 * 아이콘 Props 정의
 */
export interface IIconProps {
  /** 사용할 아이콘 */
  type: TICON_TYPE;
  /** @default 24 */
  width?: string | number;
  height?: string | number;
}
