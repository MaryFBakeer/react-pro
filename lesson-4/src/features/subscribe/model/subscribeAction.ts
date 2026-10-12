import { subscribeToNewsletter } from '../api';
import {
  emailSchema,
  initialSubscribeState,
  type SubscribeState,
} from './subscribeState';

export const SubscribeIntent = {
  Back: 'back',
  Restart: 'restart',
} as const;

const DEFAULT_SUBMIT_ERROR = 'Не удалось оформить подписку, попробуйте позже';

const getString = (formData: FormData, name: string): string => {
  const value = formData.get(name);
  return typeof value === 'string' ? value : '';
};

const submitEmailStep = (formData: FormData): SubscribeState => {
  const rawEmail = getString(formData, 'email');
  const result = emailSchema.safeParse(rawEmail);

  if (!result.success) {
    return {
      step: 'email',
      email: rawEmail,
      error: result.error.issues[0]?.message ?? 'Некорректный email',
    };
  }

  return { step: 'confirm', email: result.data, error: null };
};

const submitConfirmStep = async (
  prevState: SubscribeState,
  formData: FormData,
): Promise<SubscribeState> => {
  if (getString(formData, 'intent') === SubscribeIntent.Back) {
    return { ...prevState, step: 'email', error: null };
  }

  if (getString(formData, 'agree') !== 'on') {
    return {
      ...prevState,
      error: 'Подтвердите согласие на получение рассылки',
    };
  }

  try {
    await subscribeToNewsletter(prevState.email);
    return { ...prevState, step: 'done', error: null };
  } catch (error: unknown) {
    return {
      ...prevState,
      error: error instanceof Error ? error.message : DEFAULT_SUBMIT_ERROR,
    };
  }
};

export const subscribeAction = async (
  prevState: SubscribeState,
  formData: FormData,
): Promise<SubscribeState> => {
  switch (prevState.step) {
    case 'email':
      return submitEmailStep(formData);
    case 'confirm':
      return submitConfirmStep(prevState, formData);
    case 'done':
      return getString(formData, 'intent') === SubscribeIntent.Restart
        ? initialSubscribeState
        : prevState;
    default: {
      const unreachable: never = prevState.step;
      return unreachable;
    }
  }
};
