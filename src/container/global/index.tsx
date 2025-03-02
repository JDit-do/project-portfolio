import Theme from './theme';
import Language from './language';
import SectionPersona from './persona';
import style from './index.module.scss';

const Global = () => {
  return (
    <div className={style.wrap}>
      <ul>
        <li>
          <Theme />
        </li>
        <li>
          <Persona />
          <button>Who is JD?</button>
        </li>
        <li>
          <Language />
        </li>
      </ul>

      <SectionPersona />
    </div>
  );
};

export default Global;
