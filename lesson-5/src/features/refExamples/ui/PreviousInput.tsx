import { useEffect, useRef, useState, type ChangeEvent } from 'react';
import styles from './refExamples.module.css';

export const PreviousInput = () => {
  const [value, setValue] = useState('');
  const previousValueRef = useRef('');

  useEffect(() => {
    previousValueRef.current = value;
  }, [value]);

  const handleChange = (event: ChangeEvent<HTMLInputElement>) => {
    setValue(event.target.value);
  };

  return (
    <div>
      <input
        type="text"
        className={styles.input}
        value={value}
        onChange={handleChange}
        placeholder="Введите текст"
      />
      <p className={styles.text}>
        {/* eslint-disable-next-line react-hooks/refs*/}
        Предыдущее значение: {previousValueRef.current}
      </p>
    </div>
  );
};
