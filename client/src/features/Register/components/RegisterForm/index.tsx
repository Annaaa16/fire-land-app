// material ui icons
import DoneIcon from '@mui/icons-material/Done';

// clsx
import clsx from 'clsx';

import FormInput from '@/components/FormInput';

function RegisterForm() {
  return (
    <form className={clsx('mt-4 lg:mt-10 w-full')}>
      <div className={clsx('relative')}>
        <FormInput field='Username' />
        <FormInput field='Password' />
        <FormInput field='Confirm Password' />
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
            <span className={clsx('text-xs', 'text-lt-text dark:text-dk-text')}>
              Send me news and updates via email
            </span>
          </label>
        </div>
      </div>

      <button
        type='submit'
        className={clsx(
          'w-full mt-7 font-bold py-4 rounded-lg text-xs lg:text-sm shadow-primary-v1 dark:shadow-primary-v4',
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
