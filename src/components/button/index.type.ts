import { PropsWithChildren } from 'react';

export interface IButton extends PropsWithChildren {
  onClick: () => void;
}
