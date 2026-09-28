# react-pro

Учебный проект курса React PRO — Feature-Sliced Design.

## Запуск

```bash
npm ci
npm run dev
npm run build
npm run lint
```

## Структура

```
src/
├── app/       # точка входа, роутер, глобальные стили
├── pages/     # страницы
├── widgets/   # самостоятельные блоки UI
├── features/  # пользовательские сценарии
├── entities/  # бизнес-сущности
└── shared/    # UI-кит, утилиты без бизнес-логики
```

Импорты между слоями — только сверху вниз и только через публичный API слайса (`index.ts`) по алиасу `~layer/slice`. Правила проверяет `eslint-plugin-boundaries`.

## Уроки

- [LESSON-2](./LESSON-2.md) — оптимизация: `React.memo`, `useMemo`, `useCallback`
