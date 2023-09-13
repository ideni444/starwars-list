import { useEffect, useState } from "react";

export const useDebounce = (callback, delay = 500) => {
  const [debouncedCallback, setDebouncedCallback] = useState(callback);

  useEffect(() => {
    const debounceTimer = setTimeout(() => {
      setDebouncedCallback(callback);
    }, delay);

    return () => {
      clearTimeout(debounceTimer);
    };
  }, [callback, delay]);

  return debouncedCallback;
};
