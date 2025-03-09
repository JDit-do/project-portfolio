'use client';

import dynamic from 'next/dynamic';

import useToggle from '@/hooks/useToggle';

import Persona from './persona';
import PersonaContents from './persona/contents';
import style from './index.module.scss';

const LazyTheme = dynamic(() => import('./theme'), {
  ssr: false
});
const LazyLanguage = dynamic(() => import('./language'), {
  ssr: false
});

const Global = () => {
  const { isOpen, handleToggle } = useToggle();

  return (
    <>
      <div className={style.wrap}>
        <ul>
          <li>
            <LazyTheme />
          </li>
          <li>
            <Persona onToggle={handleToggle} />
          </li>
          <li>
            <LazyLanguage />
          </li>
        </ul>
      </div>

      <PersonaContents isOpen={isOpen} onToggle={handleToggle} />
    </>
  );
};

export default Global;
