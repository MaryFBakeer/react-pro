import { createPortal } from 'react-dom';
import type { ConfirmDialogOptions } from './useConfirmDialog';
import styles from './ConfirmDialog.module.css';

interface ConfirmDialogProps extends ConfirmDialogOptions {
  onClose: (confirmed: boolean) => void;
}

export const ConfirmDialog = ({
  title,
  description,
  onClose,
}: ConfirmDialogProps) => {
  return createPortal(
    <div className={styles.overlay}>
      <section className={styles.dialog} role="dialog" aria-label={title}>
        <h2>{title}</h2>
        <p>{description}</p>
        <div className={styles.actions}>
          <button
            className={styles.confirm}
            type="button"
            onClick={() => onClose(true)}
          >
            Подтвердить
          </button>
          <button
            className={styles.cancel}
            type="button"
            onClick={() => onClose(false)}
          >
            Отмена
          </button>
        </div>
      </section>
    </div>,
    document.body,
  );
};
