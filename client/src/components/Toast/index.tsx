import {
  forwardRef,
  useEffect,
  useImperativeHandle,
  useRef,
  useState,
} from 'react';

// clsx
import clsx from 'clsx';

// headless ui
import { Transition } from '@headlessui/react';

// material ui icons
import CheckCircleIcon from '@mui/icons-material/CheckCircle';
import HandymanIcon from '@mui/icons-material/Handyman';
import AnnouncementIcon from '@mui/icons-material/Announcement';

// types
import { Toast as ToastType } from '@/models/common';

export interface ToastHandler {
  addToast: (toast: ToastType) => void;
}

interface ToastProps {}

const Toast = forwardRef<ToastHandler, ToastProps>((_, forwardRef) => {
  const [toasts, setToast] = useState<ToastType[]>([]);

  useImperativeHandle(forwardRef, () => ({
    addToast(toast: ToastType) {
      setToast((prevToasts) => [...prevToasts, toast]);
    },
  }));

  return (
    <div
      className={clsx('fixed top-20 right-10 z-50', 'flex flex-col gap-y-4')}>
      {toasts.map((toast, idx) => (
        <ToastItem key={toast.status + idx} {...toast} />
      ))}
    </div>
  );
});

export default Toast;

function ToastItem({ message, status }: ToastType) {
  const [isShow, setIsShow] = useState<boolean>(true);

  const timerRef = useRef<NodeJS.Timeout>();

  const clearTimer = () => {
    if (timerRef.current) clearTimeout(timerRef.current);
  };

  useEffect(() => {
    timerRef.current = setTimeout(() => {
      setIsShow(false);
    }, 3000);

    return () => clearTimer();
  }, []);

  const title =
    status === 'success'
      ? 'Success'
      : status === 'warning'
      ? 'Warning'
      : 'Closed';
  const background =
    status === 'success'
      ? 'bg-success'
      : status === 'warning'
      ? 'bg-warning'
      : 'bg-fb-red';
  const Icon =
    status === 'success'
      ? CheckCircleIcon
      : status === 'warning'
      ? AnnouncementIcon
      : HandymanIcon;

  return (
    <Transition
      onClick={() => {
        setIsShow(false);
        clearTimer();
      }}
      appear={true}
      show={isShow}
      enterFrom='translate-x-20 opacity-0'
      enterTo='translate-x-0 opacity-100'
      leaveFrom='translate-x-0 opacity-100'
      leaveTo='translate-x-10 opacity-0'
      className={clsx(
        'flex items-center w-72 h-25 px-4 shadow-md rounded-md',
        'text-white',
        'transition-all ease-out duration-250',
        'cursor-pointer select-none',
        background
      )}>
      <Icon className={clsx('mr-2.5 !text-2xl', 'text-white')} />
      <div>
        <h4 className='text-base-1 font-semibold mb-0,5'>{title}</h4>
        <p className='text-sm-1 leading-normal'>{message}</p>
      </div>
    </Transition>
  );
}
