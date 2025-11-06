import { useState } from 'react';
import { ProjectType } from '@/types/project';
import { useProjectsData } from './useProjectsData';
import { useProjects } from './useProjects';

interface UseProjectsPageReturn {
  activeTab: ProjectType;
  setActiveTab: (tab: ProjectType) => void;
  allProjects: ReturnType<typeof useProjects>['allProjects'];
  isLoading: boolean;
  error: Error | null;
}

/**
 * 프로젝트 페이지 로직 통합 Hook
 * 단일 책임: 프로젝트 페이지의 모든 상태와 로직 관리
 */
export const useProjectsPage = (): UseProjectsPageReturn => {
  const [activeTab, setActiveTab] = useState<ProjectType>('career');
  const { projects, isLoading, error } = useProjectsData();

  const { allProjects } = useProjects({
    projects,
    activeTab,
    maxItems: 9
  });

  return {
    activeTab,
    setActiveTab,
    allProjects,
    isLoading,
    error
  };
};

