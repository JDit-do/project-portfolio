'use client';

import { useState, useRef, useEffect } from 'react';
import { useTranslations } from 'next-intl';

import { useProjectsPage } from '@/hooks/useProjectsPage';
import { Project } from '@/types/project';
import { ProjectFilter } from '@/types/project';

import ProjectsHeader from '@/container/pages/projects/header';
import ProjectsGallery from '@/container/pages/projects/gallery';
import ProjectsDetail from '@/container/pages/projects/detail';
import Tab from '@/components/tab';

import style from './page.module.scss';

// 상수
const ANIMATION_DURATION_MS = 300;

interface ProjectsPageClientProps {
  initialProjects: Project[];
  initialCategories: string[];
}

/**
 * 프로젝트 페이지 클라이언트 컴포넌트
 * 서버에서 가져온 데이터를 props로 받아서 사용
 */
export default function ProjectsPageClient({
  initialProjects,
  initialCategories
}: ProjectsPageClientProps) {
  const tProjects = useTranslations('projects');
  const { activeTab, setActiveTab, allProjects, availableTabs, isLoading } =
    useProjectsPage({
      initialProjects,
      initialCategories
    });
  const [selectedProject, setSelectedProject] = useState<Project | null>(null);
  const [isDetailOpen, setIsDetailOpen] = useState(false);
  const timeoutRef = useRef<NodeJS.Timeout | null>(null);

  const handleOpenDetail = (project: Project) => {
    setSelectedProject(project);
    setIsDetailOpen(true);
  };

  const handleCloseDetail = () => {
    setIsDetailOpen(false);
    // 이전 timeout이 있으면 정리
    if (timeoutRef.current) {
      clearTimeout(timeoutRef.current);
    }
    // 애니메이션 완료 후 프로젝트 데이터 정리
    timeoutRef.current = setTimeout(() => {
      setSelectedProject(null);
      timeoutRef.current = null;
    }, ANIMATION_DURATION_MS);
  };

  // 컴포넌트 언마운트 시 timeout 정리
  useEffect(() => {
    return () => {
      if (timeoutRef.current) {
        clearTimeout(timeoutRef.current);
      }
    };
  }, []);

  return (
    <section className={style.wrap}>
      {/* 제목 */}
      <ProjectsHeader />

      <div className={style.contents}>
        {/* 필터 탭 및 프로젝트 카드 갤러리 */}
        {initialProjects.length > 0 && (
          <div className={style.tabs}>
            <Tab
              options={availableTabs}
              value={activeTab}
              onChange={(value) => setActiveTab(value as ProjectFilter)}
            />
          </div>
        )}
        <ProjectsGallery
          projects={allProjects}
          isLoading={isLoading}
          onViewDetail={handleOpenDetail}
        />

        {/* 탭 필터 도트 인디케이터 및 프로젝트 개수 */}
        {initialProjects.length > 0 && (
          <div className={style.bottom}>
            <div className={style.indicators}>
              {availableTabs.map((tab) => (
                <div
                  key={tab.value}
                  className={`${style.indicator} ${
                    activeTab === tab.value ? style.active : ''
                  }`}
                  aria-label={`${tab.label} ${tProjects('filter')}`}
                />
              ))}
            </div>

            <span className={style.count}>
              {allProjects.length}
              {tProjects('count')}
            </span>
          </div>
        )}
      </div>

      {/* 프로젝트 상세 팝업 */}
      <ProjectsDetail
        project={selectedProject}
        isOpen={isDetailOpen}
        onClose={handleCloseDetail}
      />
    </section>
  );
}

