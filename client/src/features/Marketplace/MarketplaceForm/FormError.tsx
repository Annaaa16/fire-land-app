// clsx
import clsx from 'clsx';

// headlessui
import { Transition } from '@headlessui/react';

interface FormErrorProps {
  hasError: boolean;
  message: string;
}

function FormError({ hasError, message }: FormErrorProps) {
  return (
    <Transition
      show={hasError}
      enter='duration-200'
      enterFrom='opacity-0 translate-x-2'
      enterTo='opacity-100 translate-x-0'
      leave='duration-200'
      leaveFrom='opacity-100 translate-x-0'
      leaveTo='opacity-0 translate-x-2'
      className={clsx(
        'absolute right-0 top-1/2',
        'text-xs rounded-full px-3 py-[3px] -translate-y-1/2',
        'bg-red-400 dark:bg-[#F54F4E] text-white',
        'select-none'
      )}>
      {message}
    </Transition>
  );
}

export default FormError;
