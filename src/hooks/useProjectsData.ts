import { useState, useEffect } from 'react';
import { Project } from '@/types/project';
import { APIResponse } from '@/types/api';
import { APIEndpoints } from '@/constants/apiEndPoint';

interface UseProjectsDataReturn {
  projects: Project[];
  isLoading: boolean;
  error: Error | null;
}

/**
 * 프로젝트 데이터를 API에서 가져오는 Hook
 * @param initialProjects - 서버에서 미리 가져온 초기 프로젝트 데이터
 */
export const useProjectsData = (initialProjects: Project[] = []): UseProjectsDataReturn => {
  const [projects, setProjects] = useState<Project[]>(initialProjects);
  const [isLoading, setIsLoading] = useState(initialProjects.length === 0);
  const [error, setError] = useState<Error | null>(null);

  useEffect(() => {
    // 초기 데이터가 있으면 클라이언트에서 재검증만 수행
    if (initialProjects.length > 0) {
      const revalidateProjects = async () => {
        try {
          const response = await fetch(APIEndpoints.projects.list.url, {
            next: { revalidate: 1800 }
          });

          if (response.ok) {
            const { data }: APIResponse<{ all: Project[] }> =
              await response.json();
            if (data?.all && data.all.length > 0) {
              setProjects(data.all);
            }
          }
        } catch (err) {
          // 재검증 실패해도 초기 데이터는 유지
          console.error('Failed to revalidate projects:', err);
        }
      };

      // 백그라운드에서 재검증
      revalidateProjects();
      return;
    }

    // 초기 데이터가 없으면 클라이언트에서 가져오기
    const fetchProjects = async () => {
      try {
        setIsLoading(true);
        const response = await fetch(APIEndpoints.projects.list.url, {
          next: { revalidate: 1800 }
        });

        if (!response.ok) {
          throw new Error('Failed to fetch projects');
        }

        const { data }: APIResponse<{ all: Project[] }> =
          await response.json();
        setProjects(data?.all || []);
        setError(null);
      } catch (err) {
        setError(err instanceof Error ? err : new Error('Unknown error'));
        setProjects([]);
      } finally {
        setIsLoading(false);
      }
    };

    fetchProjects();
  }, [initialProjects.length]);

  return { projects, isLoading, error };
};
