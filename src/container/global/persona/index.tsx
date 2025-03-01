'use client';

import { useCallback, useState } from 'react';
import { useTranslations } from 'next-intl';

import { DOCUMENT_URL } from '@/constants/url';
import Button from '@/components/button';

import style from './index.module.scss';

const SectionPersona = () => {
  const t = useTranslations('persona');

  const [isActive, setIsActive] = useState<Boolean>(false);

  const handleClickButton = useCallback(() => {
    console.log('asdfasd >>> ');
    setIsActive((prev) => !prev);
  }, []);

  return (
    <section className={`${style.wrap} ${isActive ? style.active : ''}`}>
      <div className={style.toggle}>
        {/* <Button
          button={{
            label: isActive ? (
              t('button.close')
            ) : (
              <>
                {t('button.data1')}
                <br />
                {t('button.data2')}
              </>
            ),
            onClick: handleClickButton
          }}
        /> */}
      </div>
      <div className={style.contents}>
        <div className={style.left}>
          <h2 className={style.title}>
            {t('title')}
            <span>{t('subTitle')}</span>
          </h2>
          <div className={style.info}>
            <div>
              <h3>JD</h3>
              <dl>
                <dt>{t('jd.name.title')}</dt>
                <dd>{t('jd.name.data')}</dd>
                <dt>{t('jd.role.title')}</dt>
                <dd>{t('jd.role.data')}</dd>
                <dt>{t('jd.location.title')}</dt>
                <dd>{t('jd.location.data')}</dd>
              </dl>
            </div>
            <div>
              <h3>
                {t('info.resource.title')}
                <span>{t('info.resource.subTitle')}</span>
              </h3>
              <dl>
                <dt>{t('info.resource.resume')}</dt>
                <dd>
                  {/* <Button link={DOCUMENT_URL.resume.getView()} /> */}
                  {/* <Button download={DOCUMENT_URL.resume.getDownload()} /> */}
                </dd>
                <dt>{t('info.resource.professionalProfile')}</dt>
                <dd>
                  {/* <Button link={DOCUMENT_URL.professionalProfile.getView()} />
                  <Button
                    download={DOCUMENT_URL.professionalProfile.getDownload()}
                  /> */}
                </dd>
                <dt>{t('info.resource.portfolio')}</dt>
                <dd>
                  {/* <Button link={DOCUMENT_URL.portfolio.getView()} /> */}
                  {/* <Button download={DOCUMENT_URL.portfolio.getDownload()} /> */}
                </dd>
              </dl>
            </div>
          </div>
        </div>

        <div className={style.right}>
          <p className={style.intro}>
            {/* <span>
              <IconDoubleQuote
                width={20}
                hanging={20}
                className={style.quoteLeft}
              />
              {t('aboutMe.data1')}
            </span>
            <span>
              {t('aboutMe.data2')}
              <IconDoubleQuote
                width={20}
                hanging={20}
                className={style.quoteRight}
              />
            </span> */}
          </p>

          <div className={style.extra}>
            <div className={style.character}>
              <h3 className={style.noCommon}>{t('character.title')}</h3>
              <ul>
                <li>
                  <span>#</span>
                  {t('character.userExperience')}
                </li>
                <li>
                  <span>#</span>
                  {t('character.problemSolving')}
                </li>
                <li>
                  <span>#</span>
                  {t('character.collaboration')}
                </li>
                <li>
                  <span>#</span>
                  {t('character.documentation')}
                </li>
                <li>
                  <span>#</span>
                  {t('character.scalability')}
                </li>
              </ul>
            </div>

            <div className={style.beliefsPhilosophy}>
              <h3>{t('beliefsPhilosophy.title')}</h3>
              <ul>
                <li>{t('beliefsPhilosophy.data1')}</li>
                <li>{t('beliefsPhilosophy.data2')}</li>
              </ul>
            </div>

            <div className={style.goal}>
              <h3>{t('goal.title')}</h3>
              <ul>
                <li>{t('goal.data1')}</li>
                <li>{t('goal.data2')}</li>
              </ul>
            </div>

            <div className={style.feedback}>
              <h3>{t('whatTheySay.title')}</h3>
              <ul>
                <li>
                  <span>{t(`whatTheySay.feedbacks.qa.content`)}</span>
                  <span>{t(`whatTheySay.feedbacks.qa.author`)}</span>
                </li>
                <li>
                  <span>{t(`whatTheySay.feedbacks.fe.content`)}</span>
                  <span>{t(`whatTheySay.feedbacks.fe.author`)}</span>
                </li>
                <li>
                  <span>{t(`whatTheySay.feedbacks.be.content`)}</span>
                  <span>{t(`whatTheySay.feedbacks.be.author`)}</span>
                </li>
              </ul>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default SectionPersona;
