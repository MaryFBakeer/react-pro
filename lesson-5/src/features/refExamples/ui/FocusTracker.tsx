import { useRef, type FocusEvent } from 'react';
import styles from './refExamples.module.css';

export const FocusTracker = () => {
  const firstInputRef = useRef<HTMLInputElement>(null);
  const secondInputRef = useRef<HTMLInputElement>(null);
  const focusRef = useRef(0);

  const handleFocus = (event: FocusEvent<HTMLInputElement>) => {
    const from = event.relatedTarget;

    const isFromOtherInput =
      from !== null &&
      (from === firstInputRef.current || from === secondInputRef.current);

    if (!isFromOtherInput) return;

    focusRef.current += 1;
    console.log('FocusTracker: переходов между полями —', focusRef.current);
  };

  const handleFocusFirst = () => {
    firstInputRef.current?.focus();
  };

  return (
    <div className={styles.block}>
      <input
        ref={firstInputRef}
        type="text"
        className={styles.input}
        placeholder="Первое поле"
        onFocus={handleFocus}
      />
      <input
        ref={secondInputRef}
        type="text"
        className={styles.input}
        placeholder="Второе поле"
        onFocus={handleFocus}
      />
      <button
        type="button"
        className={styles.button}
        onClick={handleFocusFirst}
      >
        Сфокусировать на первом
      </button>
    </div>
  );
};
