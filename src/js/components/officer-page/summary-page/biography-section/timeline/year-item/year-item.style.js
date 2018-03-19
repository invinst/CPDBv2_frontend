import {
  whiteTwoColor,
  snowColor,
  softBlackColor,
} from 'utils/styles';
import {
  commonStyle,
  commonRankStyle,
  commonUnitStyle,
  commonWrapperShowingStyle,
  commonShowingStyle,
  commonDateStyle,
} from '../common.style';


const hasDataHeight = 64;
const noDataHeight = 32;

export const style = commonStyle;

export const rankStyle = (hasData) => ({
  ...commonRankStyle,
  lineHeight: hasData ? `${hasDataHeight}px` : `${noDataHeight}px`,
});

export const unitStyle = (hasData) => ({
  ...commonUnitStyle,
  lineHeight: hasData ? `${hasDataHeight}px` : `${noDataHeight}px`,
});

export const wrapperShowingStyle = {
  ...commonWrapperShowingStyle,
  backgroundColor: snowColor,
};

export const showingStyle = (hasData) => ({
  ...commonShowingStyle,
  backgroundColor: snowColor,
  height: hasData ? `${hasDataHeight}px` : `${noDataHeight}px`,
  lineHeight: hasData ? `${hasDataHeight}px` : `${noDataHeight}px`,
  borderBottom: `solid 1px ${whiteTwoColor}`,
  boxSizing: 'border-box',
});

export const dateStyle = (hasData) => ({
  ...commonDateStyle,
  fontSize: hasData ? '18px' : '14px',
  color: softBlackColor,
  fontWeight: 300,
});

export const clearFloatStyle = {
  clear: 'both'
};
