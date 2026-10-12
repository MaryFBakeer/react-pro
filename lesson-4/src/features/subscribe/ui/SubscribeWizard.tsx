import { useActionState, useId } from 'react';
import styles from './SubscribeWizard.module.css';
import {
  initialSubscribeState,
  subscribeAction,
  SubscribeIntent,
  type SubscribeStep,
} from '../model';

const TOTAL_STEPS = 2;

const STEP_NUMBER: Record<Exclude<SubscribeStep, 'done'>, number> = {
  email: 1,
  confirm: 2,
};

export const SubscribeWizard = () => {
  const [state, formAction, isPending] = useActionState(
    subscribeAction,
    initialSubscribeState,
  );
  const emailId = useId();
  const agreeId = useId();
  const errorId = useId();

  const errorMessage = state.error && (
    <p id={errorId} role="alert" className={styles.errorText}>
      {state.error}
    </p>
  );

  return (
    <form
      action={formAction}
      className={styles.form}
      noValidate
      aria-busy={isPending}
    >
      {state.step !== 'done' && (
        <p className={styles.stepper}>
          Шаг {STEP_NUMBER[state.step]} из {TOTAL_STEPS}
        </p>
      )}

      {state.step === 'email' && (
        <>
          <div className={styles.fieldGroup}>
            <label htmlFor={emailId} className={styles.label}>
              Email
            </label>
            <input
              id={emailId}
              name="email"
              type="email"
              defaultValue={state.email}
              aria-invalid={Boolean(state.error)}
              aria-describedby={state.error ? errorId : undefined}
              className={styles.input}
              placeholder="you@example.com"
            />
            {errorMessage}
          </div>
          <button type="submit" className={styles.submit} disabled={isPending}>
            Далее
          </button>
        </>
      )}

      {state.step === 'confirm' && (
        <>
          <p className={styles.summary}>
            Подписка будет оформлена на <strong>{state.email}</strong>
          </p>
          <div className={styles.fieldGroup}>
            <label htmlFor={agreeId} className={styles.checkboxLabel}>
              <input
                id={agreeId}
                name="agree"
                type="checkbox"
                aria-invalid={Boolean(state.error)}
                aria-describedby={state.error ? errorId : undefined}
              />
              Согласен получать рассылку
            </label>
            {errorMessage}
          </div>
          <div className={styles.actions}>
            <button
              type="submit"
              name="intent"
              value={SubscribeIntent.Back}
              className={styles.secondaryButton}
              disabled={isPending}
            >
              Назад
            </button>
            <button
              type="submit"
              className={styles.submit}
              disabled={isPending}
            >
              {isPending ? 'Отправка…' : 'Подписаться'}
            </button>
          </div>
        </>
      )}

      {state.step === 'done' && (
        <>
          <p role="status" className={styles.successText}>
            Готово! Подписка на {state.email} оформлена.
          </p>
          <button
            type="submit"
            name="intent"
            value={SubscribeIntent.Restart}
            className={styles.secondaryButton}
          >
            Подписать другой email
          </button>
        </>
      )}
    </form>
  );
};
