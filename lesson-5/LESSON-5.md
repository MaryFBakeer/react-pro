# LESSON-5 — Хранение состояния и работа с DOM через useRef

Ветка: lesson-5

## Запуск

```bash
npm ci && npm run dev
npm run build
npm run lint
```

Все компоненты собраны на одной странице `/` — `RefExamplesPage` (`src/pages/ref-examples/ui/RefExamplesPage.tsx`).

## Чеклист

### 1. Компонент ClickTimer

- [x] Время первого клика фиксируется через `ref` — 1 балл
      `clickDataRef.current.startTime` в `src/features/refExamples/ui/ClickTimer.tsx`
- [x] Счетчик кликов хранится в `ref`, не вызывая ререндер — 1 балл
      `clickDataRef.current.clickCount`; время и счётчик объединены в один `ref` с типом `ClickData`, `useState` в компоненте нет
- [x] В консоли отображается разница во времени и общее количество — 1 балл
      `console.log('ClickTimer:', { elapsedMs, clickCount })`; на первом клике выводится только факт фиксации времени

### 2. Компонент PreviousInput

- [x] Текущее значение отслеживается через `onChange` — 1 балл
      контролируемый `input`, `useState` + `handleChange` в `src/features/refExamples/ui/PreviousInput.tsx`
- [x] Предыдущее значение сохраняется через `ref` — 1 балл
      `previousValueRef.current = value` в `useEffect` с зависимостью `[value]` — обновляется после рендера
- [x] UI корректно отображает предыдущее значение — 1 балл
      во время рендера `ref` ещё хранит значение с прошлого рендера

### 3. Компонент FocusTracker

- [x] Установка фокуса работает через `ref.current.focus()` — 1 балл
      кнопка «Сфокусировать на первом» → `firstInputRef.current?.focus()` в `src/features/refExamples/ui/FocusTracker.tsx`
- [x] Переход фокуса отслеживается через `onFocus` — 1 балл
      общий `handleFocus` на обоих полях, источник перехода — `event.relatedTarget`
- [x] Количество фокус-переходов корректно отображается в консоли — 1 балл
      счётчик в `focusRef`, без ререндеров

### Дополнительно. Компонент DebouncedLogger с useRef

- [x] Компонент DebouncedLogger с useRef — 0.5 балла
      id таймера хранится в `timeoutIdRef` в `src/features/refExamples/ui/DebouncedLogger.tsx`
- [x] Старый таймер корректно очищается — 0.5 балла
      `clearTimeout(timeoutIdRef.current)` на каждый ввод; после срабатывания `ref` сбрасывается в `null`
- [x] Лог появляется только по истечении задержки — 0.5 балла
      задержка вынесена в константу `DEBOUNCE_DELAY_MS = 1000`

### Дополнительно. Компонент WebSocketLogger

- [ ] Соединение хранится в ref, а не в state — 0.5 балла
- [ ] WebSocket создается один раз при монтировании — 0.5 балла
- [ ] Соединение корректно закрывается в cleanup — 0.5 балла

## Отличия от задания (осознанные)

- **FocusTracker.** Переход засчитывается только если фокус пришёл с другого поля (`relatedTarget` — первое или второе `input`). В примере из задания считается любой непустой `relatedTarget`, тогда фокус с кнопки «Сфокусировать на первом» тоже засчитался бы, а это не переход между полями.

## Не сделано / вопросы

- WebSocketLogger (дополнительное задание 2) не реализован.
