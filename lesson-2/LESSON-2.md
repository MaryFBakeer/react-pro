# LESSON-2 — Оптимизация производительности в React

Ветка: lesson-2

## Запуск

```bash
npm ci && npm run dev
npm run build
npm run lint
```

## Чеклист

### 1. Оптимизация TaskCard с помощью React.memo

- [x] Компонент обёрнут в `React.memo` — 1 балл — `src/entities/task/ui/TaskCard.tsx`
- [x] Поведение корректное, props не создаются заново — 1 балл — `src/features/taskList/ui/TaskList.tsx`:
  - вместо JSX-элемента в `TaskCard` передаются render-функция `actions`, мемоизированная через `useCallback`;
  - `taskItem` — ссылка из state, меняется только у изменённой задачи
- [x] Код читаемый и чистый — 1 балл

### 2. Мемоизация списка задач с useMemo

- [x] `useMemo` применяется для фильтрации (`all` / `completed` / `incomplete`) — 1 балл — `src/features/taskList/model/useTasks.ts`
- [x] UI обновляется корректно — 1 балл — зависимости `[filter, tasks]`, `tasks` обновляется
- [x] Поведение не ломается — 1 балл

Граничные случаи:

- удаление задачи — пропадает из списка при любом фильтре;
- одна задача — отображается и удаляется корректно;
- пустой список (всё удалено или фильтр ничего не нашёл) — показывается «Задач нет».

### 3. Мемоизация функций с useCallback

- [x] Используется `useCallback` — 1 балл — `removeTask` в `useTasks.ts`
- [x] Функции корректно передаются в props — 1 балл — `TaskWidget` → `TaskList` (`onDelete`) → `renderActions` → `DeleteTaskButton`
- [x] Поведение не ломается — 1 балл

### Бонус: анализ через React DevTools Profiler

Скриншоты и анализ — в разделе [«Профилирование»] ниже, файлы — `docs/screenshots/`.

- [x] Скриншот работы с Profiler — 1 балл — фильтрация и два удаления, каждый сценарий до и после оптимизации
- [x] Комментарии к скриншоту — 1 балл — время рендера коммита и список перерисованных компонентов для каждого скриншота
- [x] Анализ 2+ компонентов — 1 балл — `TaskCard`, `DeleteTaskButton`, `TaskWidget` / `TaskList`, `FilterButton` (что улучшили, что осталось)

## Профилирование (React DevTools Profiler)

Записаны три кейса: переключение фильтра «Все» → «Выполненные» и два удаления задачи при фильтре «Выполненные». Каждый сценарий снят дважды — до и после оптимизации.

### 1. Переключение фильтра

- До: Render — 3.1 ms. Кроме `TaskWidget` и `TaskList` перерисовались все `TaskCard` и все DeleteTaskButton`, хотя данные этих задач не менялись.
  (docs/screenshots/filter-profiler-completed.jpg)

- После: Render — **1.5 ms**. Рендерятся только `TaskWidget`, `TaskList` и `FilterButton`.
  Ни одна `TaskCard` в коммит не попала: `taskItem` — та же ссылка из state, а `actions` — стабильная функция из `useCallback`, поэтому `memo` пропускает рендер.
  (docs/screenshots/filter-profiler-completed-optimiz.jpg)

### 2. Удаление задачи (первое)

- До: Render — **2.7 ms**. Все оставшиеся в списке `TaskCard` и `DeleteTaskButton` перерисованы заново, на каждый рендер `TaskList` создавался новый JSX-элемент в `actions` и новая функция `removeTask`.
  (docs/screenshots/delete-1-profiler.jpg)

- После: Render — **1 ms**. Рендерятся `TaskWidget`, `TaskList` и две `FilterButton`, оставшиеся карточки не перерисовываются.
  `removeTask` обёрнута в `useCallback` без зависимостей, поэтому ссылка на неё не меняется между рендерами.
  (docs/screenshots/delete-1-profiler-optimiz.jpg)

### 3. Удаление задачи (второе)

- До: Render — **2.1 ms**. Та же картина: перерисованы все оставшиеся `TaskCard` (`test4`, `test6`, `test11`, `test12`) и их `DeleteTaskButton`.
  (docs/screenshots/delete-2-profiler.jpg)

- После: Render — **1.1 ms**. В коммите только `TaskWidget`, `TaskList` и `FilterButton`.
  (docs/screenshots/delete-2-profiler-optimiz.jpg)

## Отличия от задания (осознанные)

- Начальные данные не захардкожены внутри `useTasks`, а передаются аргументом (`useTasks(mockTasks)`, моки — `src/widgets/taskList/model/mockTasks.ts`): хук остаётся переиспользуемым и не зависит от источника данных.

## Не сделано / вопросы
