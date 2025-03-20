'use client';

import { IButton } from './index.type';
import style from './index.module.scss';

const Button = ({ onClick, children }: IButton) => {
  return (
    <button className={style.wrap} onClick={onClick}>
      {children}
    </button>
  );
};

export default Button;
