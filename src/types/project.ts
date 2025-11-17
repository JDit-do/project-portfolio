/**
 * 프로젝트 카테고리 타입
 */
export type ProjectType = 'career' | 'side' | 'toy' | 'study';

/**
 * 프로젝트 필터 타입 (전체 포함)
 */
export type ProjectFilter = ProjectType | 'all';

/**
 * 프로젝트 데이터 인터페이스
 * 
 * Notion Projects DB의 속성과 매핑됩니다.
 * 상세 내용은 Projects DB의 각 항목 페이지 내부에 작성됩니다.
 */
export interface Project {
  /** 프로젝트 ID (Notion 페이지 ID) */
  id: string;
  /** 프로젝트 제목 */
  title: string;
  /** 프로젝트 설명 */
  description: string;
  /** 썸네일 이미지 URL */
  thumbnail?: string;
  /** 프로젝트 카테고리 타입 */
  type: ProjectType;
  /** 즐겨찾기 여부 */
  isFavorite: boolean;
  /** 기술 스택 태그 목록 */
  tags?: string[];
  /** 프로젝트 링크 */
  link?: string;
  /** GitHub 저장소 링크 */
  github?: string;
  /** 프로젝트 시작 날짜 */
  startDate?: string;
  /** 프로젝트 종료 날짜 */
  endDate?: string;
}

