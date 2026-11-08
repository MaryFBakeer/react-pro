import { Tooltip, TooltipPosition } from '~shared/ui/Tooltip';
import { ConfirmDialog, useConfirmDialog } from '~shared/ui/ConfirmDialog';
import styles from './TooltipDemo.module.css';

export const TooltipDemo = () => {
  const { showConfirmDialog, dialogProps } = useConfirmDialog();

  const handleDelete = async () => {
    const confirmed = await showConfirmDialog({
      title: 'Удалить элемент?',
      description: 'Это действие необратимо.',
    });
    console.log(confirmed ? 'Удаление подтверждено' : 'Удаление отменено');
  };

  const handleParentClick = () => {
    console.log('Клик родителя');
  };

  return (
    <main className={styles.demo}>
      <h1>Tooltip</h1>
      <div className={styles.card}>
        <button
          type="button"
          className={styles.parent}
          onClick={handleParentClick}
        >
          <Tooltip content="Подсказка" position={TooltipPosition.TOP}>
            <span>Наведи</span>
          </Tooltip>
        </button>
        <button
          type="button"
          className={styles.button}
          disabled={dialogProps !== null}
          onClick={() => {
            void handleDelete();
          }}
        >
          Удалить
        </button>
      </div>
      {dialogProps && <ConfirmDialog {...dialogProps} />}
    </main>
  );
};
