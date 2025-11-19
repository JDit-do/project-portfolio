import { useTypingEffect } from '@/shared/hooks/useTypingEffect';

import style from './index.module.scss';

interface TypingTextProps {
  text: string;
  typingSpeed?: number;
  startDelay?: number;
  className?: string;
  tag?: 'h1' | 'h2' | 'h3' | 'h4' | 'h5' | 'h6' | 'p' | 'div' | 'span';
  showCursor?: boolean; 
}

/**
 * 타이핑 효과를 가진 텍스트 컴포넌트
 */
const TypingText = ({
  text,
  typingSpeed = 100,
  startDelay = 500,
  className = '',
  tag = 'div',
  showCursor = true 
}: TypingTextProps) => {
  const { displayedText } = useTypingEffect(
    text,
    typingSpeed,
    startDelay
  );

  const Tag = tag;
  const shouldShowCursor = showCursor && (displayedText?.length ?? 0) > 0;

  return (
    <Tag
      className={`${style.typingText} ${className} ${shouldShowCursor ? style.showCursor : ''}`}
    >
      {displayedText || ''}
    </Tag>
  );
};

export default TypingText;

