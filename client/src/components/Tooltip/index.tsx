// clsx
import clsx from 'clsx';

interface IProps {
  title: string;
}

function Tooltip(props: IProps) {
  const { title } = props;

  return (
    <div
      className={clsx(
        'absolute top-1/2 left-full',
        'i-flex-center text-2xs font-bold transform -translate-y-1/2 translate-x-3.5 py-1.25 px-3 rounded-3xl shadow-2xl opacity-0 invisible',
        'text-white bg-dk-tooltip-hv',
        'transition-all duration-250',
        'group-hover:translate-x-2 group-hover:opacity-100 group-hover:visible'
      )}>
      <span>{title}</span>
    </div>
  );
}

export default Tooltip;
