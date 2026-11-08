import { startTransition, useOptimistic, useState } from 'react';
import { SaveForm } from '~shared/ui/SaveForm';
import styles from './TodoListOptimistic.module.css';

type Todo = {
  id: string;
  text: string;
  isPending?: boolean;
};

export const TodoListOptimistic = () => {
  const [todos, setTodos] = useState<Todo[]>([]);

  const [optimisticTodos, addOptimisticTodo] = useOptimistic(
    todos,
    (currentTodos, newTodo: Todo) => {
      if (currentTodos.some((todo) => todo.id === newTodo.id)) {
        return currentTodos;
      }

      return [...currentTodos, { ...newTodo, isPending: true }];
    },
  );

  const addTodo = async (formData: FormData) => {
    const text = formData.get('text');
    const newTodo: Todo = {
      id: crypto.randomUUID(),
      text: typeof text === 'string' ? text : '',
    };

    addOptimisticTodo(newTodo);

    await new Promise((resolve) => setTimeout(resolve, 1000));

    startTransition(() => {
      setTodos((currentTodos) => [...currentTodos, newTodo]);
    });
  };

  return (
    <div className={styles.container}>
      <SaveForm onSave={addTodo} label="Новая задача" submitText="Сохранить" />
      <ul className={styles.list} aria-live="polite">
        {optimisticTodos.map((todo) => (
          <li
            key={todo.id}
            className={todo.isPending ? styles.pending : undefined}
          >
            {todo.text}
            {todo.isPending && ' (сохраняется…)'}
          </li>
        ))}
      </ul>
    </div>
  );
};
