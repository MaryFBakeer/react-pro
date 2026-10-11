import { combineReducers, configureStore } from '@reduxjs/toolkit';
import { baseApi } from '~shared/api';

const reducer = combineReducers({
  [baseApi.reducerPath]: baseApi.reducer,
});

export const store = configureStore({
  reducer,
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware().concat(baseApi.middleware),
});

declare global {
  type RootState = ReturnType<typeof store.getState>;
  type AppDispatch = typeof store.dispatch;
}
