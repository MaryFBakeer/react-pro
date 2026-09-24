# LESSON-1 — Архитектура React-приложений (FSD)

Ветка: lesson-1

## Запуск

```bash
npm ci && npm run dev
npm run build
npm run lint
```

## Чеклист

### 1. Создание проекта по FSD

- [x] Проект запускается без ошибок — 1 балл
- [x] Структура соответствует FSD — 1 балл
- [x] Настроены ESLint и Prettier с конфигурацией, отражающей принципы FSD — 1 балл

### 2. Реализация сущности Task

- [x] Типизация и структура — 1 балл — `src/entities/task/model/types.ts`
- [x] Компонент TaskCard с правильной презентационной логикой — 1 балл — `src/entities/task/ui/TaskCard.tsx`
- [x] Стили через `.module.css` — 1 балл — `src/entities/task/ui/TaskCard.module.css`

### 3. Создание виджета «Список задач»

- [x] Хук корректно реализует фильтрацию и удаление — 1 балл — `src/widgets/taskList/model/useTasks.ts`
- [x] Компонент TaskList правильно отображает отфильтрованные задачи — 1 балл — `src/widgets/taskList/ui/TaskList.tsx`
- [x] Используется state-хук и проброс пропсов — 1 балл — `TaskWidget` → `TaskList` → `TaskCard`

### 4. Страница

- [x] Страница и виджет работают — 1 балл — `src/pages/tasks/ui/TaskPage.tsx`
- [x] Читаемый, модульный код — 1 балл

### Бонус

- [x] `FilterButton` в `shared/ui`, используется в виджете — 1 балл — `src/shared/ui/filterButton/`

## Отличия от задания (осознанные)

- `ITask.status: 'completed' | 'incomplete'` вместо `completed: boolean` — union расширяем: новый статус добавляется без смены модели.
- Алиасы с префиксом `~` (`~widgets/taskList`), а не `widgets/task`, — не конфликтуют с npm-пакетами.

## Не сделано / вопросы

- нет
