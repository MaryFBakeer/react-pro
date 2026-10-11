import type { ButtonHTMLAttributes } from 'react';
import styles from './FilterButton.module.css';

interface FilterButtonProps extends Omit<
  ButtonHTMLAttributes<HTMLButtonElement>,
  'type'
> {
  isActive: boolean;
}

export const FilterButton = ({
  isActive,
  className,
  ...props
}: FilterButtonProps) => {
  const classes = [styles.button, isActive && styles.active, className]
    .filter(Boolean)
    .join(' ');

  return (
    <button
      type="button"
      aria-pressed={isActive}
      className={classes}
      {...props}
    />
  );
};
