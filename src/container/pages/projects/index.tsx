'use client';

import { useState } from 'react';
import { useProjectsPage } from '@/hooks/useProjectsPage';

import { Project } from '@/types/project';

import ProjectsTabs from './tabs';
import ProjectsGallery from './gallery';
import ProjectDetail from './detail';

import style from './index.module.scss';

/**
 * 프로젝트 컨테이너 컴포넌트
 * 단일 책임: 컴포넌트 조합 및 렌더링만 담당
 */
const ProjectsContainer = () => {
  const { activeTab, setActiveTab, allProjects, isLoading } =
    useProjectsPage();
  const [selectedProject, setSelectedProject] = useState<Project | null>(null);
  const [isDetailOpen, setIsDetailOpen] = useState(false);

  const handleOpenDetail = (project: Project) => {
    setSelectedProject(project);
    setIsDetailOpen(true);
  };

  const handleCloseDetail = () => {
    setIsDetailOpen(false);
    // 애니메이션 완료 후 프로젝트 데이터 초기화
    setTimeout(() => {
      setSelectedProject(null);
    }, 300);
  };

  return (
    <div className={style.wrap}>
      <ProjectsTabs activeTab={activeTab} onChange={setActiveTab} />
      <ProjectsGallery
        projects={allProjects}
        isLoading={isLoading}
        onViewDetail={handleOpenDetail}
      />
      <ProjectDetail
        project={selectedProject}
        isOpen={isDetailOpen}
        onClose={handleCloseDetail}
      />
    </div>
  );
};

export default ProjectsContainer;

