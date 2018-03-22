import {
  whiteTwoColor,
  snowColor,
  softBlackColor,
} from 'utils/styles';
import {
  baseStyle,
  baseRankStyle,
  baseUnitStyle,
  baseWrapperShowingStyle,
  baseShowingStyle,
  baseDateStyle,
} from '../base-item/base-item.style';


const hasDataHeight = 64;
const noDataHeight = 32;

export const style = baseStyle;

export const rankStyle = (hasData) => ({
  ...baseRankStyle,
  lineHeight: hasData ? `${hasDataHeight}px` : `${noDataHeight}px`,
});

export const unitStyle = (hasData) => ({
  ...baseUnitStyle,
  lineHeight: hasData ? `${hasDataHeight}px` : `${noDataHeight}px`,
});

export const wrapperShowingStyle = {
  ...baseWrapperShowingStyle,
  backgroundColor: snowColor,
};

export const showingStyle = (hasData) => ({
  ...baseShowingStyle,
  backgroundColor: snowColor,
  height: hasData ? `${hasDataHeight}px` : `${noDataHeight}px`,
  lineHeight: hasData ? `${hasDataHeight}px` : `${noDataHeight}px`,
  borderBottom: `solid 1px ${whiteTwoColor}`,
  boxSizing: 'border-box',
});

export const dateStyle = (hasData) => ({
  ...baseDateStyle,
  fontSize: hasData ? '18px' : '14px',
  color: softBlackColor,
  fontWeight: 300,
});

export const clearFloatStyle = {
  clear: 'both'
};
