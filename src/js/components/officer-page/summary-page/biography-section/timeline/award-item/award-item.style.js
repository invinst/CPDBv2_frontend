import {
  whiteTwoColor,
  snowColor,
  softBlackColor,
  sugarCaneColor,
  clayGray,
} from 'utils/styles';
import {
  baseStyle,
  baseRankStyle,
  baseUnitStyle,
  baseWrapperShowingStyle,
  baseShowingStyle,
  baseWrapperKindStyle,
  baseKindStyle,
  baseCategoryStyle,
  baseDateStyle,
} from '../base-item/base-item.style';


const height = 58;

export const style = baseStyle;

export const rankStyle = {
  ...baseRankStyle,
  lineHeight: `${height}px`,
};

export const unitStyle = {
  ...baseUnitStyle,
  lineHeight: `${height}px`,
};

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
  width: '61px',
  color: clayGray,
  backgroundColor: sugarCaneColor,
  border: `solid 1px ${whiteTwoColor}`
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
