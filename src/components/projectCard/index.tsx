'use client';

import { memo } from 'react';
import { useTranslations } from 'next-intl';

import ProjectContent from '@/components/projectContent';
import ProjectContentSkeleton from '@/components/projectContent/skeleton';

import { IProjectCardProps } from './index.type';
import style from './index.module.scss';

const ProjectCard = memo(
  ({ project, onViewDetail, projectNumber = '01', isSkeleton = false }: IProjectCardProps) => {
    const tA11y = useTranslations('accessibility');

    return (
      <article
        className={`${style.wrap} card`}
        aria-label={isSkeleton ? undefined : `${tA11y('project')}: ${project?.title}`}
      >
        {isSkeleton ? (
          <ProjectContentSkeleton
            variant="card"
            projectNumber={projectNumber}
          />
        ) : (
          project && (
            <ProjectContent
              project={project}
              variant="card"
              projectNumber={projectNumber}
              onViewDetail={onViewDetail}
            />
          )
        )}
      </article>
    );
  }
);

ProjectCard.displayName = 'ProjectCard';

export default ProjectCard;
