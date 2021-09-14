// clsx
import clsx from 'clsx';

interface IProps {
  field: string;
}

function FormInput(props: IProps) {
  const { field } = props;

  return (
    <div className={clsx('relative', 'mt-7')}>
      <input
        className={clsx(
          'peer p-4 w-full border border-lt-line dark:border-dk-line focus:border-primary-v1 dark:focus:border-primary-v3 outline-none rounded-lg',
          'text-lt-text dark:text-dk-text placeholder-transparent bg-transparent',
          'transition-all'
        )}
        placeholder='placeholder'
        autoComplete='off'
      />
      <label
        className={clsx(
          'absolute left-4 peer-placeholder-shown:top-1/2 peer-focus:top-0 top-0',
          'transform -translate-y-1/2 peer-placeholder-shown:px-0 px-1.5 peer-focus:px-1.5 peer-placeholder-shown:text-sm text-xs peer-focus:text-xs',
          'bg-lt-body dark:bg-dk-body text-lt-gray dark:text-dk-gray peer-focus:text-primary-v1 dark:peer-focus:text-primary-v3 text-gray',
          'transition-all duration-200',
          'select-none pointer-events-none'
        )}>
        {field}
      </label>
    </div>
  );
}

export default FormInput;
