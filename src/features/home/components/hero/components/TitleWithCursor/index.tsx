import TypingText from '@/shared/components/ui/typingText';

import style from './index.module.scss';

interface TitleWithCursorProps {
  text: string;
  typingSpeed?: number;
  startDelay?: number;
}

/**
 * Title With Cursor 컴포넌트
 */
const TitleWithCursor = ({
  text,
  typingSpeed = 100,
  startDelay = 500
}: TitleWithCursorProps) => {
  return (
    <div className={style.wrap}>
      <TypingText
        text={text}
        typingSpeed={typingSpeed}
        startDelay={startDelay}
        tag="h2"
        className={style.title}
      />
    </div>
  );
};

export default TitleWithCursor;
