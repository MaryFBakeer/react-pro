import deleteIcon from '~shared/assets/icons/delete.svg';
import styles from './DeleteTaskButton.module.css';

const SIZE_ICON = 20;

interface DeleteTaskButtonProps {
  taskId: string;
  onDelete: (id: string) => void;
}

export const DeleteTaskButton = ({
  taskId,
  onDelete,
}: DeleteTaskButtonProps) => {
  return (
    <button
      type="button"
      aria-label="Удалить задачу"
      className={styles.delete}
      onClick={() => {
        onDelete(taskId);
      }}
    >
      <img src={deleteIcon} alt="" width={SIZE_ICON} height={SIZE_ICON} />
    </button>
  );
};
