'use client';

import { useTranslations } from 'next-intl';

import Tab from '@/components/tab';
import { ProjectType } from '@/types/project';

import style from './index.module.scss';

interface ProjectsTabsProps {
  activeTab: ProjectType | null;
  availableTabs: ProjectType[];
  onChange: (tab: ProjectType | null) => void;
}

/**
 * 프로젝트 탭 컴포넌트
 */
const ProjectsTabs = ({ activeTab, availableTabs, onChange }: ProjectsTabsProps) => {
  const t = useTranslations('projects');

  const tabOptions = availableTabs.map((tab) => ({
    value: tab,
    label: t(`tabs.${tab}`)
  }));

  if (tabOptions.length === 0) {
    return null;
  }

  return (
    <section className={style.wrap}>
      <Tab
        options={tabOptions}
        value={activeTab || tabOptions[0].value}
        onChange={(value) => onChange(value as ProjectType)}
      />
    </section>
  );
};

export default ProjectsTabs;
