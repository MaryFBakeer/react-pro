import type { ITask } from '~entities/task';

export const mockTasks: ITask[] = [
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
