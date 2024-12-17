import { IconConfig } from './IconConfig';

export type TICON_TYPE = keyof typeof IconConfig;
export default interface IIconProps {
  type: TICON_TYPE;
  width?: number;
  height?: number;
}
