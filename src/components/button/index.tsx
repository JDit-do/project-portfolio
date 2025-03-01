'use client';

import { IButton } from './index.type';
import style from './index.module.scss';

const Button = ({ children }: IButton) => {
  return <button className={style.wrap}>{children}</button>;
};

export default Button;
