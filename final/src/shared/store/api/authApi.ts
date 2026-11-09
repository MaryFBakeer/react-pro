import { createApi } from '@reduxjs/toolkit/query/react';
import { customBaseQuery } from './config';

export type AuthCredentials = {
	email: string;
	password: string;
};

type SignUpResponse = {
	user: Pick<User, 'id' | 'email'>;
	accessToken: Token['accessToken'];
};

type SignInResponse = {
	user: Pick<User, 'id' | 'email'>;
	accessToken: Token['accessToken'];
};

export const authApi = createApi({
	reducerPath: 'authApi',
	baseQuery: customBaseQuery,
	endpoints: (builder) => ({
		signUp: builder.mutation<SignUpResponse, AuthCredentials>({
			query: (signUpFormValues) => ({
				url: '/auth/register',
				method: 'POST',
				body: signUpFormValues,
			}),
		}),
		signIn: builder.mutation<SignInResponse, AuthCredentials>({
			query: (signInFormValues) => ({
				url: '/auth/login',
				method: 'POST',
				body: signInFormValues,
			}),
		}),
	}),
});

export const { useSignInMutation, useSignUpMutation } = authApi;
