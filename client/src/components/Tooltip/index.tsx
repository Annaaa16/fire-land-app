// clsx
import clsx from 'clsx';

interface IProps {
  title: string;
  direction: string;
}

function Tooltip(props: IProps) {
  const { title, direction } = props;
  console.log(direction);

  return (
    <div
      className={clsx(
        'absolute',
        direction === 'rtl' ? 'top-1/2 left-full' : '-top-9 -left-0',
        'i-flex-center text-2xs font-bold min-w-max transform py-1.25 px-3 rounded-3xl shadow-2xl opacity-0 invisible',
        direction === 'rtl' ? '-translate-y-1/2 translate-x-3.5' : '',
        'text-white bg-dk-tooltip-hv',
        'transition-all duration-250',
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
