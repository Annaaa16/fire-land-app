import { useState, useEffect } from 'react';

// react dropzone
import { useDropzone } from 'react-dropzone';

import { useGlobalContext } from '@/contexts/GlobalContext';

const usePhotoPicker = () => {
  const { showToast } = useGlobalContext();

  const [file, setFile] = useState<File | Object>({});
  const [preview, setPreview] = useState<string>('');

  const { getRootProps, getInputProps } = useDropzone({
    accept: 'image/jpeg, image/png',
    onDrop: ([file]) => {
      // Not img or png
      if (!file) {
        return showToast({
          status: 'warning',
          message: 'Invalid photo',
        });
      }

      setFile(file);
      setPreview(URL.createObjectURL(file));
    },
  });

  // Make sure to revoke the data to avoid memory leaks
  useEffect(
    () => () => {
      URL.revokeObjectURL(preview);
    },
    [preview]
  );

  const payload = {
    preview,
    setPreview,
    setFile,
    getRootProps,
    getInputProps,
  };

  return { file, payload };
};

export default usePhotoPicker;
