import { startTransition, useActionState, useEffect } from 'react';
import styles from './SaveForm.module.css';

type SaveState = 'idle' | 'success';

const initialState: SaveState = 'idle';

type SaveFormProps = {
  onSave: (formData: FormData) => Promise<void>;
  label?: string;
  submitText?: string;
};

export const SaveForm = ({
  onSave,
  label = 'Текст для сохранения',
  submitText = 'Сохранить',
}: SaveFormProps) => {
  const saveForm = async (
    _previousState: SaveState,
    formData: FormData | null,
  ): Promise<SaveState> => {
    if (formData === null) {
      return initialState;
    }

    await onSave(formData);

    return 'success';
  };

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
      : submitText;

  return (
    <form action={submit} className={styles.form}>
      <label className={styles.field}>
        {label}
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
