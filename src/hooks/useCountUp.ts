import { useEffect, useState, useRef } from 'react';

import { COUNT_UP } from '@/constants/common';

/**
 * 숫자 카운트업 훅(애니메이션)
 */
export const useCountUp = (
  values: string[],
  duration: number = COUNT_UP.DEFAULT_DURATION
) => {
  const [countedValues, setCountedValues] = useState<Record<number, number>>(
    {}
  );
  const timersRef = useRef<Array<NodeJS.Timeout>>([]);

  useEffect(() => {
    // 기존 타이머 정리
    timersRef.current.forEach((timer) => {
      clearInterval(timer);
    });
    timersRef.current = [];

    // 초기값을 0으로 설정
    const initialValues: Record<number, number> = {};
    values.forEach((_, index) => {
      initialValues[index] = 0;
    });
    setCountedValues(initialValues);

    // 각 값에 대해 카운트업 시작
    values.forEach((value, index) => {
      const numericValue = parseFloat(value.replace(/[^0-9.]/g, ''));
      if (!isNaN(numericValue)) {
        const steps = COUNT_UP.STEPS;
        const increment = numericValue / steps;
        let current = 0;

        const timer = setInterval(() => {
          current += increment;
          if (current >= numericValue) {
            current = numericValue;
            clearInterval(timer);
            timersRef.current = timersRef.current.filter((t) => t !== timer);
          }
          setCountedValues((prev) => ({
            ...prev,
            [index]: Math.floor(current)
          }));
        }, duration / steps);

        timersRef.current.push(timer);
      } else {
        // 숫자가 아닌 경우 원본 값의 숫자 부분을 추출하여 초기값으로 설정
        const numericValue = parseFloat(value.replace(/[^0-9.]/g, ''));
        if (!isNaN(numericValue)) {
          setCountedValues((prev) => ({
            ...prev,
            [index]: numericValue
          }));
        }
      }
    });

    return () => {
      timersRef.current.forEach((timer) => {
        clearInterval(timer);
      });
      timersRef.current = [];
    };
  }, [values, duration]);

  return countedValues;
};
