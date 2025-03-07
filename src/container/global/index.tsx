'use client';

import useToggle from '@/hooks/useToggle';

import Theme from './theme';
import Language from './language';
import Persona from './persona';
import PersonaContents from './persona/contents';

import style from './index.module.scss';

const Global = () => {
  const { isOpen, handleToggle } = useToggle();

  return (
    <>
      <div className={style.wrap}>
        <ul>
          <li>
            <Theme />
          </li>
          <li>
            <Persona onToggle={handleToggle} />
          </li>
          <li>
            <Language />
          </li>
        </ul>
      </div>

      <PersonaContents isOpen={isOpen} onToggle={handleToggle} />
    </>
  );
};

export default Global;
