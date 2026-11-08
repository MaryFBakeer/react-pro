import { startTransition, useActionState, useEffect } from 'react';
import styles from './FormWithAsyncSave.module.css';

type SaveState = 'idle' | 'success';

const initialState: SaveState = 'idle';

async function saveForm(
  _previousState: SaveState,
  formData: FormData | null,
): Promise<SaveState> {
  if (formData === null) {
    return initialState;
  }

  await new Promise((resolve) => setTimeout(resolve, 1000));

  return 'success';
}

export const FormWithAsyncSave = () => {
  const [state, submit, isPending] = useActionState(saveForm, initialState);

  useEffect(() => {
    if (state !== 'success' || isPending) {
      return;
    }
    const timeoutId = setTimeout(() => {
      startTransition(() => submit(null));
    }, 1500);

    return () => clearTimeout(timeoutId);
  }, [state, submit, isPending]);

  const buttonText = isPending
    ? 'Saving…'
    : state === 'success'
      ? 'Saved!'
      : 'Сохранить';

  return (
    <form action={submit} className={styles.form}>
      <label className={styles.field}>
        Текст для сохранения
        <input
          className={styles.input}
          type="text"
          name="text"
          disabled={isPending}
        />
      </label>
      <button
        className={styles.button}
        type="submit"
        disabled={isPending}
        aria-live="polite"
      >
        {buttonText}
      </button>
    </form>
  );
};
