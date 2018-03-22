import {
  whiteTwoColor,
  snowColor,
  softBlackColor,
  clayGray,
} from 'utils/styles';
import {
  baseWrapperShowingStyle,
  baseShowingStyle,
  baseWrapperKindStyle,
  baseKindStyle,
  baseCategoryStyle,
  baseDateStyle,
} from '../base-item/base-item.style';


const height = 58;

export const wrapperShowingStyle = {
  ...baseWrapperShowingStyle,
  backgroundColor: snowColor,
};

export const showingStyle = {
  ...baseShowingStyle,
  backgroundColor: snowColor,
  height: `${height}px`,
  lineHeight: `${height}px`,
  display: 'inline-block',
  borderBottom: `solid 1px ${whiteTwoColor}`,
  boxSizing: 'border-box',
};

export const kindWrapperStyle = baseWrapperKindStyle;

export const kindStyle = {
  ...baseKindStyle,
  width: '57px',
  color: 'white',
  backgroundColor: clayGray,
  fontWeight: 300,
};

export const categoryStyle = {
  ...baseCategoryStyle,
  width: '297px',
  display: 'inline-block',
  verticalAlign: 'middle',
};

export const dateStyle = {
  ...baseDateStyle,
  fontSize: '12px',
  color: softBlackColor,
  fontWeight: 300,
};
