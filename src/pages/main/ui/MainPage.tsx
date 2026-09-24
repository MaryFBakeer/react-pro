import { TaskCard, type ITask } from '~entities/task';
import styles from './MainPage.module.css';

const taskItems: ITask[] = [
  {
    id: 'test1',
    title: 'Подготовить макет',
    status: 'incomplete',
  },
  {
    id: 'test2',
    title: 'Написать unit-тесты',
    status: 'completed',
  },
  {
    id: 'test3',
    title: 'Подготовить документацию',
    status: 'incomplete',
  },
];

export const MainPage = () => {
  return (
    <div className={styles.main__page}>
      <h1 className={styles.main__title}>Планер задач</h1>
      {taskItems.map((taskItem) => (
        <TaskCard taskItem={taskItem} key={taskItem.id} />
      ))}
    </div>
  );
};
