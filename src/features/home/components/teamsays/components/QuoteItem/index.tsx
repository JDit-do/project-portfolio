import { motion } from 'framer-motion';

import Animation from '@/shared/components/animation';
import type { Quote } from '../../../../types';

import style from './index.module.scss';

const { Blur } = Animation;

interface QuoteItemProps {
  quote: string | Quote;
  index: number;
  delay: number;
}

/**
 * Quote Item 컴포넌트
 */
const QuoteItem = ({ quote, delay }: QuoteItemProps) => {
  const quoteText = typeof quote === 'string' ? quote : quote.text || '';
  const quoteAuthor =
    typeof quote === 'object' && quote.author ? quote.author : null;

  if (!quoteText) return null;

  return (
    <Blur.Fade delay={delay} className={style.wrap}>
      <motion.blockquote className={style.blockquote}>
        <span className={style.quoteMark}>&quot;</span>
        <span className={style.quoteText}>{quoteText}</span>
        {quoteAuthor && (
          <cite className={style.quoteAuthor}>— {quoteAuthor}</cite>
        )}
      </motion.blockquote>
    </Blur.Fade>
  );
};

export default QuoteItem;
