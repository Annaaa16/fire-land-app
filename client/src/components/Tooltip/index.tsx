// clsx
import clsx from 'clsx';

interface TooltipProps {
  title: string | number;
  direction?: string;
  subClass?: string;
}

function Tooltip(props: TooltipProps) {
  const { title, direction, subClass } = props;

  return (
    <div
      className={clsx(
        'absolute z-50',
        direction === 'rtl' ? 'top-1/2 left-full' : '-top-9 left-1/2',
        'flex-center text-xs-2 font-semibold min-w-max py-1.25 px-3 rounded-3xl shadow-2xl opacity-0 invisible',
        direction === 'rtl'
          ? '-translate-y-1/2 translate-x-3.5'
          : '-translate-x-1/2',
        'text-white bg-dk-tooltip',
        'transition-all duration-200 ease-in-out',
        'pointer-events-none',
        'lg:group-hover:opacity-100 lg:group-hover:visible lg:group-hover:pointer-events-auto',
        direction === 'rtl'
          ? 'lg:group-hover:translate-x-2'
          : 'lg:group-hover:translate-y-2',
        subClass
      )}>
      <span className={clsx('select-none')}>{title}</span>
    </div>
  );
}

export default Tooltip;
