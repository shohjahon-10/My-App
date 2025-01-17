import { useEffect, useState } from "react";

export function useDebounce(value, delay = 1000) {
  const [debouncedValue, setDebouncedValue] = useState(value);

  useEffect(() => {
    const timeOutDelay = setTimeout(() => {
      setDebouncedValue(value);
    }, delay);
    return () => {
      clearTimeout(timeOutDelay);
    };
  }, [value, delay]);

  return {
    debouncedValue,
  };
}
