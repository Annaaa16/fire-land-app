import Image from 'next/image';

// clsx
import clsx from 'clsx';

import img from '@/assets/svgs/thumb.jpg';

function MoviesCard() {
  return (
    <div className={clsx('relative', 'h-36', 'cursor-pointer')}>
      <Image
        src={img.src}
        objectFit='cover'
        alt='Thumbnail'
        layout='fill'
        className={clsx('rounded-lg')}
      />
    </div>
  );
}

export default MoviesCard;
