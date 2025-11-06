'use client';

import { IButton } from './index.type';
import style from './index.module.scss';

const Button = ({ onClick, children, className }: IButton) => {
  return (
    <button className={`${style.wrap} ${className || ''}`} onClick={onClick}>
      {children}
    </button>
  );
};

export default Button;
