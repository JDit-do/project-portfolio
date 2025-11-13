import { ReactNode } from 'react';

// framer-motion이 지원하는 HTML 요소 타입
export type MotionElement = 
  | 'div'
  | 'span'
  | 'section'
  | 'article'
  | 'header'
  | 'footer'
  | 'nav'
  | 'aside'
  | 'main'
  | 'ul'
  | 'ol'
  | 'li'
  | 'a'
  | 'p'
  | 'h1'
  | 'h2'
  | 'h3'
  | 'h4'
  | 'h5'
  | 'h6';

export interface IBlurFadeProps {
  children: ReactNode;
  className?: string;
  variant?: {
    hidden: { y: number };
    visible: { y: number };
  };
  duration?: number;
  delay?: number;
  yOffset?: number;
  inView?: boolean;
  inViewMargin?: string;
  blur?: string;
  as?: MotionElement;
}

