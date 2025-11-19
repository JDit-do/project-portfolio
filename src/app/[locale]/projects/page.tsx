import { getProjects } from '@/features/projects/lib/getProjects';
import { getProjectCategories } from '@/features/projects/lib/getProjectCategories';

import ProjectsPageClient from './ProjectsPageClient';

export const revalidate = 1800; // 30분

/**
 * 프로젝트 페이지 컴포넌트
 */
export default async function ProjectsPage() {
  const [projects, categories] = await Promise.all([
    getProjects(),
    getProjectCategories()
  ]);

  return (
    <ProjectsPageClient
      initialProjects={projects}
      initialCategories={categories}
    />
  );
}
