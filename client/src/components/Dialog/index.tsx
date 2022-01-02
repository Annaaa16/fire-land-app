import { forwardRef, useImperativeHandle, useState } from 'react';

// clsx
import clsx from 'clsx';

export interface DialogDataState {
  title: string;
  question: string;
  confirmHandler: () => void;
}

export interface DialogHandler {
  setDialogData: (data: DialogDataState) => void;
}

export interface DialogProps {}

const Dialog = forwardRef<DialogHandler, DialogProps>((_, forwardRef) => {
  const [isShow, setIsShow] = useState<boolean>(false);
  const [dialogData, setDialogData] = useState<DialogDataState>({
    title: '',
    question: '',
    confirmHandler: () => {},
  });

  useImperativeHandle(
    forwardRef,
    () => ({
      setDialogData: (data: DialogDataState) => {
        setIsShow(true);
        setDialogData(data);
      },
    }),
    []
  );

  const handleConfirm = () => {
    dialogData.confirmHandler();
    setIsShow(false);
  };

  if (!isShow) return null;

  return (
    <div className={clsx('fixed inset-0 z-50', 'flex-center')}>
      <div className='modal' onClick={() => setIsShow(false)} />
      <div
        className={clsx(
          'relative',
          'flex-center w-100 mx-5 md:mx-auto max-w-full h-56 md:h-64 rounded-3xl border-3 border-white dark:border-dk-line'
        )}>
        <div
          className={clsx(
            'absolute inset-0',
            'h-full rounded-3xl p-4 -rotate-3',
            'bg-white dark:bg-dk-cpn'
          )}
        />
        <div className={clsx('relative z-1', 'text-center')}>
          <h3
            className={clsx('text-lg md:text-xl font-bold', 'dark:text-white')}>
            {dialogData.title}
          </h3>
          <p className={clsx('mb-8', 'dark:text-white')}>
            {dialogData.question}
          </p>
          <div className='flex justify-center gap-3'>
            <button
              onClick={() => setIsShow(false)}
              className={clsx('btn btn--primary text-sm-1 py-2 px-4')}>
              Cancel
            </button>
            <button
              onClick={handleConfirm}
              className={clsx('btn btn--cancel text-sm-1 py-2 px-4')}>
              Confirm
            </button>
          </div>
        </div>
      </div>
    </div>
  );
});

export default Dialog;
