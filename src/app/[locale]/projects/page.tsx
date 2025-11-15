import { unstable_cache } from 'next/cache';
import { getTranslations } from 'next-intl/server';

import ProjectsContainer from '@/container/pages/projects';
import { Project } from '@/types/project';
import { getProjects } from '@/lib/projects/getProjects';

import style from './page.module.scss';

async function getProjectsData(): Promise<Project[]> {
  try {
    // 캐싱 적용 (30분)
    const cachedGetProjects = unstable_cache(
      async () => {
        const { all } = await getProjects();
        return all;
      },
      ['projects-list'],
      {
        revalidate: 1800 // 30분
      }
    );

    return await cachedGetProjects();
  } catch (error) {
    console.error('Error fetching projects:', error);
    return [];
  }
}

export default async function ProjectsPage() {
  const t = await getTranslations('portfolio');
  const initialProjects = await getProjectsData();

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
