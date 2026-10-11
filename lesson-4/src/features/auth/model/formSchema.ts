import { z } from 'zod';

const REQUIRED_MESSAGE = 'Обязательное поле';

export const registrationSchema = z
  .object({
    userName: z
      .string()
      .min(1, REQUIRED_MESSAGE)
      .min(3, 'Имя должно быть не менее 3 символов'),
    email: z
      .string()
      .min(1, REQUIRED_MESSAGE)
      .pipe(z.email({ message: 'Некорректный формат email' })),
    password: z
      .string()
      .min(1, REQUIRED_MESSAGE)
      .min(6, 'Пароль должен содержать минимум 6 символов'),
    confirmPassword: z.string().min(1, REQUIRED_MESSAGE),
  })
  .refine((data) => data.password === data.confirmPassword, {
    message: 'Пароли не совпадают',
    path: ['confirmPassword'],
  });

export type RegistrationValues = z.infer<typeof registrationSchema>;

export const defaultValues: RegistrationValues = {
  userName: '',
  email: '',
  password: '',
  confirmPassword: '',
};
