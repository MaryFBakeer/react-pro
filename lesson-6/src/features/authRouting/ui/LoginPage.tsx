import type { SubmitEvent } from 'react';
import { Navigate, useLocation, useNavigate } from 'react-router';
import { ROUTES } from '~shared/config';
import { useLoginMutation } from '../api/authApi';
import { getErrorMessage } from '../lib/getErrorMessage';
import { useAuth } from '../model/useAuth';
import styles from './LoginPage.module.css';

// state приходит извне (из ProtectedRoute или из истории браузера),
// поэтому его форму нужно проверять, а не доверять типу
function getRedirectPath(state: unknown): string {
  if (
    typeof state === 'object' &&
    state !== null &&
    'from' in state &&
    typeof state.from === 'object' &&
    state.from !== null &&
    'pathname' in state.from &&
    typeof state.from.pathname === 'string'
  ) {
    return state.from.pathname;
  }

  return ROUTES.profile;
}

// FormData.get возвращает string | File | null — текстовым полям нужна строка
function getTextField(formData: FormData, name: string): string {
  const value = formData.get(name);
  return typeof value === 'string' ? value : '';
}

export function LoginPage() {
  const { isAuthenticated, signIn } = useAuth();
  const navigate = useNavigate();
  const location = useLocation();
  const [login, { isLoading, error }] = useLoginMutation();

  if (isAuthenticated) {
    return <Navigate to={ROUTES.profile} replace />;
  }

  const handleSubmit = async (event: SubmitEvent<HTMLFormElement>) => {
    event.preventDefault();

    const formData = new FormData(event.currentTarget);
    const email = getTextField(formData, 'email').trim();
    const password = getTextField(formData, 'password');

    try {
      const { token } = await login({ email, password }).unwrap();
      signIn(token);
      void navigate(getRedirectPath(location.state), { replace: true });
    } catch {
      // ошибка уже лежит в error из useLoginMutation и выводится в разметке
    }
  };

  return (
    <main className={styles.page}>
      <h1>Вход</h1>

      <form
        className={styles.form}
        onSubmit={(event) => void handleSubmit(event)}
      >
        <label className={styles.field}>
          Email
          <input
            name="email"
            type="email"
            autoComplete="email"
            required
            disabled={isLoading}
          />
        </label>

        <label className={styles.field}>
          Пароль
          <input
            name="password"
            type="password"
            autoComplete="current-password"
            required
            disabled={isLoading}
          />
        </label>

        {error !== undefined && (
          <p className={styles.error} role="alert">
            {getErrorMessage(error)}
          </p>
        )}

        <button className={styles.submit} type="submit" disabled={isLoading}>
          {isLoading ? 'Входим…' : 'Войти'}
        </button>
      </form>
    </main>
  );
}
