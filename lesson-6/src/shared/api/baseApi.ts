import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';

export const baseApi = createApi({
  reducerPath: 'api',
  baseQuery: fetchBaseQuery({
    // В задании указан префикс /api, но по нему сервер отвечает 404 —
    // эндпоинты из спецификации (/api-json) доступны от корня домена
    baseUrl: 'https://api.v2.react-learning.ru/',
  }),
  tagTypes: ['Tasks'],
  endpoints: () => ({}),
});
