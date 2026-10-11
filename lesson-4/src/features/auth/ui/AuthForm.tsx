import { useForm } from 'react-hook-form';
import styles from './AuthForm.module.css';
import {
  defaultValues,
  registrationSchema,
  type RegistrationValues,
} from '../model';
import { zodResolver } from '@hookform/resolvers/zod';

export const AuthForm = () => {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<RegistrationValues>({
    resolver: zodResolver(registrationSchema),
    defaultValues,
  });

  const onSubmit = (data: RegistrationValues) => {
    alert('Данные отправлены');
    console.log(data);
  };

  return (
    <div>
      <form
        className={styles.form}
        noValidate
        onSubmit={(event) => void handleSubmit(onSubmit)(event)}
      >
        <div className={styles.fieldGroup}>
          <label htmlFor={'userName'} className={styles.label}>
            Имя пользователя
          </label>
          <input
            id="userName"
            {...register('userName')}
            aria-invalid={Boolean(errors.userName)}
            className={styles.input}
            placeholder="Впишите имя"
          />
          {errors.userName && (
            <div className={styles.errorText}>{errors.userName.message}</div>
          )}
        </div>
        <div className={styles.fieldGroup}>
          <label htmlFor="email" className={styles.label}>
            email
          </label>
          <input
            id="email"
            type="email"
            {...register('email')}
            aria-invalid={Boolean(errors.email)}
            className={styles.input}
            placeholder="Впишите email"
          />
          {errors.email && (
            <div className={styles.errorText}>{errors.email.message}</div>
          )}
        </div>
        <div className={styles.fieldGroup}>
          <label htmlFor="password" className={styles.label}>
            Пароль
          </label>
          <input
            id="password"
            type="password"
            {...register('password')}
            aria-invalid={Boolean(errors.password)}
            className={styles.input}
            placeholder="Впишите пароль"
          />
          {errors.password && (
            <div className={styles.errorText}>{errors.password.message}</div>
          )}
        </div>
        <div className={styles.fieldGroup}>
          <label htmlFor="confirmPassword" className={styles.label}>
            Повтор пароля
          </label>
          <input
            id="confirmPassword"
            type="password"
            {...register('confirmPassword')}
            aria-invalid={Boolean(errors.confirmPassword)}
            className={styles.input}
            placeholder="Впишите повтор пароля"
          />
          {errors.confirmPassword && (
            <div className={styles.errorText}>
              {errors.confirmPassword.message}
            </div>
          )}
        </div>
        <button type="submit" className={styles.submit}>
          Регистрация
        </button>
      </form>
    </div>
  );
};
