import { useCallback, useMemo, useState } from 'react';
import type { ITask, TTaskStatus } from '~entities/task';
import { useGetTasksQuery } from '~entities/task';

export type Filter = 'all' | TTaskStatus;

interface UseTasksResult {
  tasks: ITask[]; // отфильтрованные задачи
  filter: Filter; // текущий фильтр
  setFilter: (f: Filter) => void; // смена фильтра
  removeTask: (id: string) => void; // удаление задачи по ID
  isError: boolean;
}

const EMPTY_TASKS: ITask[] = [];

export const useTasks = (): UseTasksResult => {
  const { data = EMPTY_TASKS, isError } = useGetTasksQuery();

  const [removedIds, setRemovedIds] = useState<string[]>([]);
  const [filter, setFilter] = useState<Filter>('all');

  const filteredTasks = useMemo(
    () =>
      data.filter(
        (task) =>
          !removedIds.includes(task.id) &&
          (filter === 'all' || task.status === filter),
      ),
    [data, removedIds, filter],
  );

  const removeTask = useCallback((id: string) => {
    setRemovedIds((prev) => [...prev, id]);
  }, []);

  return { tasks: filteredTasks, filter, setFilter, removeTask, isError };
};
