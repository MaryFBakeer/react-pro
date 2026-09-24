import { createBrowserRouter, Navigate } from 'react-router';
import { TaskPage } from '~pages/tasks';

export const router = createBrowserRouter([
  { path: '/', element: <TaskPage /> },
  { path: '*', element: <Navigate to="/" replace /> },
]);
