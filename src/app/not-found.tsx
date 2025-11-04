import Cursor from '@/components/cursor';

import NotFound404 from '@/container/error/NotFound404';

import '@/styles/globals.scss';

export default async function NotFound() {
  return <>
    <NotFound404 />
    <Cursor />
  </>;
}
