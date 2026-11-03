import {
  useCallback,
  useEffect,
  useMemo,
  useState,
  type ReactNode,
} from 'react';
import { TOKEN_STORAGE_KEY, tokenStorage } from '../lib/tokenStorage';
import { AuthContext, type AuthContextValue } from '../model/AuthContext';

interface AuthProviderProps {
  children: ReactNode;
}

export function AuthProvider({ children }: AuthProviderProps) {
  const [token, setToken] = useState<string | null>(() => tokenStorage.get());

  useEffect(() => {
    const handleStorage = (event: StorageEvent) => {
      if (event.key === TOKEN_STORAGE_KEY || event.key === null) {
        setToken(tokenStorage.get());
      }
    };

    window.addEventListener('storage', handleStorage);
    return () => {
      window.removeEventListener('storage', handleStorage);
    };
  }, []);

  const signIn = useCallback((nextToken: string) => {
    tokenStorage.set(nextToken);
    setToken(nextToken);
  }, []);

  const signOut = useCallback(() => {
    tokenStorage.remove();
    setToken(null);
  }, []);

  const value = useMemo<AuthContextValue>(
    () => ({ token, isAuthenticated: token !== null, signIn, signOut }),
    [token, signIn, signOut],
  );

  return <AuthContext value={value}>{children}</AuthContext>;
}
