import { TooltipPosition } from '../TooltipPosition';

export interface Coordinates {
  top: number;
  left: number;
}

export const getCoordinates = (
  rect: DOMRect,
  position: TooltipPosition,
): Coordinates => {
  switch (position) {
    case TooltipPosition.TOP:
      return { top: rect.top, left: rect.left + rect.width / 2 };
    case TooltipPosition.BOTTOM:
      return { top: rect.bottom, left: rect.left + rect.width / 2 };
    case TooltipPosition.LEFT:
      return { top: rect.top + rect.height / 2, left: rect.left };
    case TooltipPosition.RIGHT:
      return { top: rect.top + rect.height / 2, left: rect.right };
  }
};
