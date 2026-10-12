import { AuthForm } from '~features/auth';
import styles from './AuthPage.module.css';

export const AuthPage = () => {
  return (
    <div className={styles.page}>
      <h1 className={styles.title}>Форма регистрации</h1>
      <AuthForm />
    </div>
  );
};
