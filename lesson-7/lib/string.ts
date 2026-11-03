import capitalize from 'lodash/capitalize.js';
import { useMemo } from 'react';

export const toUpper = (value: string): string => value.toUpperCase();

export const useCapitalized = (value: string): string =>
  useMemo(() => capitalize(value), [value]);
