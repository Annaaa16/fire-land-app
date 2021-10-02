import { Dispatch, SetStateAction } from 'react';

// material ui icons
import AddPhotoAlternateIcon from '@mui/icons-material/AddPhotoAlternate';
import CloseIcon from '@mui/icons-material/Close';

// clsx
import clsx from 'clsx';

// types
import { DropzoneInputProps, DropzoneRootProps } from 'react-dropzone';

interface SenderAreaPhotoProps {
  preview: string;
  setPreview: Dispatch<SetStateAction<string>>;
  setIsAddPhoto: Dispatch<SetStateAction<boolean>>;
  getRootProps: <T extends DropzoneRootProps>(props?: T) => T;
  getInputProps: <T extends DropzoneInputProps>(props?: T) => T;
}

function SenderAreaPhoto(props: SenderAreaPhotoProps) {
  const { preview, setPreview, setIsAddPhoto, getRootProps, getInputProps } =
    props;

  return (
    <>
      <div
        className={clsx(
          'relative',
          'p-2 rounded-lg border border-lt-line dark:border-dk-line',
          preview ? 'h-72' : 'h-64',
          'select-none'
        )}>
        {preview ? (
          <div
            {...getRootProps()}
            className={clsx(
              'h-full rounded-[6px] overflow-hidden',
              'bg-gray-100'
            )}>
            <input {...getInputProps()} />
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img
              src={preview}
              alt='Thumbnail'
              className={clsx('w-full h-full object-cover', 'cursor-pointer')}
            />
          </div>
        ) : (
          <div
            {...getRootProps()}
            className={clsx(
              'i-flex-center flex-col w-full h-full rounded-md',
              'bg-gray-100',
              'cursor-pointer'
            )}>
            <input {...getInputProps()} />
            <div
              className={clsx(
                'i-flex-center rounded-full p-1.5',
                'bg-gray-200'
              )}>
              <AddPhotoAlternateIcon className={clsx('!text-[28px]')} />
            </div>
            <h3 className={clsx('font-bold mt-2 mb-0.5')}>Add Photo/Videos</h3>
            <p className={clsx('text-xs')}>or drag and drops</p>
          </div>
        )}
        <div
          onClick={() => {
            setIsAddPhoto(false);
            setPreview('');
          }}
          className={clsx(
            'absolute top-4 right-4',
            'rounded-full p-1 border border-gray-300',
            'bg-white',
            'transition-all ease-out',
            'hover:bg-gray-100 dark:hover:bg-dk-tooltip-hv',
            'cursor-pointer'
          )}>
          <CloseIcon className={clsx('!text-lg', 'dark:text-gray-400')} />
        </div>
      </div>
    </>
  );
}

export default SenderAreaPhoto;
