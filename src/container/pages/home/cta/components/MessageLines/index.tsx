import Animation from '@/components/animation';

import style from './index.module.scss';

const { Blur } = Animation;

interface MessageLinesProps {
  lines: string[];
  delay: number;
  containerClassName?: string;
  lineClassName?: string;
}

/**
 * Message Lines 공통 컴포넌트
 * 여러 줄의 메시지를 렌더링하는 재사용 가능한 컴포넌트
 */
const MessageLines = ({
  lines,
  delay,
  containerClassName,
  lineClassName
}: MessageLinesProps) => {
  if (!Array.isArray(lines) || lines.length === 0) return null;

  return (
    <Blur.Fade delay={delay}>
      <div className={containerClassName || style.messageLines}>
        {lines.map((line: string, index: number) => (
          <p key={index} className={lineClassName || style.messageLine}>
            {line}
          </p>
        ))}
      </div>
    </Blur.Fade>
  );
};

export default MessageLines;
