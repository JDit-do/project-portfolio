import ProjectsContainer from '@/container/pages/projects';

import style from './page.module.scss';

export default function PortfolioPage() {
  return (
    <section className={style.wrap}>
      PagePortfolio
      <ProjectsContainer />
    </section>
  );
}
