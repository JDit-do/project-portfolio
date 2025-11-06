'use client';

import { useTranslations } from 'next-intl';

import Tab from '@/components/tab';
import { ProjectType } from '@/types/project';

import style from './index.module.scss';

interface ProjectsTabsProps {
  activeTab: ProjectType;
  onChange: (tab: ProjectType) => void;
}

/**
 * 프로젝트 탭 컴포넌트
 * 단일 책임: 탭 표시 및 선택만 담당
 */
const ProjectsTabs = ({ activeTab, onChange }: ProjectsTabsProps) => {
  const t = useTranslations('projects');

  const tabOptions = [
    { value: 'career' as ProjectType, label: t('tabs.career') },
    { value: 'side' as ProjectType, label: t('tabs.side') }
  ];

  return (
    <section className={style.wrap}>
      <Tab options={tabOptions} value={activeTab} onChange={onChange} />
    </section>
  );
};

export default ProjectsTabs;

