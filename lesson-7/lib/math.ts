import sum from 'lodash/sum.js';

export const add = (a: number, b: number): number => a + b;

export const sumAll = (values: number[]): number => sum(values);
