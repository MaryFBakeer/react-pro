import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';
import type { ITask } from '../model/types';
import { transformDataTasksListResponse } from '../model/utils';

export const tasksApi = createApi({
  reducerPath: 'tasksApi',
  baseQuery: fetchBaseQuery({
    baseUrl: 'https://jsonplaceholder.typicode.com',
  }),
  tagTypes: ['Tasks'],
  endpoints: (build) => ({
    getTasks: build.query<ITask[], void>({
      query: () => 'todos',
      transformResponse: transformDataTasksListResponse,
      providesTags: ['Tasks'],
    }),
  }),
});

export const { useGetTasksQuery } = tasksApi;
