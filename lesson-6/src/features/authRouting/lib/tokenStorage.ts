export const TOKEN_STORAGE_KEY = 'authToken';

export const tokenStorage = {
  get(): string | null {
    try {
      return localStorage.getItem(TOKEN_STORAGE_KEY);
    } catch {
      return null;
    }
  },

  set(token: string): void {
    try {
      localStorage.setItem(TOKEN_STORAGE_KEY, token);
    } catch {
      // токен останется только в памяти до перезагрузки страницы
    }
  },

  remove(): void {
    try {
      localStorage.removeItem(TOKEN_STORAGE_KEY);
    } catch {
      // нечего удалять, если хранилище недоступно
    }
  },
};
