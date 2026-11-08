import { useId, useState, type ReactNode, type SyntheticEvent } from 'react';
import { createPortal } from 'react-dom';
import { useTheme, themeStyles } from '~shared/lib/theme';
import type { TooltipPosition } from './TooltipPosition';
import { getCoordinates, type Coordinates } from './lib/getCoordinates';
import styles from './Tooltip.module.css';

interface TooltipProps {
  children: ReactNode;
  content: ReactNode;
  position: TooltipPosition;
}

export const Tooltip = ({ children, content, position }: TooltipProps) => {
  const theme = useTheme();
  const [coordinates, setCoordinates] = useState<Coordinates | null>(null);

  const tooltipId = useId();
  const tooltipRoot = document.getElementById('tooltip-root');

  const showTooltip = (event: SyntheticEvent<HTMLSpanElement>) => {
    const rect = event.currentTarget.getBoundingClientRect();
    setCoordinates(getCoordinates(rect, position));
  };

  const hideTooltip = () => setCoordinates(null);

  return (
    <>
      <span
        className={styles.trigger}
        aria-describedby={coordinates && tooltipRoot ? tooltipId : undefined}
        onMouseEnter={showTooltip}
        onMouseLeave={hideTooltip}
        onFocus={showTooltip}
        onBlur={hideTooltip}
      >
        {children}
      </span>
      {coordinates &&
        tooltipRoot &&
        createPortal(
          <span
            id={tooltipId}
            role="tooltip"
            className={`${styles.tooltip} ${styles[position]} ${themeStyles[theme]}`}
            style={coordinates}
          >
            {content}
          </span>,
          tooltipRoot,
        )}
    </>
  );
};
