import { useState, useMemo, useEffect } from 'react';
import { Project, ProjectType } from '@/types/project';
import { useProjectsData } from './useProjectsData';
import { useProjects } from './useProjects';

interface UseProjectsPageReturn {
  activeTab: ProjectType | null;
  setActiveTab: (tab: ProjectType | null) => void;
  allProjects: ReturnType<typeof useProjects>['allProjects'];
  availableTabs: ProjectType[];
  isLoading: boolean;
  error: Error | null;
}

/**
 * 프로젝트 페이지 로직 통합 Hook
 */
export const useProjectsPage = (
  initialProjects: Project[] = []
): UseProjectsPageReturn => {
  const { projects, isLoading, error } = useProjectsData(initialProjects);

  // 데이터에서 사용 가능한 타입들을 추출하여 탭으로 생성
  const availableTabs = useMemo(() => {
    const types = new Set<ProjectType>();
    
    // projects가 배열인지 확인
    if (Array.isArray(projects)) {
      projects.forEach((project) => {
        if (project && project.type) {
          types.add(project.type);
        }
      });
    }
    
    return Array.from(types).sort();
  }, [projects]);

  // 첫 번째 사용 가능한 탭을 기본값으로 설정
  const [activeTab, setActiveTab] = useState<ProjectType | null>(null);

  // availableTabs가 변경되면 activeTab도 업데이트
  useEffect(() => {
    if (
      availableTabs.length > 0 &&
      (!activeTab || !availableTabs.includes(activeTab))
    ) {
      setActiveTab(availableTabs[0]);
    }
  }, [availableTabs, activeTab]);

  const { allProjects } = useProjects({
    projects,
    activeTab: activeTab || ('career' as ProjectType),
    maxItems: 9
  });

  return {
    activeTab,
    setActiveTab,
    allProjects,
    availableTabs,
    isLoading,
    error
  };
};
