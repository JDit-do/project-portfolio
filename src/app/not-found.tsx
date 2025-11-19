import Cursor from '@/shared/components/layout/cursor';

import NotFound404 from '@/shared/components/error/NotFound404';

import '@/shared/styles/globals.scss';

export default async function NotFound() {
  return (
    <>
      <NotFound404 />
      <Cursor />
    </>
  );
}
