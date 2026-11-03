export const getPageStats = (): string =>
  `Элементов на странице: ${String(document.querySelectorAll('*').length)}`;
