'use client';

import { IButton } from './index.type';
import style from './index.module.scss';

const Button = ({
  onClick,
  children,
  className,
  ariaLabel,
  type = 'button',
  role,
  'aria-selected': ariaSelected
}: IButton) => {
  return (
    <button
      type={type}
      className={`${style.wrap} ${className || ''}`}
      onClick={onClick}
      aria-label={ariaLabel}
      role={role}
      aria-selected={ariaSelected}
    >
      {children}
    </button>
  );
};

export default Button;
