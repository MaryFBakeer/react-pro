import { createBrowserRouter, Navigate } from 'react-router';
import { AuthPage } from '~pages/AuthPage';
import { SubscribePage } from '~pages/SubscribePage';
import { Layout } from './Layout';

export const router = createBrowserRouter([
  {
    element: <Layout />,
    children: [
      { path: '/', element: <AuthPage /> },
      { path: '/subscribe', element: <SubscribePage /> },
    ],
  },
  { path: '*', element: <Navigate to="/" replace /> },
]);
