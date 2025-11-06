'use client';

import Image from 'next/image';
import { useTranslations } from 'next-intl';

import Button from '@/components/button';
import Icon from '@/components/icon';
import { ICON_TYPE } from '@/components/icon/index.type';

import { Project } from '@/types/project';

import style from './index.module.scss';

interface ProjectDetailProps {
  project: Project | null;
  isOpen: boolean;
  onClose: () => void;
}

/**
 * 프로젝트 상세 팝업 컴포넌트
 * 단일 책임: 프로젝트 상세 정보 표시
 */
const ProjectDetail = ({ project, isOpen, onClose }: ProjectDetailProps) => {
  const t = useTranslations('projects.detail');

  if (!project) return null;

  return (
    <>
      {/* 오버레이 */}
      {isOpen && (
        <div className={style.overlay} onClick={onClose} />
      )}

      {/* 팝업 */}
      <div className={`${style.wrap} ${isOpen ? style.active : ''}`}>
        <div className={style.header}>
          <Button onClick={onClose} className={style.closeButton}>
            <Icon type={ICON_TYPE.ICON_TYPE_COMMON.close} />
            {t('close')}
          </Button>
        </div>

        <div className={style.content}>
          {/* 썸네일 */}
          {project.thumbnail && (
            <div className={style.thumbnail}>
              <Image
                src={project.thumbnail}
                alt={project.title}
                fill
                style={{ objectFit: 'cover' }}
              />
            </div>
          )}

          {/* 프로젝트 정보 */}
          <div className={style.info}>
            <div className={style.titleSection}>
              <h2 className={style.title}>{project.title}</h2>
              {project.isFavorite && (
                <div className={style.pin}>
                  <Icon type={ICON_TYPE.ICON_TYPE_PROJECT.pin} width={20} height={20} />
                </div>
              )}
            </div>

            <p className={style.description}>{project.description}</p>

            {/* 태그 */}
            {project.tags && project.tags.length > 0 && (
              <div className={style.tags}>
                {project.tags.map((tag, index) => (
                  <span key={index} className={style.tag}>
                    {tag}
                  </span>
                ))}
              </div>
            )}

            {/* 기간 */}
            {(project.startDate || project.endDate) && (
              <div className={style.date}>
                <span className={style.dateLabel}>{t('period')}:</span>
                <span className={style.dateValue}>
                  {project.startDate || '?'} ~ {project.endDate || '진행 중'}
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
                >
                  <Icon type={ICON_TYPE.ICON_TYPE_COMMON.github} />
                  GitHub
                </a>
              )}
              {project.link && (
                <a
                  href={project.link}
                  target="_blank"
                  rel="noopener noreferrer"
                  className={style.link}
                >
                  <Icon type={ICON_TYPE.ICON_TYPE_COMMON.external} />
                  {t('viewSite')}
                </a>
              )}
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default ProjectDetail;

