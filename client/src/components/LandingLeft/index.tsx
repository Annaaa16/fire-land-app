// clsx
import clsx from 'clsx';

import logo from '@/assets/svgs/logo.svg';

function LandingLeft() {
  return (
    <div className={clsx('i-flex-center flex-col text-center mb-8 lg:mb-0')}>
      <h3 className={clsx('font-bold text-xl lg:text-2xl mb-5', 'text-white')}>
        WELCOME TO
      </h3>
      <img
        src={logo.src}
        alt='Logo'
        loading='lazy'
        className={clsx('w-36 mb-2', 'cursor-pointer select-none')}
      />
      <p className='hidden lg:block text-white mt-2 leading-6 text-base px-10'>
        The next generation social network & community! Connect with your
        friends and play with our quests and badges gamification system!
      </p>
    </div>
  );
}

export default LandingLeft;
