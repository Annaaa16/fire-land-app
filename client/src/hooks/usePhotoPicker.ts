import { useState, useEffect } from 'react';

// react dropzone
import { useDropzone } from 'react-dropzone';

const usePhotoPicker = () => {
  const [file, setFile] = useState<File | Object>({});
  const [preview, setPreview] = useState<string>('');

  const { getRootProps, getInputProps } = useDropzone({
    accept: 'image/*',
    onDrop: ([file]) => {
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
    getRootProps,
    getInputProps,
  };

  return { file, payload };
};

export default usePhotoPicker;
