import {
  snowColor,
} from 'utils/styles';
import {
  baseShowingStyle,
  baseWrapperShowingStyle
} from '../base-item/base-item.style';


const height = 32;

export const wrapperShowingStyle = {
  ...baseWrapperShowingStyle,
  backgroundColor: snowColor,
  height: `${height}px`,
};

export const showingStyle = (hasBorderBottom) => ({
  ...baseShowingStyle(hasBorderBottom),
  backgroundColor: snowColor,
  height: `${height}px`,
  lineHeight: `${height}px`,
});
