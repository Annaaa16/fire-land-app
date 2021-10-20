import { useState, useEffect } from 'react';

const useLocalStorage = (
  key: string,
  initialValue?: string,
  useCustomEffect = useEffect
) => {
  const [storedValue, setStoredValue] = useState<string>('');

  const setValue = (value: string) => {
    setStoredValue(value);

    localStorage.setItem(key, JSON.stringify(value));
  };

  // Fix server side don't have localStorage
  useCustomEffect(() => {
    setStoredValue(() => {
      try {
        const item = localStorage.getItem(key);

        return item ? JSON.parse(item) : initialValue;
      } catch (error) {
        console.log('Get localStorage ' + key + ' error 👉', error);
        return initialValue;
      }
    });
  }, [key, initialValue]);

  return { storedValue, setValue };
};

export default useLocalStorage;
