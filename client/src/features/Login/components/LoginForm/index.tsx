// clsx
import clsx from 'clsx';

// material ui icons
import DoneIcon from '@mui/icons-material/Done';

// react hook form
import { useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';

// types
import { LoginPayload } from '@/models/auth';
import FormInput from '@/components/FormInput';

import { formLoginSchema } from '@/utils/formSchemas';
import { authActions } from '@/redux/slices/authSlice';
import useStoreDispatch from '@/hooks/useStoreDispatch';

function LoginForm() {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({
    resolver: yupResolver(formLoginSchema),
  });

  const dispatch = useStoreDispatch();

  const handleOnSubmit = (payload: LoginPayload) => {
    dispatch(authActions.loginRequest(payload));
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

      <div className={clsx('flex-between mt-7')}>
        <div className={clsx('flex items-center')}>
          <label
            htmlFor='remember'
            className={clsx(
              'flex items-center font-semibold',
              'cursor-pointer'
            )}>
            <div className={clsx('relative', 'mr-2.5 w-4 h-4')}>
              <input
                id='remember'
                type='checkbox'
                className={clsx('peer hidden', 'cursor-pointer')}
              />
              <div
                className={clsx(
                  'absolute top-0 left-0',
                  'flex-center w-full h-full rounded border p-2 border-gray dark:border-dk-line peer-checked:border-primary-v2 dark:peer-checked:border-primary-v4',
                  'peer-checked:bg-primary-v2 dark:peer-checked:bg-primary-v4'
                )}>
                <DoneIcon
                  className={clsx('text-white dark:text-dk-cpn !w-4')}
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
            'text-gray font-semibold text-xs lg:text-sm',
            'text-gray-lt dark:text-gray-dk',
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
          'btn w-full mt-7 font-semibold py-4 rounded-lg text-xs lg:text-sm shadow-primary-v1 dark:shadow-primary-v3'
        )}>
        Login to your Account!
      </button>
    </form>
  );
}

export default LoginForm;
