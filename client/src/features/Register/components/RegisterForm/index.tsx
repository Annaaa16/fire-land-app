import { useEffect, useState } from 'react';

// clsx
import clsx from 'clsx';

// material ui core
import Avatar from '@mui/material/Avatar';

// material ui icons
import DoneIcon from '@mui/icons-material/Done';

// react hook form
import { useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';

// types
import { RegisterFormData } from '@/models/register';

import { formRegisterSchema } from '@/utils/formSchemas';
import { registerUser } from '@/redux/actions/auth';
import useMyDispatch from '@/hooks/useMyDispatch';
import randomAvatar from '@/helpers/randomAvatar';

import FormInput from '@/components/FormInput';

function RegisterForm() {
  const [avatar, setAvatar] = useState<string>('');

  const dispatch = useMyDispatch();

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({
    resolver: yupResolver(formRegisterSchema),
  });

  const handleRandomAvatar = () => {
    const avatar = randomAvatar();

    setAvatar(avatar);
  };

  const handleOnSubmit = (data: RegisterFormData) => {
    const formData = {
      username: data.username,
      password: data.password,
      avatar,
    };

    dispatch(registerUser.request(formData));
  };

  // Random avatar when init app
  useEffect(() => {
    const avatar = randomAvatar();

    setAvatar(avatar);
  }, []);

  return (
    <form
      onSubmit={handleSubmit(handleOnSubmit)}
      className={clsx('mt-2 w-full')}>
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
        <FormInput
          name='confirmPassword'
          register={register}
          errors={errors}
          field='Confirm Password'
        />
      </div>

      <div
        onClick={handleRandomAvatar}
        className={clsx(
          'i-flex-center mx-auto w-12 h-12 mt-5',
          'cursor-pointer'
        )}>
        <Avatar src={avatar} alt='Avatar' className={clsx('w-full h-full')} />
      </div>

      <div className={clsx('flex justify-between items-center mt-5')}>
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
            <span className={clsx('text-xs leading-5', 'dark:text-white')}>
              Send me news and updates via email
            </span>
          </label>
        </div>
      </div>

      <button
        type='submit'
        className={clsx(
          'w-full mt-6 font-bold py-4 rounded-lg text-xs lg:text-sm lg:shadow-primary-v1 lg:dark:shadow-primary-v4',
          'text-white bg-primary-v1 dark:bg-primary-v4',
          'transition-all',
          'hover:bg-primary-v1-hv dark:hover:bg-primary-v4-hv'
        )}>
        Register Now!
      </button>
    </form>
  );
}

export default RegisterForm;
