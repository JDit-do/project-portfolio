import { useMemo } from 'react';
import { Project, ProjectType } from '@/types/project';

interface UseProjectsParams {
  projects: Project[];
  activeTab: ProjectType;
  maxItems?: number;
}

interface UseProjectsReturn {
  favoriteProjects: Project[];
  currentProjects: Project[];
  allProjects: Project[];
}

/**
 * 프로젝트 데이터 필터링 및 조합 로직
 */
export const useProjects = ({
  projects,
  activeTab,
  maxItems = 9
}: UseProjectsParams): UseProjectsReturn => {
  // 즐겨찾기 프로젝트
  const favoriteProjects = useMemo(
    () => projects.filter((project) => project.isFavorite),
    [projects]
  );

  // 현재 탭의 프로젝트 (즐겨찾기 제외)
  const currentProjects = useMemo(
    () =>
      projects.filter(
        (project) => project.type === activeTab && !project.isFavorite
      ),
    [projects, activeTab]
  );

  // 전체 프로젝트 (즐겨찾기 + 일반, 최대 개수 제한)
  const allProjects = useMemo(() => {
    const combined = [...favoriteProjects, ...currentProjects];
    return combined.slice(0, maxItems);
  }, [favoriteProjects, currentProjects, maxItems]);

  return {
    favoriteProjects,
    currentProjects,
    allProjects
  };
};
