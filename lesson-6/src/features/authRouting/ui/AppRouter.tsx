import { Navigate, Route, Routes } from 'react-router';
import { ROUTES } from '~shared/config';
import { ProtectedRoute } from './ProtectedRoute';

export function AppRouter() {
  return (
    <Routes>
      <Route
        path={ROUTES.root}
        element={<Navigate to={ROUTES.profile} replace />}
      />
      <Route path={ROUTES.login} element={<h1>Login</h1>} />

      <Route element={<ProtectedRoute />}>
        <Route path={ROUTES.profile} element={<h1>Profile</h1>} />
      </Route>

      <Route path="*" element={<Navigate to={ROUTES.root} replace />} />
    </Routes>
  );
}
