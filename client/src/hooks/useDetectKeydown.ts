import { KeyboardEvent, useState } from 'react';

const useDetectKeydown = () => {
  const [defaultRows] = useState<number>(3);
  const [isCtrlA, setIsCtrlA] = useState<boolean>(false);
  const [textareaRows, setTextareaRows] = useState<number>(defaultRows);

  const handleTextareaRows = (e: KeyboardEvent<HTMLTextAreaElement>) => {
    const key = e.code;

    setIsCtrlA(false);

    if (key === 'Enter' || key === 'NumpadEnter') {
      setTextareaRows(textareaRows + 1);
    } else if (key === 'Backspace') {
      isCtrlA && setTextareaRows(defaultRows);
      textareaRows > defaultRows &&
        !isCtrlA &&
        setTextareaRows(textareaRows - 1);
    } else if (key === 'KeyA' && e.nativeEvent.ctrlKey) {
      setIsCtrlA(true);
    }
  };

  return { textareaRows, handleTextareaRows };
};

export default useDetectKeydown;
