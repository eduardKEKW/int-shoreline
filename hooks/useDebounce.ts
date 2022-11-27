import { useState, useEffect } from 'react';

interface IProps<V> {
  value: V;
  delay: number;
}

const useDebounce = <V>({ value, delay }: IProps<V>): V => {
  const [debouncedValue, setDebouncedValue] = useState(value);

  useEffect(() => {
    const handler = setTimeout(() => {
      setDebouncedValue(value);
    }, delay);

    return () => {
      clearTimeout(handler);
    };
  }, [value, delay]);

  return debouncedValue;
};

export default useDebounce;
