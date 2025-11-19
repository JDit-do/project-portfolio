'use client';

import { useEffect, useRef } from 'react';

import style from './index.module.scss';

const Cursor = () => {
  const dotRef = useRef<HTMLDivElement>(null);
  const ringRef = useRef<HTMLDivElement>(null);
  const mousePosRef = useRef({ x: 0, y: 0 });
  const hoveringRef = useRef(false);

  // 마우스 위치 및 hover 검사
  useEffect(() => {
    const checkHover = (x: number, y: number) => {
      const el = document.elementFromPoint(x, y);
      const isHover = !!el?.closest('a, button');

      hoveringRef.current = isHover;
      if (ringRef.current) {
        ringRef.current.classList.toggle(style.hover, isHover);
      }
    };

    const handleMouseMove = (e: MouseEvent) => {
      mousePosRef.current = { x: e.clientX, y: e.clientY };
      
      if (dotRef.current) {
        dotRef.current.style.transform = `translate3d(${e.clientX}px, ${e.clientY}px, 0)`;
      }

      checkHover(e.clientX, e.clientY);
    };
    const handleMouseDown = (e: MouseEvent) => {
      setTimeout(() => {
        checkHover(e.clientX, e.clientY);
      }, 1000);
    };

    window.addEventListener('mousemove', handleMouseMove);
    window.addEventListener('mousedown', handleMouseDown);
    return () => {
      window.removeEventListener('mousemove', handleMouseMove);
      window.removeEventListener('mousedown', handleMouseDown);
    };
  }, []);

  // ring 애니메이션
  useEffect(() => {
    let x = 0,
      y = 0;
    const follow = () => {
      const scale = hoveringRef.current ? 0.6 : 1.2;
      const { x: targetX, y: targetY } = mousePosRef.current;
      x += (targetX - x) * 0.2;
      y += (targetY - y) * 0.2;

      if (ringRef.current) {
        ringRef.current.style.transform = `translate3d(${x}px, ${y}px, 0) scale(${scale})`;
      }

      requestAnimationFrame(follow);
    };

    follow();
  }, []);

  return (
    <>
      <div ref={dotRef} className={`${style.cursorDot}`} />
      <div ref={ringRef} className={style.cursorRing} />
    </>
  );
};

export default Cursor;
