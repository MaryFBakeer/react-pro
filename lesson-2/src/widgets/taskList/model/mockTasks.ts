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
  {
    id: 'test4',
    title: 'Настроить CI для проверки линтера',
    status: 'completed',
  },
  {
    id: 'test5',
    title: 'Провести код-ревью фичи фильтрации',
    status: 'incomplete',
  },
  {
    id: 'test6',
    title: 'Обновить зависимости проекта',
    status: 'completed',
  },
  {
    id: 'test7',
    title: 'Добавить адаптивную вёрстку для мобильных',
    status: 'incomplete',
  },
  {
    id: 'test8',
    title: 'Исправить баг с удалением задачи',
    status: 'completed',
  },
  {
    id: 'test9',
    title: 'Проверить доступность (a11y) кнопок',
    status: 'incomplete',
  },
  {
    id: 'test10',
    title: 'Сделать профилирование через React DevTools',
    status: 'incomplete',
  },
  {
    id: 'test11',
    title: 'Настроить алиасы импортов',
    status: 'completed',
  },
  {
    id: 'test12',
    title: 'Описать структуру FSD в README',
    status: 'completed',
  },
];
