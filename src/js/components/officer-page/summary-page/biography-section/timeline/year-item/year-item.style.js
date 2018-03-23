import {
  snowColor,
  softBlackColor,
} from 'utils/styles';
import {
  baseStyle,
  baseWrapperShowingStyle,
  baseShowingStyle,
  baseDateStyle,
} from '../base-item/base-item.style';


const hasDataHeight = 64;
const noDataHeight = 32;

export const style = baseStyle;

export const wrapperShowingStyle = {
  ...baseWrapperShowingStyle,
  backgroundColor: snowColor,
};

export const showingStyle = (hasData, hasBorderBottom) => ({
  ...baseShowingStyle(hasBorderBottom),
  backgroundColor: snowColor,
  height: hasData ? `${hasDataHeight}px` : `${noDataHeight}px`,
  lineHeight: hasData ? `${hasDataHeight}px` : `${noDataHeight}px`,
});

export const dateStyle = (hasData) => ({
  ...baseDateStyle,
  fontSize: hasData ? '18px' : '14px',
  color: softBlackColor,
  fontWeight: 300,
  paddingTop: hasData ? '12px' : 0,
});

export const clearFloatStyle = {
  clear: 'both'
};
