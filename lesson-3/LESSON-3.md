# LESSON-3 — RTK Query и управление задачами

Ветка: lesson-3

## Запуск

```bash
npm ci && npm run dev
npm run build
npm run lint
```

## Чеклист

### 1. Создание API-модуля через RTK Query

- [x] API корректно описан и экспортирует хук `useGetTasksQuery` — 1 балл
      `src/entities/task/api/tasksApi.ts`, публичный API — `src/entities/task/index.ts`
- [x] Загрузка задач происходит без ошибок — 1 балл
      `GET https://jsonplaceholder.typicode.com/todos`
- [x] Используется `transformResponse` для получения массива — 1 балл
      `transformDataTasksListResponse` в `src/entities/task/model/utils.ts`

### 2. Отображение задач в интерфейсе

- [x] Реализован хук `useTasks`, в котором данные загружаются через `useGetTasksQuery` — 1 балл
      `src/features/taskList/model/useTasks.ts`
- [x] Задачи отображаются в интерфейсе — 1 балл
      `TaskWidget` (`src/widgets/taskList/ui/TaskWidget.tsx`) → `TaskList`
- [x] Код структурирован и соответствует FSD — 1 балл
      импорты только сверху вниз, поэтому `RootState`/`AppDispatch` объявлены глобально в `src/app/store/store.ts`,
      чтобы `src/shared/store/hooks.ts` не импортировал из `app`

### 3. Локальное удаление задачи

- [ ] Использован `useEffect` для загрузки данных в `useState` — 1 балл
      сделано иначе, см. «Отличия от задания»
- [x] Реализована функция `removeTask` — 1 балл
      `src/features/taskList/model/useTasks.ts`, без запросов на сервер
- [x] После удаления задача исчезает из UI — 1 балл
      `src/features/taskList/ui/DeleteTaskButton.tsx`

### Дополнительно. Общий baseApi + injectEndpoints для tasksApi

- [x] `baseApi` создан и экспортирован из `shared/api/baseApi.ts`, `tagTypes` включает `Tasks` — 1 балл
- [x] `tasksApi` использует `injectEndpoints` от `baseApi`; `getTasks` корректно возвращает `Task[]` — 1 балл
      `src/entities/task/api/tasksApi.ts`
- [x] В store подключены `baseApi.reducer` и `baseApi.middleware` один раз — 1 балл
      `src/app/store/store.ts`

Места использования `useGetTasksQuery` после перехода на `baseApi` не менялись.

## Отличия от задания (осознанные)

- **Данные не копируются в `useState` через `useEffect`.**
  Задачи берутся напрямую из кэша RTK Query, а в локальном `useState` хранится список id удалённых задач;
  `useMemo` отфильтровывает их вместе с фильтром по статусу.
  - нет лишнего рендера: с `useEffect` после ответа сервера сначала рендерится пустой список, и только следующим рендером — задачи;
  - нет дублирования данных и риска рассинхрона копии в state с кэшем;

## Не сделано / вопросы

- нет
