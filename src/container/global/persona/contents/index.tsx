'use client';

import { FC, useState } from 'react';
import { useTranslations } from 'next-intl';

import { IPersonaContentProps } from './index.type';
import style from './index.module.scss';
import Button from '@/components/button';
import Image from 'next/image';
import Icon from '@/components/icon';
import { ICON_TYPE } from '@/components/icon/index.type';
import { DATA_PRINCIPLES } from './data';

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
              <li># 사용자 경험</li>
              <li># 문제 해결</li>
              <li># 협업</li>
              <li># 문서화</li>
              <li># 확장성</li>
            </ul>
          </div>
          <div className={style.layoutRight}>
            <p className={style.intro}>
              사용자 중심의 개발과 협업을 통해
              <br />더 나은 경험을 만들어가는 프론트엔드 개발자입니다.
            </p>
          </div>
        </header>
        <div className={style.content}>
          <div className={style.layoutLeft}>
            <ul className={style.skills}>
              <li>
                <h3>Frontend</h3>
                <div>
                  <p>
                    사용자 경험을 중심으로 한 UI/UX 개발과 최적화된 컴포넌트
                    설계를 수행합니다.
                  </p>
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
                  <p>
                    주요 BE 아키텍처를 이해하고, API 연동 및 서버 구축 경험이
                    있습니다.
                  </p>
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
                  <p>개발 환경 설정, 협업 툴을 적극적으로 활용합니다.</p>
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
                      <h3>{title}</h3>
                      <span>{subTitle}</span>
                    </div>

                    <ul>
                      {description.map((desc) => (
                        <li>{desc}</li>
                      ))}
                    </ul>

                    <div className={style.image}>
                      <div>
                        <img src={img.url} alt={img.alt} />
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
