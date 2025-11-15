import { SECTION_DELAY, ITEM_DELAY_INTERVAL } from '../../../constants';
import type { Quote } from '../../../types';
import QuoteItem from '../QuoteItem';

import style from './index.module.scss';

interface QuotesProps {
  quotes: (string | Quote)[];
}

/**
 * Quotes 컴포넌트
 */
const Quotes = ({ quotes }: QuotesProps) => {
  if (!Array.isArray(quotes) || quotes.length === 0) return null;

  return (
    <div className={style.wrap}>
      {/* 인용문 */}
      <div className={style.quotes}>
        {quotes.map((quote: string | Quote, index: number) => (
          <QuoteItem
            key={index}
            quote={quote}
            index={index}
            delay={SECTION_DELAY.TEAMSAYS + ITEM_DELAY_INTERVAL * index}
          />
        ))}
      </div>

      {/* Background */}
      <div className={style.backgroundText}>
        <span>J</span>
        <span>U</span>
        <span>S</span>
        <span>T</span>
        <span>D</span>
        <span>O</span>
      </div>
    </div>
  );
};

export default Quotes;
