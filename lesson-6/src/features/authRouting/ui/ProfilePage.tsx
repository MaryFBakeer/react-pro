import { skipToken } from '@reduxjs/toolkit/query/react';
import { useEffect } from 'react';
import { useGetMeQuery } from '../api/authApi';
import { getErrorMessage, isUnauthorizedError } from '../lib/getErrorMessage';
import { useAuth } from '../model/useAuth';
import styles from './ProfilePage.module.css';

export function ProfilePage() {
  const { token, signOut } = useAuth();
  // ProtectedRoute не пускает сюда без токена, но skipToken страхует
  // от запроса с пустым заголовком в момент выхода
  const {
    data: user,
    error,
    isLoading,
    refetch,
  } = useGetMeQuery(token ?? skipToken);

  const isUnauthorized = isUnauthorizedError(error);

  // Токен истёк или отозван — сбрасываем его, и ProtectedRoute уведёт на /login
  useEffect(() => {
    if (isUnauthorized) {
      signOut();
    }
  }, [isUnauthorized, signOut]);

  if (isLoading) {
    return (
      <main className={styles.page}>
        <p aria-busy="true">Загружаем профиль…</p>
      </main>
    );
  }

  if (error !== undefined || user === undefined) {
    return (
      <main className={styles.page}>
        <p className={styles.error} role="alert">
          {getErrorMessage(error, 'Не удалось загрузить профиль')}
        </p>
        <button
          className={styles.button}
          type="button"
          onClick={() => void refetch()}
        >
          Повторить
        </button>
      </main>
    );
  }

  return (
    <main className={styles.page}>
      <h1>Привет, {user.name}!</h1>

      <section className={styles.card}>
        {user.avatarPath !== undefined && (
          <img
            className={styles.avatar}
            src={user.avatarPath}
            alt={`Аватар пользователя ${user.name}`}
            width={96}
            height={96}
            loading="lazy"
            decoding="async"
          />
        )}
        <div>
          <p className={styles.name}>{user.name}</p>
          <p>{user.email}</p>
          {user.about !== undefined && <p>{user.about}</p>}
        </div>
      </section>
    </main>
  );
}
