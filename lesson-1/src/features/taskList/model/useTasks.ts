import { useState } from 'react';
import type { ITask, TTaskStatus } from '~entities/task';

export type Filter = 'all' | TTaskStatus;

interface UseTasksResult {
  tasks: ITask[]; // отфильтрованные задачи
  filter: Filter; // текущий фильтр
  setFilter: (f: Filter) => void; // смена фильтра
  removeTask: (id: string) => void; // удаление задачи по ID
}

export const useTasks = (initial: ITask[]): UseTasksResult => {
  const [tasks, setTasks] = useState<ITask[]>(initial);
  const [filter, setFilter] = useState<Filter>('all');

  const filteredTasks =
    filter === 'all' ? tasks : tasks.filter((task) => task.status === filter);

  const removeTask = (id: string) => {
    setTasks((prev) => prev.filter((task) => task.id !== id));
  };

  return { tasks: filteredTasks, filter, setFilter, removeTask };
};
