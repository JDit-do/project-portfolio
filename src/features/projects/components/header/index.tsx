'use client';

import { useTranslations } from 'next-intl';

import style from './index.module.scss';

/**
 * 프로젝트 페이지 헤더 컴포넌트 (타이틀만)
 */
const ProjectsHeader = () => {
  const t = useTranslations('projects');

  return (
    <header className={style.wrap}>
      <h1 className={style.title}>{t('title')}</h1>
    </header>
  );
};

export default ProjectsHeader;

