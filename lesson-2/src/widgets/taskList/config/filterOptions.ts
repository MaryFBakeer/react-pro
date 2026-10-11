import type { Filter } from '~features/taskList';

export const filterOptions: readonly { value: Filter; label: string }[] = [
  { value: 'all', label: 'Все' },
  { value: 'completed', label: 'Выполненные' },
  { value: 'incomplete', label: 'Невыполненные' },
];
