import { useEffect, useState } from "react";

function useLocalStorageState<T>(key: string, defaultValue: T) {
  const _key = `game-of-life-${key}`;

  const [_value, _setValue] = useState<T>(() => {
    const s = localStorage.getItem(_key);
    return s ? JSON.parse(s) : defaultValue;
  });

  useEffect(() => {
    localStorage.setItem(_key, JSON.stringify(_value));
  }, [_key, _value]);

  return [_value, _setValue] as const;
}

export default useLocalStorageState;
