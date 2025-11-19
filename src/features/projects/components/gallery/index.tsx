'use client';

import { useRef, useState, useCallback, useEffect } from 'react';
import { useTranslations } from 'next-intl';

import ProjectCard from '@/features/projects/components/card';

import { Project } from '@/features/projects/types';

import style from './index.module.scss';

// 상수
const SKELETON_ITEM_COUNT = 6;
const SCROLL_SPEED_MULTIPLIER = 2;

interface ProjectsGalleryProps {
  projects: Project[];
  isLoading?: boolean;
  onViewDetail?: (project: Project) => void;
}

/**
 * 프로젝트 갤러리 컴포넌트 (가로 스크롤)
 * 마우스 드래그 및 터치 스크롤 지원
 */
const ProjectsGallery = ({
  projects,
  isLoading = false,
  onViewDetail
}: ProjectsGalleryProps) => {
  const t = useTranslations('projects');
  const scrollRef = useRef<HTMLDivElement>(null);
  const [isDragging, setIsDragging] = useState(false);
  const dragStateRef = useRef({
    startX: 0,
    scrollLeft: 0
  });

  // 드래그 종료 처리 (공통 함수)
  const stopDragging = useCallback(() => {
    if (!scrollRef.current) return;
    setIsDragging(false);
    scrollRef.current.style.cursor = 'grab';
    scrollRef.current.style.userSelect = '';
  }, []);

  // 마우스 드래그 시작
  const handleMouseDown = useCallback((e: React.MouseEvent) => {
    // 버튼이나 링크 클릭은 드래그로 처리하지 않음
    const target = e.target as HTMLElement;
    if (
      target.tagName === 'BUTTON' ||
      target.tagName === 'A' ||
      target.closest('button') ||
      target.closest('a')
    ) {
      return;
    }

    if (!scrollRef.current) return;
    setIsDragging(true);
    dragStateRef.current.startX = e.pageX - scrollRef.current.offsetLeft;
    dragStateRef.current.scrollLeft = scrollRef.current.scrollLeft;
    scrollRef.current.style.cursor = 'grabbing';
    scrollRef.current.style.userSelect = 'none';
  }, []);

  // 전역 마우스 이벤트 리스너 (요소 밖에서도 동작)
  useEffect(() => {
    if (!isDragging) return;

    const handleMouseMove = (e: MouseEvent) => {
      if (!scrollRef.current) return;
      e.preventDefault();
      const x = e.pageX - scrollRef.current.offsetLeft;
      const walk = (x - dragStateRef.current.startX) * SCROLL_SPEED_MULTIPLIER;
      scrollRef.current.scrollLeft = dragStateRef.current.scrollLeft - walk;
    };

    const handleMouseUp = () => {
      stopDragging();
    };

    document.addEventListener('mousemove', handleMouseMove);
    document.addEventListener('mouseup', handleMouseUp);

    return () => {
      document.removeEventListener('mousemove', handleMouseMove);
      document.removeEventListener('mouseup', handleMouseUp);
    };
  }, [isDragging, stopDragging]);

  // 터치 이벤트 (태블릿용, 모바일은 기본 스크롤 사용)
  const [isTouching, setIsTouching] = useState(false);

  const handleTouchStart = useCallback((e: React.TouchEvent) => {
    // 버튼이나 링크 클릭은 드래그로 처리하지 않음
    const target = e.target as HTMLElement;
    if (
      target.tagName === 'BUTTON' ||
      target.tagName === 'A' ||
      target.closest('button') ||
      target.closest('a')
    ) {
      return;
    }

    if (!scrollRef.current) return;
    setIsTouching(true);
    dragStateRef.current.startX =
      e.touches[0].pageX - scrollRef.current.offsetLeft;
    dragStateRef.current.scrollLeft = scrollRef.current.scrollLeft;
  }, []);

  const handleTouchMove = useCallback(
    (e: React.TouchEvent) => {
      if (!isTouching || !scrollRef.current) return;
      e.preventDefault(); // 기본 스크롤 방지 (태블릿에서만)
      const x = e.touches[0].pageX - scrollRef.current.offsetLeft;
      const walk = (x - dragStateRef.current.startX) * SCROLL_SPEED_MULTIPLIER;
      scrollRef.current.scrollLeft = dragStateRef.current.scrollLeft - walk;
    },
    [isTouching]
  );

  const handleTouchEnd = useCallback(() => {
    setIsTouching(false);
  }, []);

  // 로딩 상태: 스켈레톤 표시
  if (isLoading) {
    const skeletonItems = Array.from(
      { length: SKELETON_ITEM_COUNT },
      (_, index) => index
    );
    return (
      <div ref={scrollRef} className={style.wrap}>
        {skeletonItems.map((_, index) => {
          const projectNumber = String(index + 1).padStart(2, '0');
          return (
            <ProjectCard
              key={index}
              project={undefined}
              projectNumber={projectNumber}
              isSkeleton={true}
            />
          );
        })}
      </div>
    );
  }

  // 빈 상태
  if (projects.length === 0) {
    return (
      <div className={style.empty}>
        <p>{t('empty')}</p>
      </div>
    );
  }

  // 데이터 표시
  return (
    <div
      ref={scrollRef}
      className={style.wrap}
      onMouseDown={handleMouseDown}
      onMouseLeave={stopDragging}
      onTouchStart={handleTouchStart}
      onTouchMove={handleTouchMove}
      onTouchEnd={handleTouchEnd}
      onTouchCancel={handleTouchEnd}
    >
      {projects.map((project, index) => {
        const projectNumber = String(index + 1).padStart(2, '0');
        return (
          <ProjectCard
            key={project.id}
            project={project}
            onViewDetail={onViewDetail}
            projectNumber={projectNumber}
          />
        );
      })}
    </div>
  );
};

export default ProjectsGallery;
