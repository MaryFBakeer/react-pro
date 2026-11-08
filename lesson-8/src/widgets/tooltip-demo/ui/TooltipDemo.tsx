import { Tooltip, TooltipPosition } from '~shared/ui/Tooltip';
import styles from './TooltipDemo.module.css';

export const TooltipDemo = () => {
  const handleParentClick = () => {
    console.log('Клик родителя');
  };

  return (
    <main className={styles.demo}>
      <h1>Tooltip</h1>
      <button
        type="button"
        className={styles.parent}
        onClick={handleParentClick}
      >
        <Tooltip content="Подсказка" position={TooltipPosition.TOP}>
          <span>Наведи</span>
        </Tooltip>
      </button>
    </main>
  );
};
