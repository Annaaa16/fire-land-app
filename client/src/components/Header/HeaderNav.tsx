// clsx
import clsx from 'clsx';

// material ui icons
import MoreHorizIcon from '@mui/icons-material/MoreHoriz';

function HeaderNavs() {
  return (
    <ul className={clsx('hidden lg:flex items-center', 'text-white')}>
      <li
        className={clsx(
          'px-5 font-bold',
          'transition-all duration-250',
          'cursor-pointer',
          'hover:text-primary-v2 dark:hover:text-primary-v4'
        )}>
        Home
      </li>
      <li
        className={clsx(
          'px-5 font-bold',
          'transition-all duration-250',
          'cursor-pointer',
          'hover:text-primary-v2 dark:hover:text-primary-v4'
        )}>
        Careers
      </li>
      <li
        className={clsx(
          'px-5 font-bold',
          'transition-all duration-250',
          'cursor-pointer',
          'hover:text-primary-v2 dark:hover:text-primary-v4'
        )}>
        Faqs
      </li>
      <li
        className={clsx(
          'relative',
          'group px-5 font-bold',
          'transition-all duration-250',
          'cursor-pointer',
          'hover:text-primary-v2 dark:hover:text-primary-v4'
        )}>
        <MoreHorizIcon />

        <ul
          className={clsx(
            'absolute left-0 top-0 z-10',
            'min-w-max px-4 py-1.5 rounded-lg shadow-primary-v1 opacity-0 invisible',
            'bg-primary-v1 dark:bg-primary-v3 text-white',
            'transition-all duration-250',
            'pointer-events-none',
            'group-hover:translate-y-9 group-hover:opacity-100 group-hover:visible group-hover:pointer-events-auto'
          )}>
          <li
            className={clsx(
              'py-3 pl-1 pr-3 border-b border-primary-v1-text',
              'transition-all duration-250',
              'hover:text-primary-v2 dark:hover:text-primary-v4'
            )}>
            About Us
          </li>
          <li
            className={clsx(
              'py-3 pl-1 pr-3 border-b border-primary-v1-text',
              'transition-all duration-250',
              'hover:text-primary-v2 dark:hover:text-primary-v4'
            )}>
            Our Blogs
          </li>
          <li
            className={clsx(
              'py-3 pl-1 pr-3 border-b border-primary-v1-text',
              'transition-all duration-250',
              'hover:text-primary-v2 dark:hover:text-primary-v4'
            )}>
            Contact Us
          </li>
          <li
            className={clsx(
              'py-3 pl-1 pr-3',
              'transition-all duration-250',
              'hover:text-primary-v2 dark:hover:text-primary-v4'
            )}>
            Privacy Policy
          </li>

          <div
            className={clsx(
              'absolute left-0 -top-5 -z-1',
              'w-1/3 h-8',
              'bg-transparent'
            )}
          />
        </ul>
      </li>
    </ul>
  );
}

export default HeaderNavs;
