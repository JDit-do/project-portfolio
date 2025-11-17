'use client';

import Image from 'next/image';
import { useTranslations } from 'next-intl';

import Button from '@/components/button';
import Icon from '@/components/icon';
import { ICON_TYPE } from '@/components/icon/index.type';
import ProjectContent from '@/components/projectContent';

import { Project } from '@/types/project';

import style from './index.module.scss';

interface ProjectsDetailProps {
  project: Project | null;
  isOpen: boolean;
  onClose: () => void;
}

/**
 * 프로젝트 상세 팝업 컴포넌트
 */
const ProjectsDetail = ({ project, isOpen, onClose }: ProjectsDetailProps) => {
  const t = useTranslations('projects.detail');

  if (!project) return null;

  return (
    <>
      {/* 오버레이 */}
      {isOpen && <div className={style.overlay} onClick={onClose} />}

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
          <div className={`${style.info} detail`}>
            <ProjectContent
              project={project}
              variant="detail"
              showDateLabel
              showThumbnail={false}
            />
          </div>
        </div>
      </div>
    </>
  );
};

export default ProjectsDetail;
