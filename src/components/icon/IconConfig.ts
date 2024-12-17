import logo from './svg/logo';

export const IconConfig: Record<
  string,
  React.FC<React.SVGProps<SVGSVGElement>>
> = {
  logo
} as const;
