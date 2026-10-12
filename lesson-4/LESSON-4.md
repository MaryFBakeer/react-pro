# LESSON-4 — Управление формами в React

Ветка: lesson-4

## Запуск

```bash
npm ci && npm run dev
npm run build
npm run lint
```

## Чеклист

### 1. Создание формы регистрации пользователя

- [x] Использован React Hook Form — 1 балл
      `useForm` в `src/features/auth/ui/AuthForm.tsx`
- [x] Все поля формы обязательны для заполнения — 1 балл
      `.min(1, 'Обязательное поле')` для каждого поля в `src/features/auth/model/formSchema.ts`
- [x] Реализована корректная валидация всех полей — 1 балл
      email — `z.email()`, пароль — минимум 6 символов, совпадение паролей — `.refine` с `path: ['confirmPassword']`
- [x] Ошибки отображаются рядом с соответствующими полями — 1 балл
      `errors.<field>.message` под каждым полем + подсветка через `aria-invalid`

### 2. Подключение yup или zod

Схема валидации (zod) подключена сразу в шаге 1, ручной валидации в проекте не было.

- [x] Использована схема валидации вместо ручной логики — 1 балл
      `registrationSchema` в `src/features/auth/model/formSchema.ts`, подключена через `zodResolver(registrationSchema)` из `@hookform/resolvers`
- [x] Сообщения об ошибках отображаются корректно рядом с соответствующими полями — 1 балл
      ошибка несовпадения паролей привязана к полю `confirmPassword`

### 3. Динамическое поле: социальные ссылки

- [x] Использован `useFieldArray` — 1 балл
      `useFieldArray({ control, name: 'socialMedia' })` в `src/features/auth/ui/AuthForm.tsx`
- [x] Форма корректно обрабатывает массив ссылок — 1 балл
      `socialMedia: z.array(socialLinkSchema)`; элементы — объекты `{ url }` (useFieldArray не поддерживает массив примитивов), `key={field.id}`
- [x] Добавление и удаление работает без ошибок — 1 балл
      кнопки «Добавить ссылку» (`append`) и «Удалить» (`remove(index)`); по умолчанию одно поле
- [x] Каждое поле валидируется как URL — 1 балл
      z.string().url('Некорректный URL') - deprecated в zod 4
      `z.url({ protocol: /^https?$/, error: 'Некорректный URL' })`
      ошибка выводится под конкретной ссылкой

### Дополнительно. Мини-форма в стиле wizard (`useActionState`)

Страница `/subscribe` (ссылка «Подписка» в навигации).

- [x] Реализована форма с использованием `useActionState` — 1 балл
      `useActionState(subscribeAction, initialSubscribeState)` в `src/features/subscribe/ui/SubscribeWizard.tsx`;
      один action на весь wizard (`src/features/subscribe/model/subscribeAction.ts`), текущий шаг хранится в state
- [x] Сообщения об ошибках или успешной отправке отображаются в UI — 1 балл
      pending — `isPending`: кнопки заблокированы, текст «Отправка…», `aria-busy` на форме;
      error — пустой/невалидный email (zod), не отмечено согласие, ошибка «сервера» (`role="alert"`);
      success — сообщение после подписки (`role="status"`)

## Отличия от задания (осознанные)

- Имя пользователя: дополнительно минимум 3 символа.
- Ссылки: допускаются только `http`/`https` (иначе `z.url` пропустит, например, `javascript:`), пробелы по краям обрезаются.
- Email проверяется через `z.email()` — строже, чем просто наличие `@` через встроенную проверку input.
- Wizard: отправка подписки — мок с задержкой 1.2 с (`src/features/subscribe/api/subscribeApi.ts`); email `taken@example.com` (и любой уже подписанный) возвращает ошибку — для демонстрации серверной ошибки на шаге 2.

## Не сделано / вопросы
