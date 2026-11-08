import { ConfirmDialog, useConfirmDialog } from '~shared/ui/ConfirmDialog';
import styles from './DeleteDemo.module.css';

export const DeleteDemo = () => {
  const { showConfirmDialog, dialogProps } = useConfirmDialog();

  const handleDelete = async () => {
    const confirmed = await showConfirmDialog({
      title: 'Удалить элемент?',
      description: 'Это действие необратимо.',
    });
    console.log(confirmed ? 'Удаление подтверждено' : 'Удаление отменено');
  };

  return (
    <>
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
      {dialogProps && <ConfirmDialog {...dialogProps} />}
    </>
  );
};
