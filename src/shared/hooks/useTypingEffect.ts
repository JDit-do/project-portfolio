import { useEffect, useState, useRef } from 'react';

/**
 * 타이핑 효과 훅
 */
export const useTypingEffect = (
  text: string,
  typingSpeed: number = 100,
  startDelay: number = 500
) => {
  const [displayedText, setDisplayedText] = useState('');
  const [isTyping, setIsTyping] = useState(false);
  const timersRef = useRef<Array<NodeJS.Timeout>>([]);

  useEffect(() => {
    // 기존 타이머 정리
    timersRef.current.forEach((timer) => {
      clearTimeout(timer);
    });
    timersRef.current = [];

    // 초기 상태 리셋
    setDisplayedText('');
    setIsTyping(false);

    if (!text || text.length === 0) return;

    // 시작 지연
    const startTimer = setTimeout(() => {
      setIsTyping(true);
      let currentIndex = 0;

      const typeChar = () => {
        if (currentIndex < text.length) {
          const newText = text.slice(0, currentIndex + 1);
          setDisplayedText(newText);
          currentIndex++;

          if (currentIndex < text.length) {
            const timer = setTimeout(typeChar, typingSpeed);
            timersRef.current.push(timer);
          } else {
            setIsTyping(false);
          }
        }
      };

      // 첫 글자부터 시작
      typeChar();
    }, startDelay);

    timersRef.current.push(startTimer);

    return () => {
      timersRef.current.forEach((timer) => {
        clearTimeout(timer);
      });
      timersRef.current = [];
    };
  }, [text, typingSpeed, startDelay]);

  return { displayedText, isTyping };
};
