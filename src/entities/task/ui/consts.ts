import type { TTaskStatus } from '../model/types';
import checkIcon from '~shared/assets/icons/check.svg';
import notCheckIcon from '~shared/assets/icons/not.svg';

export const SIZE_ICON = 20;

export const statusIcon: Record<TTaskStatus, { src: string; alt: string }> = {
  completed: { src: checkIcon, alt: 'Выполнена' },
  incomplete: { src: notCheckIcon, alt: 'Не выполнена' },
};
