import { createBrowserRouter, Navigate } from 'react-router';
import { AuthPage } from '~pages/AuthPage';

export const router = createBrowserRouter([
  { path: '/', element: <AuthPage /> },
  { path: '*', element: <Navigate to="/" replace /> },
]);
