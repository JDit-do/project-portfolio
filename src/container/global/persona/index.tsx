import { IPersonaProps } from './index.type';
import style from './index.module.scss';

const Persona = ({ onToggle }: IPersonaProps) => {
  return (
    <div className={style.wrap}>
      <button onClick={onToggle}>Who is JD?</button>
      <div>
        <span className={style.firstDot}>
          <span />
        </span>
        <span className={style.lastDot}>
          <span />
        </span>
      </div>
    </div>
  );
};

export default Persona;
