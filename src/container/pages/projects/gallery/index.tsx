'use client';

import { useTranslations } from 'next-intl';

import Gallery from '@/components/gallery';
import ProjectCard from '@/components/projectCard';
import ProjectCardSkeleton from '@/components/projectCardSkeleton';

import { Project } from '@/types/project';

import style from './index.module.scss';

interface ProjectsGalleryProps {
  projects: Project[];
  isLoading?: boolean;
  onViewDetail?: (project: Project) => void;
}

/**
 * 프로젝트 갤러리 컴포넌트
 */
const ProjectsGallery = ({
  projects,
  isLoading = false,
  onViewDetail
}: ProjectsGalleryProps) => {
  const t = useTranslations('projects');

  // 로딩 상태: 스켈레톤 표시
  if (isLoading) {
    const skeletonItems = Array.from({ length: 9 }, (_, index) => index);
    return (
      <Gallery
        items={skeletonItems}
        renderItem={() => <ProjectCardSkeleton />}
        columns={4}
      />
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
    <Gallery
      items={projects}
      renderItem={(project) => (
        <ProjectCard project={project} onViewDetail={onViewDetail} />
      )}
      columns={4}
    />
  );
};

export default ProjectsGallery;
