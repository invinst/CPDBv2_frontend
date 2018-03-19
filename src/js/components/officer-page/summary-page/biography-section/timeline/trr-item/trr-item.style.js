import {
  whiteTwoColor,
  snowColor,
  softBlackColor,
  clayGray,
} from 'utils/styles';
import {
  commonStyle,
  commonRankStyle,
  commonUnitStyle,
  commonWrapperShowingStyle,
  commonShowingStyle,
  commonWrapperKindStyle,
  commonKindStyle,
  commonCategoryStyle,
  commonDateStyle,
} from '../common.style';

const height = 58;

export const style = commonStyle;

export const rankStyle = {
  ...commonRankStyle,
  lineHeight: `${height}px`,
};

export const unitStyle = {
  ...commonUnitStyle,
  lineHeight: `${height}px`,
};

export const wrapperShowingStyle = {
  ...commonWrapperShowingStyle,
  backgroundColor: snowColor,
};

export const showingStyle = {
  ...commonShowingStyle,
  backgroundColor: snowColor,
  height: `${height}px`,
  lineHeight: `${height}px`,
  display: 'inline-block',
  borderBottom: `solid 1px ${whiteTwoColor}`,
  boxSizing: 'border-box',
};

export const kindWrapperStyle = commonWrapperKindStyle;

export const kindStyle = {
  ...commonKindStyle,
  width: '57px',
  color: 'white',
  backgroundColor: clayGray,
  fontWeight: 300,
};

export const categoryStyle = {
  ...commonCategoryStyle,
  width: '297px',
  display: 'inline-block',
  verticalAlign: 'middle',
};

export const dateStyle = {
  ...commonDateStyle,
  fontSize: '12px',
  color: softBlackColor,
  fontWeight: 300,
};
