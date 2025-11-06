export type ProjectType = 'career' | 'side';

export interface Project {
  id: string;
  title: string;
  description: string;
  thumbnail?: string;
  type: ProjectType;
  isFavorite: boolean;
  tags?: string[];
  link?: string;
  github?: string;
  startDate?: string;
  endDate?: string;
}

