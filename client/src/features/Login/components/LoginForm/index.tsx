// clsx
import clsx from 'clsx';

// material ui icons
// import DoneIcon from '@mui/icons-material/Done';
import DoneIcon from '@mui/icons-material/Done';

import FormInput from '@/components/FormInput';

function LoginForm() {
  return (
    <form className={clsx('mt-4 lg:mt-10 w-full')}>
      <div className={clsx('relative')}>
        <FormInput field='Username' />
        <FormInput field='Password' />
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
