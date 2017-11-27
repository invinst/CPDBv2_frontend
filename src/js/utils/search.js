import { viewportHeight } from 'utils/dom';

export const searchPageItemsPerColumn = Math.min(
  10,
  Math.max(parseInt((viewportHeight() - 267) / 65), 1)
);
