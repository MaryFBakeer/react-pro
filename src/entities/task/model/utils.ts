import type { ITask, ITaskApi } from './types';

export const transformDataTasksListResponse = (res: ITaskApi[]): ITask[] => {
  return res.map((item) => {
    return {
      id: String(item.id),
      title: item.title,
      status: item.completed ? 'completed' : 'incomplete',
    };
  });
};
