import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';

export const baseApi = createApi({
  reducerPath: 'api',
  baseQuery: fetchBaseQuery({
    baseUrl: 'https://api.v2.react-learning.ru/',
  }),
  tagTypes: ['Tasks'],
  endpoints: () => ({}),
});
