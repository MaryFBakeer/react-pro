import { skipToken } from '@reduxjs/toolkit/query/react';
import { useEffect } from 'react';
import { Link, useNavigate } from 'react-router';
import { baseApi } from '~shared/api';
import { ROUTES } from '~shared/config';
import { useAppDispatch } from '~shared/store';
import { useGetMeQuery } from '../api/authApi';
import { getErrorMessage, isUnauthorizedError } from '../lib/getErrorMessage';
import { useAuth } from '../model/useAuth';
import styles from './ProfilePage.module.css';

export function ProfilePage() {
  const { token, signOut } = useAuth();
  const navigate = useNavigate();
  const dispatch = useAppDispatch();

  const {
    data: user,
    error,
    isLoading,
    refetch,
  } = useGetMeQuery(token ?? skipToken);

  const isUnauthorized = isUnauthorizedError(error);

  useEffect(() => {
    if (isUnauthorized) {
      signOut();
    }
  }, [isUnauthorized, signOut]);

  const handleLogout = () => {
    signOut();
    dispatch(baseApi.util.resetApiState());
    void navigate(ROUTES.login, { replace: true });
  };

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
        <div>
          <p className={styles.name}>{user.name}</p>
          <p>{user.email}</p>
          {user.about !== undefined && <p>{user.about}</p>}
        </div>
      </section>

      <div className={styles.actions}>
        <Link className={styles.link} to={ROUTES.public}>
          Публичная страница
        </Link>
        <button className={styles.button} type="button" onClick={handleLogout}>
          Выйти
        </button>
      </div>
    </main>
  );
}
