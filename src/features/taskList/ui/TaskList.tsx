import { useCallback } from 'react';
import { TaskCard, type ITask } from '~entities/task';
import styles from './TaskList.module.css';
import { DeleteTaskButton } from './DeleteTaskButton';

interface TaskListProps {
  tasks: ITask[];
  onDelete: (id: string) => void;
}

export const TaskList = ({ tasks, onDelete }: TaskListProps) => {
  const renderActions = useCallback(
    (taskItem: ITask) => (
      <DeleteTaskButton taskId={taskItem.id} onDelete={onDelete} />
    ),
    [onDelete],
  );

  if (tasks.length === 0) {
    return <p className={styles.empty}>Задач нет</p>;
  }

  return (
    <div className={styles.list}>
      {tasks.map((taskItem) => (
        <TaskCard
          key={taskItem.id}
          taskItem={taskItem}
          actions={renderActions}
        />
      ))}
    </div>
  );
};
