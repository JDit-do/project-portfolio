'use client';

import { useEffect, useRef, useState, createElement } from 'react';
import { motion, useInView, HTMLMotionProps } from 'framer-motion';

import { IBlurFadeProps } from './index.type';

const BlurFade = ({
  children,
  className,
  variant,
  duration = 0.4,
  delay = 0,
  yOffset = 6,
  inView = true,
  inViewMargin = '-50px',
  blur = '6px',
  as = 'div'
}: IBlurFadeProps) => {
  const ref = useRef<HTMLDivElement | null>(null);
  const [isPrintMode, setIsPrintMode] = useState(false);

  useEffect(() => {
    const checkPrintMode = () => {
      const isPrint = window.matchMedia('print').matches;
      setIsPrintMode(isPrint);
    };

    checkPrintMode();

    const beforePrint = () => setIsPrintMode(true);
    const afterPrint = () => setIsPrintMode(false);

    window.addEventListener('beforeprint', beforePrint);
    window.addEventListener('afterprint', afterPrint);

    const mediaQuery = window.matchMedia('print');
    const handleChange = (e: MediaQueryListEvent) => {
      setIsPrintMode(e.matches);
    };

    mediaQuery.addEventListener('change', handleChange);

    return () => {
      window.removeEventListener('beforeprint', beforePrint);
      window.removeEventListener('afterprint', afterPrint);
      mediaQuery.removeEventListener('change', handleChange);
    };
  }, []);

  const inViewResult = useInView(ref, { 
    once: true,
    ...(inViewMargin && { margin: inViewMargin })
  } as Parameters<typeof useInView>[1]);
  const isInView = !inView || inViewResult || isPrintMode;

  const defaultVariants = {
    hidden: { y: yOffset, opacity: 0, filter: `blur(${blur})` },
    visible: { y: -yOffset, opacity: 1, filter: 'blur(0px)' }
  };

  const combinedVariants = variant || defaultVariants;

  if (isPrintMode) {
    return createElement(
      as,
      { ref, className },
      children
    ) as React.ReactElement;
  }

  // framer-motion의 motion 컴포넌트를 안전하게 가져오기
  const MotionComponent = motion[as as keyof typeof motion] as React.ComponentType<
    HTMLMotionProps<'div'>
  >;

  return (
    <MotionComponent
      ref={ref}
      initial="hidden"
      animate={isInView ? 'visible' : 'hidden'}
      exit="hidden"
      variants={combinedVariants}
      transition={{
        delay: 0.04 + delay,
        duration,
        ease: 'easeOut'
      }}
      className={className}
    >
      {children}
    </MotionComponent>
  );
};

export default BlurFade;

