import { Navigate, Route, Routes } from 'react-router';
import { ROUTES } from '~shared/config';
import { LoginPage } from './LoginPage';
import { ProfilePage } from './ProfilePage';
import { ProtectedRoute } from './ProtectedRoute';
import { PublicPage } from './PublicPage';

export function AppRouter() {
  return (
    <Routes>
      <Route
        path={ROUTES.root}
        element={<Navigate to={ROUTES.profile} replace />}
      />
      <Route path={ROUTES.login} element={<LoginPage />} />
      <Route path={ROUTES.public} element={<PublicPage />} />

      <Route element={<ProtectedRoute />}>
        <Route path={ROUTES.profile} element={<ProfilePage />} />
      </Route>

      <Route path="*" element={<Navigate to={ROUTES.root} replace />} />
    </Routes>
  );
}
