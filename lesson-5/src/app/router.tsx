import { createBrowserRouter, Navigate } from 'react-router';
import { RefExamplesPage } from '~pages/ref-examples';

export const router = createBrowserRouter([
  { path: '/', element: <RefExamplesPage /> },
  { path: '*', element: <Navigate to="/" replace /> },
]);
