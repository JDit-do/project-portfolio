'use client';

import { useEffect, useRef } from 'react';

const HomeCanvas = () => {
  const ref = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const canvas = ref.current;
    if (!canvas) return;

    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    // 캔바스 크기 설정
    canvas.width = window.innerWidth;
    canvas.height = window.innerHeight;

    // 임시
    ctx.fillStyle = '#000000';
    ctx.fillRect(0, 0, canvas.width, canvas.height);
  }, []);

  return <canvas />;
};

export default HomeCanvas;
