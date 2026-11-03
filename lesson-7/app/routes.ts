export const routes = {
  home: () => import('./pages/home'),
  about: () => import('./pages/about'),
};

export type RouteName = keyof typeof routes;

export const isRouteName = (value: string): value is RouteName =>
  Object.hasOwn(routes, value);
