'use client';

import { useTranslations } from 'next-intl';

import Animation from '@/components/animation';
import { SECTION_DELAY, ITEM_DELAY_INTERVAL } from '../constants';
import type { Contact } from '../types';

import MessageLines from './components/MessageLines';
import Contacts from './components/Contacts';

import mainMessageStyle from './components/MainMessage/index.module.scss';
import subMessageStyle from './components/SubMessage/index.module.scss';

import style from './index.module.scss';

const { Blur } = Animation;

/**
 * CTA Section
 */
const CTA = () => {
  const t = useTranslations('story');
  const cta = t.raw('cta');

  return (
    <section className={style.wrap}>
      <main>
        {/* 타이틀 */}
        <Blur.Fade delay={SECTION_DELAY.CTA}>
          <h2 className={style.title}>{cta.title}</h2>
        </Blur.Fade>

        {/* 메인 메시지 */}
        <MessageLines
          lines={Array.isArray(cta.mainMessage) ? cta.mainMessage : []}
          delay={SECTION_DELAY.CTA + ITEM_DELAY_INTERVAL}
          containerClassName={mainMessageStyle.mainMessage}
          lineClassName={mainMessageStyle.mainMessageLine}
        />

        {/* 서브 메시지 */}
        <MessageLines
          lines={Array.isArray(cta.subMessage) ? cta.subMessage : []}
          delay={SECTION_DELAY.CTA + ITEM_DELAY_INTERVAL * 2}
          containerClassName={subMessageStyle.subMessage}
          lineClassName={subMessageStyle.subMessageLine}
        />

        {/* 연락처 */}
        <Contacts
          contacts={
            Array.isArray(cta.contacts) ? (cta.contacts as Contact[]) : []
          }
        />
      </main>

      {/* 푸터 */}
      <Blur.Fade delay={SECTION_DELAY.CTA + ITEM_DELAY_INTERVAL * 5}>
        <div className={style.footer}>
          <p className={style.footerCopyright}>{cta.footer.copyright}</p>
          <p className={style.footerTagline}>{cta.footer.tagline}</p>
        </div>
      </Blur.Fade>
    </section>
  );
};

export default CTA;
