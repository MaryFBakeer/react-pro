import { FilterButton } from '~shared/ui/filterButton';
import styles from './TaskWidget.module.css';
import { useTasks } from '../model/useTasks';
import { mockTasks } from '../model/mockTasks';
import { filterOptions } from '../config/filterOptions';
import { TaskList } from './TaskList';

export const TaskWidget = () => {
  const { tasks, filter, setFilter, removeTask } = useTasks(mockTasks);

  return (
    <section className={styles.widget}>
      <div className={styles.filters} role="group" aria-label="Фильтр задач">
        {filterOptions.map((option) => (
          <FilterButton
            key={option.value}
            isActive={option.value === filter}
            onClick={() => {
              setFilter(option.value);
            }}
          >
            {option.label}
          </FilterButton>
        ))}
      </div>

      <TaskList tasks={tasks} onDelete={removeTask} />
    </section>
  );
};
