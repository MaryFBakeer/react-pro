import { isRouteName, routes, type RouteName } from './routes';
import { createButton, createLink, formatTitle } from './utils';

const DEFAULT_ROUTE: RouteName = 'home';

const root = document.getElementById('root');

if (!root) {
  throw new Error('Не найден элемент #root');
}

const nav = document.createElement('nav');
nav.append(
  createLink('Главная', '#home'),
  ' ',
  createLink('О проекте', '#about'),
);

const view = document.createElement('main');
const output = document.createElement('p');
const button = createButton('Показать статистику');

const getRouteName = (): RouteName => {
  const hash = location.hash.slice(1);
  return isRouteName(hash) ? hash : DEFAULT_ROUTE;
};

const showRoute = async (): Promise<void> => {
  const name = getRouteName();
  const { render } = await routes[name]();

  if (name === getRouteName()) {
    view.textContent = render();
  }
};

const navigate = (): void => {
  showRoute().catch((error: unknown) => {
    console.error(error);
    view.textContent = 'Не удалось загрузить страницу';
  });
};

const showStats = async (): Promise<void> => {
  const { getPageStats } = await import('./stats');
  output.textContent = getPageStats();
};

button.addEventListener('click', () => {
  showStats().catch((error: unknown) => {
    console.error(error);
    output.textContent = 'Не удалось загрузить статистику';
  });
});

window.addEventListener('hashchange', navigate);

document.title = formatTitle('app');
root.append(nav, view, button, output);
navigate();
