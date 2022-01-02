// clsx
import clsx from 'clsx';

interface HeaderOptionProps {
  icon: any;
  text: string;
  className?: string;
  onClick: () => void;
}

function HeaderOption(props: HeaderOptionProps) {
  const { icon: Icon, text, className, onClick } = props;

  return (
    <li
      onClick={onClick}
      className={clsx(
        'group flex items-center pl-1 pr-3 py-3',
        'cursor-pointer',
        'transition-all ease-out',
        className
      )}>
      <Icon
        className={clsx(
          'text-white',
          'group-hover:text-primary-v2 dark:group-hover:text-primary-v4'
        )}
      />
      <span
        className={clsx(
          'ml-1.5 font-semibold text-xs md:text-sm',
          'text-white',
          'transition-all ease-out',
          'select-none',
          'group-hover:text-primary-v2 dark:group-hover:text-primary-v4'
        )}>
        {text}
      </span>
    </li>
  );
}

export default HeaderOption;
