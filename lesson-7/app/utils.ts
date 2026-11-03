export const formatTitle = (title: string): string => `build-hw: ${title}`;

export const createButton = (label: string): HTMLButtonElement => {
  const button = document.createElement('button');
  button.type = 'button';
  button.textContent = label;
  return button;
};

export const createLink = (label: string, href: string): HTMLAnchorElement => {
  const link = document.createElement('a');
  link.href = href;
  link.textContent = label;
  return link;
};

export const unusedHelper = (): string => 'UNUSED_UTILS_MARKER';
