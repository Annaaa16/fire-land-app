// clsx
import clsx from 'clsx';

function WidgetsFooter() {
  return (
    <ul className={clsx('flex items-center flex-wrap mt-5')}>
      <li
        className={clsx(
          'text-xs leading-5',
          'text-lt-gray',
          'cursor-pointer',
          'hover:underline'
        )}>
        <a href='#'>About</a>
      </li>
      <li className={clsx('text-lg mx-1 -mt-1.5', 'text-lt-gray')}>.</li>
      <li
        className={clsx(
          'text-xs leading-5',
          'text-lt-gray',
          'cursor-pointer',
          'hover:underline'
        )}>
        <a href='#'>Help</a>
      </li>
      <li className={clsx('text-lg mx-1 -mt-1.5', 'text-lt-gray')}>.</li>
      <li
        className={clsx(
          'text-xs leading-5',
          'text-lt-gray',
          'cursor-pointer',
          'hover:underline'
        )}>
        <a href='#'>Press</a>
      </li>
      <li className={clsx('text-lg mx-1 -mt-1.5', 'text-lt-gray')}>.</li>
      <li
        className={clsx(
          'text-xs leading-5',
          'text-lt-gray',
          'cursor-pointer',
          'hover:underline'
        )}>
        <a href='#'>API</a>
      </li>
      <li className={clsx('text-lg mx-1 -mt-1.5', 'text-lt-gray')}>.</li>
      <li
        className={clsx(
          'text-xs leading-5',
          'text-lt-gray',
          'cursor-pointer',
          'hover:underline'
        )}>
        <a href='#'>Jobs</a>
      </li>
      <li className={clsx('text-lg mx-1 -mt-1.5', 'text-lt-gray')}>.</li>
      <li
        className={clsx(
          'text-xs leading-5',
          'text-lt-gray',
          'cursor-pointer',
          'hover:underline'
        )}>
        <a href='#'>Privacy</a>
      </li>
      <li className={clsx('text-lg mx-1 -mt-1.5', 'text-lt-gray')}>.</li>
      <li
        className={clsx(
          'text-xs leading-5',
          'text-lt-gray',
          'cursor-pointer',
          'hover:underline'
        )}>
        <a href='#'>Terms</a>
      </li>
      <li className={clsx('text-lg mx-1 -mt-1.5', 'text-lt-gray')}>.</li>
      <li
        className={clsx(
          'text-xs leading-5',
          'text-lt-gray',
          'cursor-pointer',
          'hover:underline'
        )}>
        <a href='#'>Locations</a>
      </li>
      <li className={clsx('text-lg mx-1 -mt-1.5', 'text-lt-gray')}>.</li>
      <li
        className={clsx(
          'text-xs leading-5',
          'text-lt-gray',
          'cursor-pointer',
          'hover:underline'
        )}>
        <a href='#'>Hashtags</a>
      </li>
      <li className={clsx('text-lg mx-1 -mt-1.5', 'text-lt-gray')}>.</li>
      <li
        className={clsx(
          'text-xs leading-5',
          'text-lt-gray',
          'cursor-pointer',
          'hover:underline'
        )}>
        <a href='#'>Languages</a>
      </li>
    </ul>
  );
}

export default WidgetsFooter;
