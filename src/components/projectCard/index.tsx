'use client';

import { memo } from 'react';
import Image from 'next/image';
import { useTranslations } from 'next-intl';

import Icon from '@/components/icon';
import { ICON_TYPE } from '@/components/icon/index.type';

import { IProjectCardProps } from './index.type';
import style from './index.module.scss';

const ProjectCard = memo(({ project, onViewDetail }: IProjectCardProps) => {
  const t = useTranslations('projects.card');
  const tA11y = useTranslations('accessibility');

  return (
    <article
      className={style.wrap}
      aria-label={`${tA11y('project')}: ${project.title}`}
    >
      {/* 썸네일 */}
      {project.thumbnail ? (
        <div className={style.thumbnail}>
          <Image
            src={project.thumbnail}
            alt={project.title}
            fill
            style={{ objectFit: 'cover' }}
          />
        </div>
      ) : (
        <div
          className={style.thumbnailPlaceholder}
          aria-label={`${project.title} ${tA11y('projectThumbnail')}`}
        />
      )}

      {/* Pin 아이콘 */}
      {project.isFavorite && (
        <div className={style.pin} aria-label={tA11y('favoriteProject')}>
          <Icon
            type={ICON_TYPE.ICON_TYPE_PROJECT.pin}
            width={16}
            height={16}
            aria-hidden="true"
          />
        </div>
      )}

      {/* 콘텐츠 */}
      <div className={style.content}>
        <h3 className={style.title}>{project.title}</h3>
        <p className={style.description}>{project.description}</p>

        {project.tags && project.tags.length > 0 && (
          <ul className={style.tags} aria-label={tA11y('techStack')}>
            {project.tags.map((tag, index) => (
              <li key={index} className={style.tag}>
                {tag}
              </li>
            ))}
          </ul>
        )}

        <div className={style.links}>
          {project.github && (
            <a
              href={project.github}
              target="_blank"
              rel="noopener noreferrer"
              className={style.link}
              aria-label={`${project.title} ${tA11y('githubRepository')}`}
            >
              GitHub
            </a>
          )}
          {project.link && onViewDetail && (
            <button
              onClick={() => onViewDetail(project)}
              className={style.link}
              aria-label={`${project.title} ${tA11y('viewDetail')}`}
            >
              {t('viewDetail')}
            </button>
          )}
          {project.link && !onViewDetail && (
            <a
              href={project.link}
              target="_blank"
              rel="noopener noreferrer"
              className={style.link}
              aria-label={`${project.title} ${tA11y('viewSite')}`}
            >
              {t('viewDetail')}
            </a>
          )}
        </div>
      </div>
    </article>
  );
});

ProjectCard.displayName = 'ProjectCard';

export default ProjectCard;
