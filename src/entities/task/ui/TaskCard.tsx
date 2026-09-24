import type { ITask } from '../model/types';

import deleteIcon from '~shared/assets/icons/delete.svg';
import styles from './TaskCard.module.css';
import { SIZE_ICON, statusIcon } from './consts';

interface TaskCardProps {
  taskItem: ITask;
}

export const TaskCard = ({ taskItem }: TaskCardProps) => {
  const icon = statusIcon[taskItem.status];

  return (
    <article className={styles.task}>
      <p className={styles.title}>{taskItem.title}</p>

      <div className={styles.actions}>
        <img
          src={icon.src}
          alt={icon.alt}
          width={SIZE_ICON}
          height={SIZE_ICON}
        />

        <button aria-label="Удалить задачу" className={styles.delete}>
          <img src={deleteIcon} alt="" width={SIZE_ICON} height={SIZE_ICON} />
        </button>
      </div>
    </article>
  );
};
