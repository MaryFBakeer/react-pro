import { baseApi } from '~shared/api';
import type { ITask } from '../model/types';
import { transformDataTasksListResponse } from '../model/utils';

export const tasksApi = baseApi.injectEndpoints({
  endpoints: (build) => ({
    getTasks: build.query<ITask[], void>({
      query: () => 'todos',
      transformResponse: transformDataTasksListResponse,
      providesTags: ['Tasks'],
    }),
  }),
});

export const { useGetTasksQuery } = tasksApi;
