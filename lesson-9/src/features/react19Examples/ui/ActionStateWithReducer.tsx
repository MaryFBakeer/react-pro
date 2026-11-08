import { startTransition, useActionState, useEffect } from 'react';
import { useFormStatus } from 'react-dom';
import { saveFormStyles as styles } from '~shared/ui/SaveForm';

type FormState = {
  status: 'idle' | 'dirty' | 'success';
  name: string;
  message: string;
};

const initialState: FormState = {
  status: 'idle',
  name: '',
  message: '',
};

const formReducer = async (
  previousState: FormState,
  formData: FormData | 'dirty' | null,
): Promise<FormState> => {
  if (formData === null) {
    return initialState;
  }

  if (formData === 'dirty') {
    return { ...previousState, status: 'dirty' };
  }

  const name = formData.get('name');
  const message = formData.get('message');
  const values = {
    name: typeof name === 'string' ? name : '',
    message: typeof message === 'string' ? message : '',
  };

  const savedValues = await new Promise<typeof values>((resolve) => {
    setTimeout(() => resolve(values), 1000);
  });

  return { status: 'success', ...savedValues };
};

const FormFields = ({ status }: { status: FormState['status'] }) => {
  const { pending } = useFormStatus();

  return (
    <>
      <label className={styles.field}>
        Имя
        <input
          className={styles.input}
          type="text"
          name="name"
          disabled={pending}
        />
      </label>
      <label className={styles.field}>
        Сообщение
        <input
          className={styles.input}
          type="text"
          name="message"
          disabled={pending}
        />
      </label>
      <button className={styles.button} type="submit" disabled={pending}>
        Сохранить
      </button>
      <p role="status">Статус: {pending ? 'submitting' : status}</p>
    </>
  );
};

export const ActionStateWithReducer = () => {
  const [state, submit, isPending] = useActionState(formReducer, initialState);

  useEffect(() => {
    if (state.status !== 'success' || isPending) {
      return;
    }

    const timeoutId = setTimeout(() => {
      startTransition(() => submit(null));
    }, 1500);

    return () => clearTimeout(timeoutId);
  }, [state.status, submit, isPending]);

  const markDirty = () => {
    startTransition(() => submit('dirty'));
  };

  return (
    <form action={submit} onChange={markDirty} className={styles.form}>
      <FormFields status={state.status} />
    </form>
  );
};
