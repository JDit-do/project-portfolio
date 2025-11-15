import { PropsWithChildren, AriaRole } from 'react';

export interface IButton extends PropsWithChildren {
  onClick: () => void;
  className?: string;
  ariaLabel?: string;
  type?: 'button' | 'submit' | 'reset';
  role?: AriaRole;
  'aria-selected'?: boolean;
}
