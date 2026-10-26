import { Navigate, Outlet, useLocation } from 'react-router';
import { ROUTES } from '~shared/config';
import { useAuth } from '../model/useAuth';

export function ProtectedRoute() {
  const { isAuthenticated } = useAuth();
  const location = useLocation();

  if (!isAuthenticated) {
    return <Navigate to={ROUTES.login} replace state={{ from: location }} />;
  }

  return <Outlet />;
}
