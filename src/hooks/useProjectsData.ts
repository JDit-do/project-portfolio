import { useState, useEffect } from 'react';
import { Project } from '@/types/project';
import { APIResponse } from '@/types/api';
import { APIEndpoints } from '@/constants/apiEndPoint';

interface UseProjectsDataReturn {
  projects: Project[];
  isLoading: boolean;
}

/**
 * 프로젝트 데이터를 관리하는 Hook
 * 
 * - 서버에서 받은 초기 데이터를 사용
 * - 백그라운드에서 재검증 수행 (데이터 갱신)
 * - 필터링은 클라이언트에서 수행 (useProjects Hook 사용)
 * 
 * @param initialProjects - 서버에서 미리 가져온 초기 프로젝트 데이터
 */
export const useProjectsData = (initialProjects: Project[] = []): UseProjectsDataReturn => {
  const [projects, setProjects] = useState<Project[]>(initialProjects);
  const [isLoading, setIsLoading] = useState(initialProjects.length === 0);

  useEffect(() => {
    // 프로젝트 데이터 가져오기 공통 함수
    const fetchProjects = async (isRevalidation = false) => {
      try {
        if (!isRevalidation) {
          setIsLoading(true);
        }

        const response = await fetch(APIEndpoints.projects.list.url);

        if (!response.ok) {
          throw new Error('Failed to fetch projects');
        }

        const { data }: APIResponse<{ all: Project[] }> =
          await response.json();
        
        const projects = data?.all && data.all.length > 0 ? data.all : [];
        setProjects(projects);
      } catch (err) {
        console.error('Failed to fetch projects:', err);
        if (!isRevalidation) {
          setProjects([]);
        }
      } finally {
        if (!isRevalidation) {
          setIsLoading(false);
        }
      }
    };

    // 초기 데이터가 있으면 백그라운드에서 재검증만 수행
    if (initialProjects.length > 0) {
      fetchProjects(true);
      return;
    }

    // 초기 데이터가 없으면 클라이언트에서 가져오기
    fetchProjects(false);
  }, [initialProjects.length]);

  return { projects, isLoading };
};
