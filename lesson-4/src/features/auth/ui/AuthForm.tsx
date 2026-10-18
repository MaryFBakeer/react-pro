import { useFieldArray, useForm } from 'react-hook-form';
import styles from './AuthForm.module.css';
import {
  defaultValues,
  EMPTY_SOCIAL_LINK,
  registrationSchema,
  type RegistrationValues,
} from '../model';
import { zodResolver } from '@hookform/resolvers/zod';

export const AuthForm = () => {
  const {
    register,
    control,
    handleSubmit,
    formState: { errors },
  } = useForm<RegistrationValues>({
    resolver: zodResolver(registrationSchema),
    defaultValues,
  });

  const { fields, append, remove } = useFieldArray({
    control,
    name: 'socialMedia',
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
        <fieldset className={styles.fieldset}>
          <legend className={styles.label}>Социальные ссылки</legend>
          {fields.map((field, index) => {
            const inputId = `socialMedia-${field.id}`;
            const urlError = errors.socialMedia?.[index]?.url;

            return (
              <div key={field.id} className={styles.fieldGroup}>
                <label htmlFor={inputId} className={styles.label}>
                  Ссылка {index + 1}
                </label>
                <div className={styles.arrayRow}>
                  <input
                    id={inputId}
                    type="url"
                    // eslint-disable-next-line @typescript-eslint/restrict-template-expressions
                    {...register(`socialMedia.${index}.url`)}
                    aria-invalid={Boolean(urlError)}
                    className={styles.input}
                    placeholder="https://github.com/username"
                  />
                  <button
                    type="button"
                    className={styles.secondaryButton}
                    onClick={() => remove(index)}
                  >
                    Удалить
                  </button>
                </div>
                {urlError && (
                  <div className={styles.errorText}>{urlError.message}</div>
                )}
              </div>
            );
          })}
          <button
            type="button"
            className={styles.secondaryButton}
            onClick={() => append(EMPTY_SOCIAL_LINK)}
          >
            Добавить ссылку
          </button>
        </fieldset>
        <button type="submit" className={styles.submit}>
          Регистрация
        </button>
      </form>
    </div>
  );
};
