export type IconCategory = 
  | 'ICON_TYPE_LOGO'
  | 'ICON_TYPE_THEME'
  | 'ICON_TYPE_DROPDOWN'
  | 'ICON_TYPE_PRINCIPLE'
  | 'ICON_TYPE_PROJECT'
  | 'ICON_TYPE_COMMON';

export interface IIconLinkProps {
  href: string;
  iconCategory: IconCategory;
  iconKey: string;
  label: string;
  ariaLabel?: string;
  className?: string;
}

