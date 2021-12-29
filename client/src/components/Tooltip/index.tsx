// clsx
import clsx from 'clsx';

interface TooltipProps {
  title: string | number;
  direction?: 'rtl' | 'ttb' | 'btt';
  className?: string;
}

function Tooltip(props: TooltipProps) {
  const { title, direction, className } = props;

  return (
    <div
      className={clsx(
        'absolute z-50',
        'flex-center text-xs-2 font-semibold min-w-max py-1 px-3 rounded-3xl shadow-2xl opacity-0 invisible scale-90',
        'text-white bg-dk-tooltip',
        'transition-all duration-200 ease-in-out',
        'pointer-events-none',
        'lg:group-hover:opacity-100 lg:group-hover:visible lg:group-hover:pointer-events-auto',
        'lg:group-hover:scale-100',
        [
          direction === 'rtl' && [
            'top-1/2 left-full',
            '-translate-y-1/2 translate-x-3.5',
            'lg:group-hover:translate-x-2',
          ],
          direction === 'ttb' && [
            '-top-9 left-1/2',
            '-translate-x-1/2',
            'lg:group-hover:translate-y-2',
          ],
          direction === 'btt' && [
            'left-1/2 top-full',
            '-translate-x-1/2',
            'lg:group-hover:translate-y-2',
          ],
          className,
        ]
      )}>
      <span className={clsx('select-none')}>{title}</span>
    </div>
  );
}

export default Tooltip;
