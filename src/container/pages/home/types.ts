/**
 * Story 페이지 타입 정의
 */

export interface HeroStat {
  value: string;
  label: string;
  description?: string;
  progress?: number;
}

export interface AchievementItem {
  id: string;
  icon: string;
  title: string;
  gradient: string;
  content: string[];
  point: string;
}

export interface Contact {
  icon: string;
  label: string;
  value: string;
  url: string;
}

export interface Quote {
  text?: string;
  author?: string;
}

export interface StoryProject {
  id: string;
  name: string;
  year: string;
  challenge: string[];
  decision: string[];
  impact: string[];
  detail?: {
    period: string;
    role: string;
    techStack: string[];
    achievements: string[];
  };
}