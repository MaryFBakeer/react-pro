import { z } from 'zod';

export type SubscribeStep = 'email' | 'confirm' | 'done';

export interface SubscribeState {
  step: SubscribeStep;
  email: string;
  error: string | null;
}

export const initialSubscribeState: SubscribeState = {
  step: 'email',
  email: '',
  error: null,
};

export const emailSchema = z
  .string()
  .trim()
  .min(1, 'Укажите email')
  .pipe(z.email({ error: 'Некорректный формат email' }));
