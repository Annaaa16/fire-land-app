import { useState } from 'react';

// material ui icons
import AddPhotoAlternateIcon from '@mui/icons-material/AddPhotoAlternate';
import CloseIcon from '@mui/icons-material/Close';

// clsx
import clsx from 'clsx';

// types
import { DropzoneInputProps, DropzoneRootProps } from 'react-dropzone';
import { Dispatch, SetStateAction } from 'react';

import Image from '../Image';

interface PhotoPickerProps {
  preview: string;
  className?: string;
  updatePhoto?: string;
  setPreview: Dispatch<SetStateAction<string>>;
  setFile: Dispatch<SetStateAction<File | Object>>;
  getRootProps: <T extends DropzoneRootProps>(props?: T) => T;
  getInputProps: <T extends DropzoneInputProps>(props?: T) => T;
  onClosePhoto?: () => void;
}

function PhotoPicker(props: PhotoPickerProps) {
  const {
    preview,
    className,
    updatePhoto,
    setPreview,
    setFile,
    getRootProps,
    getInputProps,
    onClosePhoto,
  } = props;

  const [initPhoto, setInitPhoto] = useState<string | undefined>(updatePhoto);

  const hasPhoto = Boolean(initPhoto || preview);

  const handleRemovePreview = () => {
    setInitPhoto('');
    setPreview('');
    setFile({});
    onClosePhoto && onClosePhoto();
  };

  return (
    <div
      className={clsx(
        'relative',
        'p-2 rounded-lg border border-lt-line dark:border-dk-line',
        hasPhoto ? 'h-72' : 'h-64',
        'select-none',
        className
      )}>
      {hasPhoto ? (
        <div
          {...getRootProps()}
          className={clsx(
            'h-full rounded-[6px] overflow-hidden',
            'bg-gray-100'
          )}>
          <input {...getInputProps()} />
          <Image
            src={preview || initPhoto || ''} // Prioritize preview
            alt='Thumbnail'
            className={clsx('cursor-pointer')}
            styleLoading='image'
            layout='fill'
            objectFit='contain'
          />
        </div>
      ) : (
        <div
          {...getRootProps()}
          className={clsx(
            'flex-center flex-col w-full h-full rounded-md',
            'bg-gray-100 dark:bg-gray-700',
            'cursor-pointer'
          )}>
          <input {...getInputProps()} />
          <div
            className={clsx('flex-center rounded-full p-1.5', 'bg-gray-200')}>
            <AddPhotoAlternateIcon className={clsx('!text-[28px]')} />
          </div>
          <h3
            className={clsx('font-semibold mt-2 mb-0.5', 'dark:text-gray-200')}>
            Add Photo
          </h3>
          <p className={clsx('text-xs', 'dark:text-gray-200')}>
            or drag and drops
          </p>
        </div>
      )}
      <div
        onClick={handleRemovePreview}
        className={clsx(
          'absolute top-4 right-4',
          'flex-center rounded-full p-1 border border-gray-300 w-8 h-8 dark:border-transparent',
          'bg-white dark:bg-dk-cpn',
          'transition-all ease-out',
          'hover:bg-gray-100 dark:hover:bg-dk-tooltip',
          'cursor-pointer'
        )}>
        <CloseIcon className={clsx('!text-lg', 'dark:text-gray-400')} />
      </div>
    </div>
  );
}

export default PhotoPicker;
