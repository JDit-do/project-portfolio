'use client';

import style from './index.module.scss';

const HomeHero = () => {
  return (
    <div className={style.wrap}>
      <svg
        width="100%"
        height="100%"
        viewBox="0 0 1000 250"
        preserveAspectRatio="xMidYMid meet"
        className={style.subTitle}
      >
        <defs>
          <path id="text-path" d="M 0,250 Q 500,100 1000,250" fill="none" />
        </defs>

        <text fontSize="40" fill="white">
          <textPath href="#text-path" startOffset="50%" textAnchor="middle">
            Rethink the Obvious. Improve the Experience.
          </textPath>
        </text>
      </svg>

      <h2 className={style.mainText}>
        <span>Why Just Build?</span>
        <span className={style.secondLine}>
          It&#39;s Better
          <span className={style.rotateText}>
            <span className={style.word}>Experience.</span>
            <span className={style.word}>Solution.</span>
            <span className={style.word}>Collaboration.</span>
          </span>
        </span>
      </h2>
      <p className={style.tagline}>Just Do. Make an Impact.</p>
    </div>
  );
};

export default HomeHero;
