'use client';

import Image from 'next/image';
import { FC, useState } from 'react';
import { useTranslations } from 'next-intl';

import Button from '@/components/button';
import Icon from '@/components/icon';

import { DATA_PRINCIPLES } from './data';
import { IPersonaContentProps } from './index.type';
import style from './index.module.scss';

const PersonaContents: FC<IPersonaContentProps> = ({ isOpen, onToggle }) => {
  const t = useTranslations('persona');
  const [currentId, setCurrentId] = useState<string>(DATA_PRINCIPLES[0].id);

  const handleClickPrinciple = (id: string) => {
    setCurrentId(id);
  };

  return (
    <section className={`${style.wrap} ${isOpen ? style.active : ''}`}>
      <div className={style.close}>
        <Button onClick={onToggle}>{t('button.close')}</Button>
      </div>

      <div className={style.contents}>
        <header>
          <div className={style.layoutLeft}>
            <h2 className={style.title}>{t('title')}</h2>
            <p className={style.role}>Frontend Developer</p>
            <ul className={style.keywords}>
              <li>#{t('character.userExperience')}</li>
              <li>#{t('character.problemSolving')}</li>
              <li>#{t('character.collaboration')}</li>
              <li>#{t('character.documentation')}</li>
              <li>#{t('character.scalability')}</li>
            </ul>
          </div>
          <div className={style.layoutRight}>
            <p className={style.intro}>
              {t('intro.data1')}
              <br />
              {t('intro.data2')}
            </p>
          </div>
        </header>
        <div className={style.content}>
          <div className={style.layoutLeft}>
            <ul className={style.skills}>
              <li>
                <h3>Frontend</h3>
                <div>
                  <p>{t('skill.frontend')}</p>
                  <ul>
                    <li>React.js, Next.js, TypeScript</li>
                    <li>
                      HTML, CSS/SCSS, Styled Components, Tailwind CSS, MUI
                    </li>
                    <li>Atomic Design, Server-Driven UI</li>
                    <li>Chart.js, D3.js, WebSocket</li>
                  </ul>
                </div>
              </li>
              <li>
                <h3>Backend</h3>
                <div>
                  <p>{t('skill.backend')}</p>
                  <ul>
                    <li>
                      Java (Spring Boot), Python (Django, FastAPI), RESTful API
                    </li>
                  </ul>
                </div>
              </li>
              <li>
                <h3>Tools & Workflow</h3>
                <div>
                  <p>{t('skill.tool')}</p>
                  <ul>
                    <li>Git, GitHub Actions, Git Flow</li>
                    <li>AWS (EC2, CloudFront), Docker, Vercel</li>
                    <li>Jira, Confluence, Notion, OA(Google, MS), Swagger</li>
                  </ul>
                </div>
              </li>
            </ul>
          </div>
          <div className={`${style.layoutRight} ${style.principles}`}>
            <h2>How I Build, Solve, and Collaborate</h2>

            <ul>
              {DATA_PRINCIPLES.map(
                ({ id, title, subTitle, description, img }) => (
                  <li
                    key={id}
                    className={currentId === id ? style.active : undefined}
                  >
                    <div className={style.title}>
                      <h3>{t(title)}</h3>
                      <span>{subTitle}</span>
                    </div>
                    <ul>
                      {description.map((desc, index) => (
                        <li key={`${id}-desc-${index}`}>{t(desc)}</li>
                      ))}
                    </ul>
                    <div className={style.image}>
                      <div>
                        <Image src={img.url} alt={img.alt} />
                      </div>
                    </div>
                  </li>
                )
              )}
            </ul>

            <div className={style.principleKeywords}>
              {DATA_PRINCIPLES.map(({ id, icon }) => (
                <button
                  key={`button-${id}`}
                  className={currentId === id ? style.active : undefined}
                  onClick={() => handleClickPrinciple(id)}
                >
                  <Icon type={icon} />
                </button>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default PersonaContents;
