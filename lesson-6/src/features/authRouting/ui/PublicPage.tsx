import { Link } from 'react-router';
import { ROUTES } from '~shared/config';
import { useAuth } from '../model/useAuth';
import styles from './PublicPage.module.css';

export function PublicPage() {
  const { isAuthenticated } = useAuth();

  return (
    <main className={styles.page}>
      <h1>Публичная страница</h1>
      <p>Эта страница доступна всем, без входа в аккаунт.</p>

      <Link
        className={styles.link}
        to={isAuthenticated ? ROUTES.profile : ROUTES.login}
      >
        {isAuthenticated ? 'Перейти в профиль' : 'Войти'}
      </Link>
    </main>
  );
}
