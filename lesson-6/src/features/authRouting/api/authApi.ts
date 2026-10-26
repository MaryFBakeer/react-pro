import { baseApi } from '~shared/api';

export interface LoginRequest {
  email: string;
  password: string;
}

interface LoginResponseDto {
  user: { id: string; email: string };
  accessToken: string;
}

export interface LoginResult {
  userId: string;
  token: string;
}

export interface User {
  id: string;
  email: string;
  name: string;
  about?: string;
  avatarPath?: string;
}

const BEARER_PREFIX = /^Bearer\s+/i;

const authApi = baseApi.injectEndpoints({
  endpoints: (build) => ({
    login: build.mutation<LoginResult, LoginRequest>({
      query: (body) => ({ url: 'auth/login', method: 'POST', body }),
      transformResponse: ({ user, accessToken }: LoginResponseDto) => ({
        userId: user.id,
        token: accessToken.replace(BEARER_PREFIX, ''),
      }),
    }),

    getMe: build.query<User, string>({
      query: (token) => ({
        url: 'users/me',
        headers: { Authorization: `Bearer ${token}` },
      }),
    }),
  }),
});

export const { useLoginMutation, useGetMeQuery } = authApi;
