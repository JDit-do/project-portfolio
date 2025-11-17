import { useState, useMemo, useEffect } from 'react';
import { useTranslations } from 'next-intl';
import { Project, ProjectFilter, ProjectType } from '@/types/project';
import { TabOption } from '@/components/tab/index.type';
import { useProjectsData } from './useProjectsData';
import { useProjects } from './useProjects';

interface UseProjectsPageParams {
  initialProjects: Project[];
  initialCategories: string[];
}

interface UseProjectsPageReturn {
  activeTab: ProjectFilter;
  setActiveTab: (tab: ProjectFilter) => void;
  allProjects: ReturnType<typeof useProjects>['allProjects'];
  availableTabs: TabOption<ProjectFilter>[];
  isLoading: boolean;
}

// 상수
const MAX_PROJECT_ITEMS = 9;
const VALID_PROJECT_TYPES: ProjectType[] = ['career', 'side', 'toy', 'study'];

/**
 * 카테고리 문자열이 유효한 ProjectType인지 검증
 */
const isValidProjectType = (category: string): category is ProjectType => {
  return VALID_PROJECT_TYPES.includes(category as ProjectType);
};

/**
 * 프로젝트 페이지 로직 통합 Hook
 * 
 * - 카테고리 API 데이터로 탭 생성
 * - "전체" 탭을 맨 첫번째에 자동 추가
 * - 클라이언트에서 카테고리별 필터링 수행
 * 
 * @param initialProjects - 서버에서 가져온 전체 프로젝트 목록
 * @param initialCategories - 서버에서 가져온 카테고리 목록 (type 값들)
 */
export const useProjectsPage = ({
  initialProjects,
  initialCategories
}: UseProjectsPageParams): UseProjectsPageReturn => {
  const t = useTranslations('projects');
  const { projects, isLoading } = useProjectsData(initialProjects);

  // 카테고리 API에서 받은 데이터를 기반으로 탭 생성
  const availableTabs = useMemo<TabOption<ProjectFilter>[]>(() => {
    const tabs: TabOption<ProjectFilter>[] = [];
    
    // 1. "전체" 탭을 맨 첫번째에 추가
    tabs.push({
      value: 'all',
      label: t('tabs.all')
    });
    
    // 2. 카테고리 API에서 받은 type 값들 추가 (타입 검증 포함)
    initialCategories.forEach((category) => {
      if (isValidProjectType(category)) {
        tabs.push({
          value: category,
          label: t(`tabs.${category}`)
        });
      } else {
        // 개발 환경에서만 경고 (프로덕션에서는 무시)
        if (process.env.NODE_ENV === 'development') {
          console.warn(`Invalid project category: ${category}`);
        }
      }
    });
    
    return tabs;
  }, [initialCategories, t]);

  // 기본값은 "전체"로 설정
  const [activeTab, setActiveTab] = useState<ProjectFilter>('all');

  // availableTabs가 변경되면 activeTab도 업데이트 (전체가 없으면 첫 번째 탭)
  useEffect(() => {
    if (availableTabs.length > 0 && !availableTabs.find(tab => tab.value === activeTab)) {
      setActiveTab(availableTabs[0].value);
    }
  }, [availableTabs, activeTab]);

  const { allProjects } = useProjects({
    projects,
    activeTab,
    maxItems: MAX_PROJECT_ITEMS
  });

  return {
    activeTab,
    setActiveTab,
    allProjects,
    availableTabs,
    isLoading
  };
};
