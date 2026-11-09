const SESSION_KEY = 'dogfood.user-session';

type UserSession = {
	user: Pick<User, 'id' | 'email'>;
	accessToken: string;
};

const isUserSession = (value: unknown): value is UserSession =>
	typeof value === 'object' &&
	value !== null &&
	'accessToken' in value &&
	typeof value.accessToken === 'string' &&
	value.accessToken.trim() !== '' &&
	'user' in value &&
	typeof value.user === 'object' &&
	value.user !== null &&
	'id' in value.user &&
	typeof value.user.id === 'string' &&
	'email' in value.user &&
	typeof value.user.email === 'string';

export const loadUserSession = (): UserSession | undefined => {
	try {
		const stored = sessionStorage.getItem(SESSION_KEY);
		if (stored === null) {
			return undefined;
		}

		const session: unknown = JSON.parse(stored);
		return isUserSession(session) ? session : undefined;
	} catch {
		return undefined;
	}
};

export const saveUserSession = ({ user, accessToken }: UserSession) => {
	try {
		sessionStorage.setItem(
			SESSION_KEY,
			JSON.stringify({ user: { id: user.id, email: user.email }, accessToken })
		);
	} catch {
		// При недоступном хранилище сессия продолжает работать в Redux.
	}
};

export const clearUserSession = () => {
	try {
		sessionStorage.removeItem(SESSION_KEY);
	} catch {
		// Выход из Redux остаётся доступным без хранилища.
	}
};
