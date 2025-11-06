'use client';

import { IGalleryProps } from './index.type';
import style from './index.module.scss';

const Gallery = <T,>({ items, renderItem, columns = 3 }: IGalleryProps<T>) => {
  return (
    <div
      className={style.wrap}
      style={{ '--columns': columns } as React.CSSProperties}
      data-columns={columns}
    >
      {items.map((item, index) => (
        <div key={index} className={style.item}>
          {renderItem(item, index)}
        </div>
      ))}
    </div>
  );
};

export default Gallery;

