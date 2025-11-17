'use client';

import Image from 'next/image';
import { useTranslations } from 'next-intl';

import Icon from '@/components/icon';
import { ICON_TYPE } from '@/components/icon/index.type';
import { getSkillIconUrl } from '@/utils/skillIcons';

import { Project } from '@/types/project';

import style from './index.module.scss';

export type ProjectContentVariant = 'card' | 'detail';

interface ProjectContentProps {
  project: Project;
  variant?: ProjectContentVariant;
  projectNumber?: string;
  onViewDetail?: (project: Project) => void;
  showDateLabel?: boolean;
  showThumbnail?: boolean;
}

/**
 * 프로젝트 콘텐츠 컴포넌트
 * 카드와 상세 화면에서 공통으로 사용
 */
const ProjectContent = ({
  project,
  variant = 'card',
  projectNumber,
  onViewDetail,
  showDateLabel = false,
  showThumbnail = true
}: ProjectContentProps) => {
  const t = useTranslations('projects.card');
  const tDetail = useTranslations('projects.detail');
  const tA11y = useTranslations('accessibility');

  const isCard = variant === 'card';
  const TitleTag = isCard ? 'h3' : 'h2';

  return (
    <>
      {/* 프로젝트 번호 오버레이 (카드만) */}
      {isCard && projectNumber && (
        <div className={style.projectNumber}>{projectNumber}</div>
      )}

      {/* 썸네일 */}
      {showThumbnail && (
        <>
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
            isCard && (
              <div
                className={style.thumbnailPlaceholder}
                aria-label={`${project.title} ${tA11y('projectThumbnail')}`}
              />
            )
          )}
        </>
      )}

      {/* Pin 아이콘 */}
      {project.isFavorite && (
        <div className={style.pin} aria-label={tA11y('favoriteProject')}>
          <Icon
            type={ICON_TYPE.ICON_TYPE_PROJECT.pin}
            width={isCard ? 16 : 20}
            height={isCard ? 16 : 20}
            aria-hidden="true"
          />
        </div>
      )}

      {/* 콘텐츠 */}
      <div className={style.content}>
        <div className={style.titleSection}>
          <TitleTag className={style.title}>{project.title}</TitleTag>
        </div>

        <p className={style.description}>{project.description}</p>

        {/* 태그 */}
        {project.tags && project.tags.length > 0 && (
          <ul className={style.tags} aria-label={tA11y('techStack')}>
            {project.tags.map((tag, index) => {
              const iconUrl = getSkillIconUrl(tag);
              return (
                <li key={index} className={style.tag}>
                  {iconUrl ? (
                    <Image
                      src={iconUrl}
                      alt={tag}
                      width={16}
                      height={16}
                      className={style.tagIcon}
                      unoptimized
                      aria-hidden="true"
                      onError={(e) => {
                        // 아이콘 로드 실패 시 숨김 처리
                        e.currentTarget.style.display = 'none';
                      }}
                    />
                  ) : null}
                  <span>{tag}</span>
                </li>
              );
            })}
          </ul>
        )}

        {/* 기간 */}
        {(project.startDate || project.endDate) && (
          <div className={style.date}>
            {showDateLabel && (
              <span className={style.dateLabel}>{tDetail('period')}:</span>
            )}
            <span className={showDateLabel ? style.dateValue : ''}>
              {project.startDate || '?'} ~{' '}
              {project.endDate || tDetail('inProgress')}
            </span>
          </div>
        )}

        {/* 링크 */}
        <div className={style.links}>
          {project.github && (
            <a
              href={project.github}
              target="_blank"
              rel="noopener noreferrer"
              className={style.link}
              aria-label={`${project.title} ${tA11y('githubRepository')}`}
            >
              <Icon
                type={ICON_TYPE.ICON_TYPE_COMMON.github}
                width={16}
                height={16}
                aria-hidden="true"
              />
              <span className={style.linkText}>{tDetail('github')}</span>
            </a>
          )}
          {isCard && onViewDetail && (
            <button
              onClick={() => onViewDetail(project)}
              className={style.link}
              aria-label={`${project.title} ${tA11y('viewDetail')}`}
            >
              <Icon
                type={ICON_TYPE.ICON_TYPE_COMMON.detail}
                width={16}
                height={16}
                aria-hidden="true"
              />
              <span className={style.linkText}>{t('viewDetail')}</span>
            </button>
          )}
          {project.link && (
            <a
              href={project.link}
              target="_blank"
              rel="noopener noreferrer"
              className={style.link}
              aria-label={`${project.title} ${tA11y('viewSite')}`}
            >
              <Icon
                type={ICON_TYPE.ICON_TYPE_COMMON.external}
                width={16}
                height={16}
                aria-hidden="true"
              />
              <span className={style.linkText}>{tDetail('viewSite')}</span>
            </a>
          )}
        </div>
      </div>
    </>
  );
};

export default ProjectContent;
