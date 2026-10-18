# react-pro

Учебный проект курса React PRO — Feature-Sliced Design.

Каждый урок — отдельная ветка (`lesson-N`) и отдельная папка с самостоятельным проектом (свои `package.json`, `node_modules`, конфиги).

## Запуск

```bash
cd lesson-N   # lesson-1, lesson-2, ...
npm ci
npm run dev
npm run build
npm run lint
```

## Структура

```
lesson-N/
└── src/
    ├── app/       # точка входа, роутер, глобальные стили
    ├── pages/     # страницы
    ├── widgets/   # самостоятельные блоки UI
    ├── features/  # пользовательские сценарии
    ├── entities/  # бизнес-сущности
    └── shared/    # UI-кит, утилиты без бизнес-логики
```

Импорты между слоями — только сверху вниз и только через публичный API слайса (`index.ts`) по алиасу `~layer/slice`. Правила проверяет `eslint-plugin-boundaries`.

## Уроки

- [LESSON-1](./lesson-1/LESSON-1.md) — архитектура FSD, сущность Task, виджет списка задач
- [LESSON-2](./lesson-2/LESSON-2.md) — оптимизация: `React.memo`, `useMemo`, `useCallback`
- [LESSON-3](./lesson-3/LESSON-3.md) — RTK Query и управление задачами
- [LESSON-4](./lesson-4/LESSON-4.md) — Управление формами в React
