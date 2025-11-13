import { getTranslations } from 'next-intl/server';

import ProjectsContainer from '@/container/pages/projects';
import { APIResponse } from '@/types/api';
import { Project } from '@/types/project';
import { APIEndpoints } from '@/constants/apiEndPoint';

import style from './page.module.scss';

async function getProjects(): Promise<Project[]> {
  try {
    const response = await fetch(APIEndpoints.projects.list.url, {
      next: { revalidate: 1800 } // 30분 캐싱
    });

    if (!response.ok) {
      return [];
    }

    const { data }: APIResponse<{ all: Project[] }> = await response.json();
    return data?.all || [];
  } catch (error) {
    console.error('Error fetching projects:', error);
    return [];
  }
}

export default async function ProjectsPage() {
  const t = await getTranslations('portfolio');
  const initialProjects = await getProjects();

  return (
    <section className={style.wrap}>
      <header className={style.header}>
        <h1 className={style.title}>{t('title')}</h1>
        <p className={style.subtitle}>{t('subtitle')}</p>
      </header>

      <ProjectsContainer initialProjects={initialProjects} />
    </section>
  );
}
