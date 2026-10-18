import { useRef } from 'react';
import styles from './ClickTimer.module.css';

interface ClickData {
  startTime: number | null;
  clickCount: number;
}

export const ClickTimer = () => {
  const clickDataRef = useRef<ClickData>({
    startTime: null,
    clickCount: 0,
  });

  const handleClick = () => {
    const now = Date.now();
    const clickData = clickDataRef.current;

    clickData.clickCount += 1;

    if (clickData.startTime === null) {
      clickData.startTime = now;
      console.log('ClickTimer: первый клик зафиксирован', {
        clickCount: clickData.clickCount,
      });
      return;
    }

    console.log('ClickTimer:', {
      elapsedMs: now - clickData.startTime,
      clickCount: clickData.clickCount,
    });
  };

  return (
    <button type="button" className={styles.button} onClick={handleClick}>
      Кликни
    </button>
  );
};
