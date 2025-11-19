import style from './index.module.scss';

interface Ripple {
  x: number;
  y: number;
  id: number;
}

interface RipplesProps {
  ripples: Ripple[];
}

/**
 * Ripples 컴포넌트
 */
const Ripples = ({ ripples }: RipplesProps) => {
  return (
    <>
      {ripples.map((ripple) => (
        <span
          key={ripple.id}
          className={style.ripple}
          style={{
            left: `${ripple.x}px`,
            top: `${ripple.y}px`
          }}
        />
      ))}
    </>
  );
};

export default Ripples;
