// clsx
import clsx from 'clsx';

// react hook form
import { UseFormRegister } from 'react-hook-form';

// types
import { LoginPayload, RegisterPayload } from '@/models/auth';

import { authActions } from '@/redux/slices/authSlice';
import { useAuthSelector } from '@/redux/selectors';
import useStoreDispatch from '@/hooks/useStoreDispatch';

interface FormInputProps {
  field: string;
  name: keyof LoginPayload | keyof RegisterPayload;
  register: UseFormRegister<LoginPayload | RegisterPayload>;
  errors: any;
}

function FormInput(props: FormInputProps) {
  const { field, name, register, errors } = props;

  const { loginStatus, registerStatus } = useAuthSelector();
  const dispatch = useStoreDispatch();

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
          onChange={(e) => {
            register(name).onChange(e);
            (loginStatus.message || registerStatus.message) &&
              dispatch(authActions.clearMessage());
          }}
        />
        <label
          className={clsx(
            'absolute left-4 peer-placeholder-shown:top-1/2 peer-focus:top-0 top-0',
            '-translate-y-1/2 peer-placeholder-shown:px-0 px-1.5 peer-focus:px-1.5 peer-placeholder-shown:text-sm text-xs peer-focus:text-xs',
            'bg-white dark:bg-dk-cpn dark:text-gray-dk peer-focus:text-primary-v1 dark:peer-focus:text-primary-v3 text-gray',
            'transition-all duration-200',
            'select-none pointer-events-none'
          )}>
          {field}
        </label>
      </div>
      <span className={clsx('block mt-1.5 text-xs', 'text-error')}>
        {errors[name]?.message ||
          (!loginStatus.success && loginStatus.message) ||
          (!registerStatus.success &&
            name === 'username' &&
            registerStatus.message)}
      </span>
    </>
  );
}

export default FormInput;
