// clsx
import clsx from 'clsx';

interface IProps {
  title: string;
  direction: string;
}

function Tooltip(props: IProps) {
  const { title, direction } = props;

  return (
    <div
      className={clsx(
        'absolute z-50',
        direction === 'rtl' ? 'top-1/2 left-full' : '-top-9 left-1/2',
        'i-flex-center text-2xs font-bold min-w-max transform py-1.25 px-3 rounded-3xl shadow-2xl opacity-0 invisible',
        direction === 'rtl'
          ? '-translate-y-1/2 translate-x-3.5'
          : '-translate-x-1/2',
        'text-white bg-dk-tooltip-hv',
        'transition-all duration-200 ease-in-out',
        'group-hover:opacity-100 group-hover:visible',
        direction === 'rtl'
          ? 'group-hover:translate-x-2'
          : 'group-hover:translate-y-2'
      )}>
      <span>{title}</span>
    </div>
  );
}

export default Tooltip;
