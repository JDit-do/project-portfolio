import style from './index.module.scss';

/**
 * 프로젝트 카드 스켈레톤
 */
const ProjectCardSkeleton = () => {
  return (
    <div className={style.wrap}>
      <div className={style.thumbnail} />
      <div className={style.content}>
        <div className={style.title} />
        <div className={style.description}>
          <div className={style.line} />
          <div className={style.line} />
          <div className={style.lineShort} />
        </div>
        <div className={style.tags}>
          <div className={style.tag} />
          <div className={style.tag} />
          <div className={style.tag} />
        </div>
        <div className={style.links}>
          <div className={style.link} />
          <div className={style.link} />
        </div>
      </div>
    </div>
  );
};

export default ProjectCardSkeleton;
