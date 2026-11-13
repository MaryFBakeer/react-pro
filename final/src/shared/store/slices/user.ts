import { createSlice, PayloadAction } from '@reduxjs/toolkit';

interface UserState {
	user: Partial<User> | null;
	accessToken: string;
}

const createInitState = (): UserState => ({
	user: null,
	accessToken: '',
});

export const userSlice = createSlice({
	name: 'user',
	initialState: createInitState(),
	reducers: {
		setSession(_state, action: PayloadAction<UserState>) {
			const { user, accessToken } = action.payload;
			return { user, accessToken };
		},
		clearUser() {
			return createInitState();
		},
	},
	selectors: {
		getUser: (state: UserState) => state.user,
		getAccessToken: (state: Token) => state.accessToken,
	},
});

export const userActions = { ...userSlice.actions };
export const userSelectors = userSlice.selectors;
