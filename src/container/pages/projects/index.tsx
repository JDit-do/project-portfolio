'use client';

import { useState } from 'react';
import { useProjectsPage } from '@/hooks/useProjectsPage';

import { Project } from '@/types/project';

import ProjectsTabs from './tabs';
import ProjectsGallery from './gallery';
import ProjectDetail from './detail';

import style from './index.module.scss';

interface ProjectsContainerProps {
  initialProjects?: Project[];
}

/**
 * 프로젝트 컨테이너 컴포넌트
 */
const ProjectsContainer = ({
  initialProjects = []
}: ProjectsContainerProps) => {
  const { activeTab, setActiveTab, allProjects, availableTabs, isLoading } =
    useProjectsPage(initialProjects);
  const [selectedProject, setSelectedProject] = useState<Project | null>(null);
  const [isDetailOpen, setIsDetailOpen] = useState(false);

  const handleOpenDetail = (project: Project) => {
    setSelectedProject(project);
    setIsDetailOpen(true);
  };

  const handleCloseDetail = () => {
    setIsDetailOpen(false);
    setTimeout(() => {
      setSelectedProject(null);
    }, 300);
  };

  return (
    <div className={style.wrap}>
      {availableTabs.length > 0 && (
        <ProjectsTabs
          activeTab={activeTab}
          availableTabs={availableTabs}
          onChange={setActiveTab}
        />
      )}
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
