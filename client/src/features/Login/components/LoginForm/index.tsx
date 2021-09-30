// clsx
import clsx from 'clsx';

// material ui icons
import DoneIcon from '@mui/icons-material/Done';

// react hook form
import { useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';

// types
import FormInput from '@/components/FormInput';
import { LoginFormData } from '@/models/login';

import useMyDispatch from '@/hooks/useMyDispatch';
import { loginUser } from '@/redux/actions/auth';
import { formLoginSchema } from '@/utils/formSchemas';
function LoginForm() {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({
    resolver: yupResolver(formLoginSchema),
  });

  const dispatch = useMyDispatch();

  const handleOnSubmit = (data: LoginFormData) => {
    dispatch(loginUser(data));
  };

  return (
    <form
      onSubmit={handleSubmit(handleOnSubmit)}
      className={clsx('mt-4 w-full')}>
      <div className={clsx('relative')}>
        <FormInput
          name='username'
          register={register}
          errors={errors}
          field='Username'
        />
        <FormInput
          name='password'
          register={register}
          errors={errors}
          field='Password'
        />
      </div>

      <div className={clsx('flex justify-between items-center mt-7')}>
        <div className={clsx('flex items-center')}>
          <label
            htmlFor='remember'
            className={clsx('flex items-center font-bold', 'cursor-pointer')}>
            <div className={clsx('relative', 'mr-2.5 w-4 h-4')}>
              <input
                id='remember'
                type='checkbox'
                className={clsx('peer hidden', 'cursor-pointer')}
              />
              <div
                className={clsx(
                  'absolute top-0 left-0',
                  'i-flex-center w-full h-full rounded border p-2 border-gray dark:border-dk-line peer-checked:border-primary-v2 dark:peer-checked:border-primary-v4',
                  'peer-checked:bg-primary-v2 dark:peer-checked:bg-primary-v4'
                )}>
                <DoneIcon
                  className={clsx('text-lt-cpn dark:text-dk-cpn !w-4')}
                />
              </div>
            </div>
            <span className={clsx('text-xs lg:text-sm', 'dark:text-white')}>
              Remember Me
            </span>
          </label>
        </div>
        <span
          className={clsx(
            'text-gray font-bold text-xs lg:text-sm',
            'text-lt-gray dark:text-dk-gray',
            'transition-all',
            'cursor-pointer',
            'hover:text-primary-v2 dark:hover:text-primary-v4'
          )}>
          Forgot Password?
        </span>
      </div>

      <button
        type='submit'
        className={clsx(
          'w-full mt-7 font-bold py-4 rounded-lg text-xs lg:text-sm shadow-primary-v1 dark:shadow-primary-v3',
          'text-white bg-primary-v1 dark:bg-primary-v3',
          'transition-all',
          'hover:bg-primary-v1-hv dark:hover:bg-primary-v3-hv'
        )}>
        Login to your Account!
      </button>
    </form>
  );
}

export default LoginForm;
