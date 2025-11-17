import { getProjects } from '@/lib/projects/getProjects';
import { getProjectCategories } from '@/lib/projects/getProjectCategories';
import ProjectsPageClient from './ProjectsPageClient';

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
