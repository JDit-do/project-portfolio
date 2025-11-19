'use client';

import style from './index.module.scss';

export type ProjectContentSkeletonVariant = 'card' | 'detail';

interface ProjectContentSkeletonProps {
  variant?: ProjectContentSkeletonVariant;
  projectNumber?: string;
  showThumbnail?: boolean;
}

/**
 * 프로젝트 콘텐츠 스켈레톤 컴포넌트
 * ProjectContent와 동일한 구조
 */
const ProjectContentSkeleton = ({
  variant = 'card',
  projectNumber,
  showThumbnail = true
}: ProjectContentSkeletonProps) => {
  const isCard = variant === 'card';

  return (
    <>
      {/* 프로젝트 번호 오버레이 (카드만) */}
      {isCard && projectNumber && (
        <div className={style.projectNumber}>{projectNumber}</div>
      )}

      {/* 썸네일 */}
      {showThumbnail && (
        <div className={style.thumbnailPlaceholder} />
      )}

      {/* 콘텐츠 */}
      <div className={style.content}>
        <div className={style.titleSection}>
          <div className={`${style.title} ${style.skeletonTitle}`} />
        </div>

        <div className={style.skeletonDescription}>
          <div className={style.skeletonLine} />
          <div className={style.skeletonLine} />
          <div className={style.skeletonLineShort} />
        </div>

        {/* 태그 */}
        <ul className={style.tags}>
          <li className={`${style.tag} ${style.skeletonTag}`} />
          <li className={`${style.tag} ${style.skeletonTag}`} />
          <li className={`${style.tag} ${style.skeletonTag}`} />
        </ul>

        {/* 날짜 */}
        <div className={style.date}>
          <div className={style.skeletonDate} />
        </div>

        {/* 링크 */}
        <div className={style.links}>
          <div className={`${style.link} ${style.skeletonButton}`} />
          <div className={`${style.link} ${style.skeletonButton}`} />
        </div>
      </div>
    </>
  );
};

export default ProjectContentSkeleton;

