import { Project } from '@/types/project';

export interface IProjectCardProps {
  project: Project;
  onViewDetail?: (project: Project) => void;
}

