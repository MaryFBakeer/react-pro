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

const BEARER_PREFIX = /^Bearer\s+/i;

const authApi = baseApi.injectEndpoints({
  endpoints: (build) => ({
    login: build.mutation<LoginResult, LoginRequest>({
      query: (body) => ({ url: 'auth/login', method: 'POST', body }),
      // Сервер может вернуть токен уже с префиксом "Bearer " —
      // храним «чистый» JWT, префикс добавляется при отправке заголовка
      transformResponse: ({ user, accessToken }: LoginResponseDto) => ({
        userId: user.id,
        token: accessToken.replace(BEARER_PREFIX, ''),
      }),
    }),
  }),
});

export const { useLoginMutation } = authApi;
