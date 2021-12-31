// clsx
import clsx from 'clsx';

// material ui icons
import AppsIcon from '@mui/icons-material/Apps';

import { useGlobalContext } from '@/contexts/GlobalContext';

function HeaderWidget() {
  const { isLargeMenu, handleSetIsLargeMenu } = useGlobalContext();

  return (
    <div
      data-menu-button
      onClick={() => handleSetIsLargeMenu(!isLargeMenu)}
      className={clsx('w-10 ml-2 md:mx-4 lg:ml-0')}>
      <AppsIcon
        data-menu-button
        fontSize='large'
        className={clsx(
          '!w-full',
          'cursor-pointer',
          'lg:hover:text-white',
          isLargeMenu ? 'text-white' : 'text-primary-v1-txt'
        )}
      />
    </div>
  );
}

export default HeaderWidget;
