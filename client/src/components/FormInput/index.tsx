// clsx
import clsx from 'clsx';

interface FormInputProps {
  field: string;
  name: string;
  register: any;
  errors: any;
}

function FormInput(props: FormInputProps) {
  const { field, name, register, errors } = props;

  return (
    <>
      <div className={clsx('relative', 'mt-7')}>
        <input
          {...register(name)}
          className={clsx(
            'peer px-4 py-5 md:py-4 w-full text-xs md:text-sm border border-lt-line dark:border-dk-line focus:border-primary-v1 dark:focus:border-primary-v3 outline-none rounded-lg',
            'dark:text-white placeholder-transparent bg-transparent',
            'transition-all'
          )}
          placeholder='placeholder'
          autoComplete='off'
        />
        <label
          className={clsx(
            'absolute left-4 peer-placeholder-shown:top-1/2 peer-focus:top-0 top-0',
            '-translate-y-1/2 peer-placeholder-shown:px-0 px-1.5 peer-focus:px-1.5 peer-placeholder-shown:text-sm text-xs peer-focus:text-xs',
            'bg-lt-cpn dark:bg-dk-cpn dark:text-dk-gray peer-focus:text-primary-v1 dark:peer-focus:text-primary-v3 text-gray',
            'transition-all duration-200',
            'select-none pointer-events-none'
          )}>
          {field}
        </label>
      </div>
      <span className={clsx('block mt-1.5 text-xs', 'text-[#f02849]')}>
        {errors[name]?.message}
      </span>
    </>
  );
}

export default FormInput;
