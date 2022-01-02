// clsx
import clsx from 'clsx';

import Tooltip from '@/components/Tooltip';

interface ContactButtonProps {
  icon: any;
  tooltipTitle: string;
  active: boolean;
  onSelectStatus: () => void;
}

function ContactButton(props: ContactButtonProps) {
  const { icon: Icon, tooltipTitle, active, onSelectStatus } = props;

  return (
    <button
      onClick={onSelectStatus}
      className={clsx(
        'relative',
        'group flex-center min-w-[40px] min-h-[40px] rounded-full',
        active
          ? 'bg-primary-v1 dark:bg-primary-v4'
          : 'bg-gray-200 dark:bg-dk-tooltip',
        'transition-all duration-300 ease-out',
        active
          ? 'dark:hover:bg-primary-v4-hv'
          : 'hover:bg-gray-300 dark:hover:bg-gray-700'
      )}>
      <Icon
        className={clsx(
          '!text-base',
          'dark:text-white',
          active && 'text-white',
          '!transition-none'
        )}
      />
      <Tooltip title={tooltipTitle} direction='btt' />
    </button>
  );
}

export default ContactButton;
