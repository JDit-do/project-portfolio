import style from './index.module.scss';
import contentStyle from '@/components/project/content/index.module.scss';

/**
 * 프로젝트 카드 스켈레톤
 * ProjectContent 구조를 따름
 */
const ProjectCardSkeleton = () => {
  return (
    <div className={style.wrap}>
      {/* 프로젝트 번호 오버레이 */}
      <div className={contentStyle.projectNumber}>01</div>

      {/* 썸네일 */}
      <div className={contentStyle.thumbnailPlaceholder} />

      {/* 콘텐츠 */}
      <div className={contentStyle.content}>
        {/* 제목 */}
        <div className={contentStyle.titleSection}>
          <div className={style.title} />
        </div>

        {/* 설명 */}
        <div className={style.description}>
          <div className={style.line} />
          <div className={style.line} />
          <div className={style.lineShort} />
        </div>

        {/* 태그 */}
        <ul className={contentStyle.tags}>
          <li className={style.tag} />
          <li className={style.tag} />
          <li className={style.tag} />
        </ul>

        {/* 날짜 */}
        <div className={contentStyle.date}>
          <div className={style.dateLine} />
        </div>

        {/* 링크 */}
        <div className={contentStyle.links}>
          <div className={style.link} />
          <div className={style.link} />
        </div>
      </div>
    </div>
  );
};

export default ProjectCardSkeleton;
