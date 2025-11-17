import { useMemo } from 'react';
import { Project, ProjectFilter } from '@/types/project';

interface UseProjectsParams {
  projects: Project[];
  activeTab: ProjectFilter;
  maxItems?: number;
}

interface UseProjectsReturn {
  allProjects: Project[];
}

// 상수
const DEFAULT_MAX_ITEMS = 9;

/**
 * 프로젝트 데이터 필터링 및 조합 로직
 * 
 * 클라이언트에서 카테고리별 필터링을 수행합니다.
 * - 'all': 전체 프로젝트 표시
 * - 특정 카테고리: 해당 타입의 프로젝트만 표시
 * 
 * @param projects - 전체 프로젝트 목록
 * @param activeTab - 현재 선택된 탭 (카테고리)
 * @param maxItems - 최대 표시 개수
 */
export const useProjects = ({
  projects,
  activeTab,
  maxItems = DEFAULT_MAX_ITEMS
}: UseProjectsParams): UseProjectsReturn => {
  // 현재 탭에 맞는 즐겨찾기 프로젝트만 필터링
  const favoriteProjects = useMemo(() => {
    const favorites = projects.filter((project) => project.isFavorite);
    
    if (activeTab === 'all') {
      // 전체 선택 시 모든 즐겨찾기 프로젝트
      return favorites;
    }
    
    // 특정 카테고리 선택 시 해당 타입의 즐겨찾기 프로젝트만
    return favorites.filter((project) => project.type === activeTab);
  }, [projects, activeTab]);

  // 현재 탭의 프로젝트 (즐겨찾기 제외)
  const currentProjects = useMemo(() => {
    if (activeTab === 'all') {
      // 전체 선택 시 모든 프로젝트 (즐겨찾기 제외)
      return projects.filter((project) => !project.isFavorite);
    }
    
    // 특정 카테고리 선택 시 해당 타입만 (즐겨찾기 제외)
    return projects.filter(
      (project) => project.type === activeTab && !project.isFavorite
    );
  }, [projects, activeTab]);

  // 전체 프로젝트 (즐겨찾기 우선 + 일반, 최대 개수 제한)
  const allProjects = useMemo(() => {
    const combined = [...favoriteProjects, ...currentProjects];
    return combined.slice(0, maxItems);
  }, [favoriteProjects, currentProjects, maxItems]);

  return {
    allProjects
  };
};
