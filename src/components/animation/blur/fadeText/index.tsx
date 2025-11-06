'use client';

import BlurFade from '../fade';
import { IBlurFadeTextProps } from './index.type';

const BlurFadeText = ({
  text,
  className,
  delay = 0,
  yOffset = 8
}: IBlurFadeTextProps) => {
  return (
    <BlurFade delay={delay} yOffset={yOffset} className={className}>
      {text}
    </BlurFade>
  );
};

export default BlurFadeText;

