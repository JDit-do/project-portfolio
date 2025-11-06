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
 * 단일 책임: API 데이터 fetching만 담당
 */
export const useProjectsData = (): UseProjectsDataReturn => {
  const [projects, setProjects] = useState<Project[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<Error | null>(null);

  useEffect(() => {
    const fetchProjects = async () => {
      try {
        setIsLoading(true);
        const response = await fetch(APIEndpoints.projects.list.url, {
          next: { revalidate: 1800 }
        });

        if (!response.ok) {
          throw new Error('Failed to fetch projects');
        }

        const { data = [] }: APIResponse<Project[]> = await response.json();
        setProjects(data);
        setError(null);
      } catch (err) {
        setError(err instanceof Error ? err : new Error('Unknown error'));
        setProjects([]);
      } finally {
        setIsLoading(false);
      }
    };

    fetchProjects();
  }, []);

  return { projects, isLoading, error };
};

