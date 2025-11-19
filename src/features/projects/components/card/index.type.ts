import { Project } from '@/features/projects/types';

export interface IProjectCardProps {
  project?: Project;
  onViewDetail?: (project: Project) => void;
  projectNumber?: string;
  isSkeleton?: boolean;
}
