// clsx
import clsx from 'clsx';

import Image from '@/components/Image';

import notMatch from '@/assets/svgs/not-match.svg';

function PeopleNotMatch() {
  return (
    <div className='flex-center flex-col mt-14'>
      <div className={clsx('w-28 h-28 mb-4')}>
        <Image
          src={notMatch.src}
          layout='fill'
          alt='Not Found'
          objectFit='cover'
          priority={true}
          styleLoading='cover'
        />
      </div>
      <h1
        className={clsx(
          'font-semibold text-lg leading-none mb-2',
          'dark:text-gray'
        )}>
        We didn't find any results
      </h1>
      <p className={clsx('mb-4 text-center', 'dark:text-gray')}>
        Make sure everything is spelled correctly or try different keywords.
      </p>
    </div>
  );
}

export default PeopleNotMatch;
