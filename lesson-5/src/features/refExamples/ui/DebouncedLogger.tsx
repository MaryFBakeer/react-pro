import { useRef, type ChangeEvent } from 'react';
import styles from './refExamples.module.css';

const DEBOUNCE_DELAY_MS = 1000;

export const DebouncedLogger = () => {
  const timeoutIdRef = useRef<ReturnType<typeof setTimeout> | null>(null);

  const handleChange = (event: ChangeEvent<HTMLInputElement>) => {
    const { value } = event.target;

    if (timeoutIdRef.current !== null) {
      clearTimeout(timeoutIdRef.current);
    }

    timeoutIdRef.current = setTimeout(() => {
      console.log('DebouncedLogger:', value);
      timeoutIdRef.current = null;
    }, DEBOUNCE_DELAY_MS);
  };

  return (
    <input
      type="text"
      className={styles.input}
      placeholder="Введите текст"
      onChange={handleChange}
    />
  );
};
